import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView, ActivityIndicator, Modal,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../../api/axiosInstance";
import { useAuthContext } from "../../../contexts/AuthContext";
import moment from 'moment-timezone';
import useMessage from '../../../hooks/useMessage'
import Toast from "react-native-toast-message";
import useSendMessage from "../../../hooks/useSendMessage";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
const Message = ({ navigation, route }) => {
  const { user } = route.params;
  //nhi  const 
  [textMessage, setTextMessage] = useState(null)
  const [isColorSend, setIsColorSend] = useState(false)
  const { sendMessage, sendImage } = useSendMessage();
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  //truc
  const [chats, setChats] = useState([]);
  const scrollViewRef = useRef();
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState("")
  const [isLoad, setIsLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { renderMessageContent, showToastSuccess } = useMessage();
  const [isModalVisible, setModalVisible] = useState(false);
  const [messageSelected, setMessageSelected] = useState("");
  const [isModalFriendVisible, setIsModalFriendVisible] = useState(false);
  const [friends, setFriends] = useState([]);
  const [isLoadMess, setIsLoadMess] = useState(false)


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalFriend = () => {
    setIsModalFriendVisible(!isModalFriendVisible);
  };
  const fetchFriends = async () => {
    try {
      const response = await axiosInstance.get('/users/get/friends');
      setFriends(response.data.friends);
      console.log(friends)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get(`/chats/${user.userId}`);
        const reversedChats = response.data.data.reverse();
        setChats(reversedChats);
        fetchFriends();
        const lastElement = reversedChats[0]
        setLastTimestamp(lastElement.timestamp)
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  }, []);


  const handleCheckIsSend = (message) => {
    if (message.senderId === user.userId) {
      return false;
    } else {
      return true;
    }
  };
  const handleGetTime = (time) => {
    const vietnamDatetime = moment(time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    const dateObject = new Date(vietnamDatetime)
    return `${dateObject.getHours()}:${dateObject.getMinutes()}`
  };

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
          <Text style={{ fontSize: 20 }}>{user.profile.name}</Text>
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
  sendImage
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
    if (y === 0) {
      handleScrollToTop();
    }
  };
  const handlePressIn = (message) => {
    setMessageSelected(message)
    setModalVisible(true)
  };
  const removeItemById = (array, idToRemove) => {
    const indexToRemove = array.findIndex(item => item._id === idToRemove);
    if (indexToRemove !== -1) {
      array.splice(indexToRemove, 1);
    }
    return array;
  };
  const handleDeleteMess = () => {
    const deleteChat = async () => {
      try {
        const response = await axiosInstance.post(`chats/${messageSelected._id}/delete`);
        if (response.status === 200) {
          const newArray = removeItemById(chats, messageSelected._id);
          setChats(newArray)
          showToastSuccess("Xóa thành công")
          toggleModal()
        }
      } catch (error) {
        console.log(error);
      }
    };
    deleteChat();
    // setModalVisible(false)
  };
  const handleGetModalFriend = () => {
    toggleModal();
    toggleModalFriend();
  };

  const chuyenTiepChat = (friend) => {
    if (messageSelected.contents[0].type === 'text') {

      const handleSendMessage = async () => {
        try {
          const send = await sendMessage(friend, messageSelected.contents[0].data)
          if (send) {
            showToastSuccess("Chuyển tiếp thành công")
          }
        } catch (error) {
          console.log("error1:", error)
          return false;
        }
      }
      handleSendMessage();
    } else if (messageSelected.contents[0].type === 'image') {
      chuyenTiepImage(friend)
      showToastSuccess("image")
    } else if (messageSelected.contents[0].type === 'video') {
      showToastSuccess("video")
    }
  };

  const chuyenTiepImage = async (friend) => {
    const formData = new FormData();

    messageSelected.contents.forEach(image => {
      const fileName = image.data.split('/').pop();
      formData.append('data', {
        uri: image.data,
        name: fileName,
        type: 'image/jpeg', // Loại hình ảnh có thể thay đổi tùy theo loại tệp
      });
    });
    console.log(formData)
    try {
      const send = await sendImage(friend, formData)
      console.log(send)
      if (send) {
        console.log("send image success");
        // setIsLoadMess(false)
      }
    } catch (error) {
      console.log(error);
      // setIsLoadMess(false)
    }
  };

  //nhi
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
    console.log(pickerResult.assets[0])
    if (!pickerResult.canceled) {
      setIsLoadMess(true)
      const formData = new FormData();
      pickerResult.assets.forEach(image => {
        const fileName = image.uri.split('/').pop();
        formData.append('data', {
          uri: image.uri,
          name: fileName,
          type: 'image/jpeg', // Loại hình ảnh có thể thay đổi tùy theo loại tệp
        });
      });
      console.log(formData)
      try {
        const send = await sendImage(user, formData)
        if (send) {
          console.log("send image success");
          setIsLoadMess(false)
        }
      } catch (error) {
        console.log(error);
        setIsLoadMess(false)
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
      setIsLoadMess(true)
      try {
        const send = await sendMessage(user, textMessage)
        if (send) {
          console.log("truc")
          setTextMessage(null)
          setIsMessageSent(true);
          setIsLoadMess(false)
        }
      } catch (error) {
        console.log(error);
        setIsLoadMess(false)
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E9EB" }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {isLoading ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <View></View>
        )}
        <Toast />
        <ScrollView ref={scrollViewRef}
          onScroll={handleScroll}
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
                <Pressable
                  onPress={() => handlePressIn(message)}
                >
                  <View>
                    {renderMessageContent(message)}
                    <View style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 5 }}><Text style={{ fontSize: 14 }}>{handleGetTime(message.timestamp)}</Text></View>
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </View >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 10,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={() => console.log("Pressed smiley")}>
          <Ionicons name="happy-outline" size={30} color="black" />
        </TouchableOpacity>

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
            {isLoadMess ? (
              <ActivityIndicator color="black" size="large" />
            ) : (
              <Ionicons name="paper-plane" size={30} color={isColorSend} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>
              Choose
            </Text>
            <View style={styles.modalButtonContainer1}>
              <Pressable style={styles.pressCol} onPress={handleGetModalFriend}>
                <FontAwesome5
                  name="share"
                  size={20}
                  color="black"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.modalButton}>Chuyển tiếp</Text>
              </Pressable>
              <Pressable onPress={handleDeleteMess} style={styles.pressCol}>
                <FontAwesome5
                  name="trash"
                  size={20}
                  color="black"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.modalButton} >Xóa</Text>
              </Pressable>
              <Pressable style={styles.pressCol}>
                <FontAwesome5
                  name="comment-slash"
                  size={20}
                  color="black"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.modalButton}>Thu hồi</Text>
              </Pressable>
            </View>
            <View style={styles.modalButtonContainer1}>
              <Pressable style={styles.pressCol}>
                <FontAwesome5
                  name="list"
                  size={20}
                  color="black"
                  style={{margin:'auto'}}
                />
                <Text style={styles.modalButton}>Chọn nhiều</Text>
              </Pressable>

            </View>
            <View style={styles.modalButtonContainer}>
              <Pressable onPress={toggleModal}>
                <Text style={styles.modalButton}>HỦY</Text>
              </Pressable>
              <Pressable >

                <Text style={styles.modalButton}>XÁC NHẬN</Text>

              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalFriendVisible}
        onRequestClose={toggleModalFriend}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>
              Choose
            </Text>
            <View style={styles.modalButtonContainer}>
              <ScrollView>
                <View style={styles.friendList}>
                  <View style={styles.friendListHeader}>
                    <Text style={styles.sectionTitle}>#</Text>
                  </View>
                  {friends.map((friend, index) => (
                    <View key={index} style={styles.friendRow}>
                      <Pressable style={styles.friendItem} >
                        <View style={styles.friendInfo}>
                          <Image
                            source={{
                              uri: friend?.profile?.avatar?.url,
                            }}
                            style={styles.friendAvatar}
                          />
                          <Text style={styles.friendName}>{friend.profile.name}</Text>
                        </View>
                        <View style={styles.friendActions}>
                          <Pressable onPress={() => chuyenTiepChat(friend)} style={styles.pressCol}><FontAwesome5
                  name="arrow-right"
                  size={30}
                  color="black"
                  style={{ alignContent:"center", alignItems:"center"}}
                /></Pressable>
                        </View>
                      </Pressable>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.modalButtonContainer}>
              <Pressable onPress={toggleModalFriend}>
                <Text style={styles.modalButton}>HỦY</Text>
              </Pressable>
              <Pressable >
                <Text style={styles.modalButton}>XÁC NHẬN</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View >
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: 300,
    padding: 20,
    borderRadius: 10,
  },
  modalHeaderText: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20
  },
  modalButton: {
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#0091FF",
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
  pressCol: {
    // flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer1: {
    // flex:1,
    // height: 300,
    // width: 450,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop:20
  },
});
export default Message;
