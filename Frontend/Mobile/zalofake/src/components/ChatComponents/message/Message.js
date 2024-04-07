import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Image, ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axiosInstance from "../../../api/axiosInstance";
import { useAuthContext } from "../../../contexts/AuthContext";
import moment from 'moment-timezone';
import useSendMessage from "../../../hooks/useSendMessage";
import * as FileSystem from 'expo-file-system';


const Message = ({ navigation, route }) => {
  const { user } = route.params;
  const [textMessage, setTextMessage] = useState(null)
  const [isColorSend, setIsColorSend] = useState(false)
  const { sendMessage } = useSendMessage();
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [image, setImage] = useState(null)

  // truc {
  const [chats, setChats] = useState([]);
  const scrollViewRef = useRef();
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState("")
  const [isLoad, setIsLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get(`/chats/${user.userId}`);
        const reversedChats = response.data.data.reverse();
        setChats(reversedChats);
        const lastElement = reversedChats[reversedChats.length - 1]
        setLastTimestamp(lastElement.timestamp)
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();

    if (isMessageSent) {
      fetchChats();
      setIsMessageSent(false);
    }

  }, [isMessageSent, chats]);

  const handleCheckIsSend = (message) => {
    if (message.senderId === user.userId) {
      return false;
    } else {
      return true;
    }
  };
  const handleCheckTypeImage = (message) => {
    if (message.contents[0].type === 'image') {
      return true;
    } else {
      return false;
    }
  };
  const handleGetTime = (time) => {
    const vietnamDatetime = moment(time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    const dateObject = new Date(vietnamDatetime)
    return `${dateObject.getHours()}:${dateObject.getMinutes()}`
  };

  useEffect(() => {
    if (scrollViewRef.current && contentHeight > scrollViewHeight && !isLoad) {
      const offset = contentHeight - scrollViewHeight;
      setIsLoad(true)
      scrollViewRef.current.scrollTo({ x: 0, y: offset, animated: true });
    }
  }, [contentHeight, scrollViewHeight]);

  // Khôi phục vị trí cuộn của ScrollView
  const restoreScrollPosition = () => {

    if (scrollViewRef.current) {
      scrollViewRef.current.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current.scrollTo({ x: 0, y: height + scrollViewHeight, animated: false });

      });
    }
  };

  const handleScrollToTop = () => {
    setIsLoading(true)
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get(`/chats/${user.userId}?lastTimestamp=${lastTimestamp}`);
        const reversedChats = response.data.data.reverse();
        if (reversedChats && reversedChats.length > 0) {
          setChats(prevChats => [...reversedChats, ...prevChats]);
          restoreScrollPosition();
          const lastElement = reversedChats[0]
          setLastTimestamp(lastElement.timestamp)
        }
        setIsLoading(false)

      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  };

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    if (y === 1) {
      handleScrollToTop();
    }
  };
  // }

  // nhi {
  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      console.log("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 20,
      videoExportPreset: ImagePicker.VideoExportPreset.Passthrough,
      videoMaxDuration: 10
    });

    if (!pickerResult.canceled) {
      console.log("picker: ", pickerResult.assets[0])
      const imageData = pickerResult.assets[0];

      const formData = new FormData();

      // Lấy đường dẫn của file hình ảnh
      const uri = Platform.OS === 'ios' ? imageData.uri.replace('file://', '') : imageData.uri;

      // Tạo một Blob object từ file hình ảnh
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const fileContent = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

      // Thêm file vào FormData object
      formData.append('file', {
        uri: uri,
        type: 'image/png', // Thay đổi kiểu file tùy thuộc vào kiểu của file bạn muốn gửi
        name: fileInfo.name,
        data: fileContent // Thay đổi tên file tùy thuộc vào tên bạn muốn đặt
      });
      console.log("formData: ", formData);
      const response = await axiosInstance.post(`/chats/${user.userId}/sendMessage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      )
      if (response) {
        console.log("send image success");
      }
    }



  }

  useEffect(() => {
    // Update send button color based on textMessage
    if (!textMessage) {
      setIsColorSend("black");
    } else {
      setIsColorSend("#0091FF");
    }
  }, [textMessage]);

  const handleSendMessage = async () => {
    if (!textMessage) {
      console.log("message rỗng");
    }
    else {
      try {
        const send = await sendMessage(user, textMessage)
        if (send) {
          setTextMessage(null)
          setIsMessageSent(true);
        }
      } catch (error) {

      }
    }
  }

  // }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Pressable>
            <Ionicons
              name="call-outline"
              size={27}
              color="white"
              style={{ padding: 5, paddingStart: 15, marginRight: 10 }}
            />
          </Pressable>
          <Ionicons
            name="videocam-outline"
            size={27}
            color="white"
            style={{ padding: 5, marginRight: 10 }}
          />
          <Pressable
            onPress={() => navigation.navigate("MessageSettings", { user })}
          >
            <Ionicons
              name="list-outline"
              size={27}
              color="white"
              style={{ padding: 5 }}
            />
          </Pressable>
        </View>
      ),
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{user.profile.name}</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#0091FF",
        shadowColor: "#fff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E9EB" }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {isLoading ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <View></View>
        )}
        <ScrollView ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onLayout={(event) => {
            setScrollViewHeight(event.nativeEvent.layout.height);
          }}
          onContentSizeChange={(width, height) => {
            setContentHeight(height);
          }}
        >
          <View style={{ flex: 1, justifyContent: "flex-start" }}>

            {chats.map((message, index) => (
              <View key={index} style={{ justifyContent: 'space-around', borderRadius: 10, backgroundColor: handleCheckIsSend(message) ? "#7debf5" : "#d9d9d9", margin: 5, alignItems: handleCheckIsSend(message) ? "flex-end" : "flex-start", alignSelf: handleCheckIsSend(message) ? "flex-end" : "flex-start" }}>
                {message.contents.map((content, i) => (
                  <View key={i} style={{ alignItems: 'center', width: '30%' }}>
                    {handleCheckTypeImage(message) ?

                      <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5 }} >

                        <Image
                          source={{
                            uri: content.data
                          }}
                          style={{ width: 150, height: 150, borderRadius: 10 }}
                        />
                      </View>
                      :
                      <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5 }} >
                        <Text style={{ fontSize: 18 }}>{message.contents[0].data}</Text>
                      </View>
                    }
                  </View>
                ))}
                <View style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 5 }}><Text style={{ fontSize: 14 }}>{handleGetTime(message.timestamp)}</Text></View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>


      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          backgroundColor: "white",
          height: 70
        }}
      >
        <View style={{ width: '10%' }}>
          <TouchableOpacity onPress={() => console.log("Pressed smiley")}>
            <Ionicons name="happy-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ width: '54%' }}>
          <TextInput
            value={textMessage}
            onChangeText={setTextMessage}
            style={{
              flex: 1,
              height: 40,
              borderColor: "gray",
              borderRadius: 5,
              fontSize: 17
            }}
            placeholder="Tin nhắn"
          />
        </View>
        <View style={{ flexDirection: 'row', width: '35%', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => console.log("Pressed menu")}>
            <Ionicons
              name="ellipsis-horizontal-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Pressed microphone")}>
            <Ionicons
              name="mic-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={openImagePicker}>
            <Ionicons name="image-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSendMessage}>
            <Ionicons name="paper-plane" size={30} color={isColorSend} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  topSection: {
    backgroundColor: "white",
    padding: 10,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  iconImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  buttonBar: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
  },
  roundedButton: {
    borderRadius: 50,
    backgroundColor: "#bebebe",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
  },
  borderedButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  whiteText: {
    color: "white",
    fontSize: 16,
  },
  grayText: {
    color: "gray",
    fontSize: 16,
  },
  friendList: {
    backgroundColor: "white",
    padding: 10,
    borderTopColor: "#e5e5e5",
    borderTopWidth: 0.5,
  },
  friendListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  addText: {
    color: "#0091FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  friendRow: {
    paddingVertical: 10,
  },
  friendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendName: {
    fontSize: 16,
  },
  friendActions: {
    flexDirection: "row",
  },
  actionIcon: {
    marginRight: 20,
  },
});
export default Message;
