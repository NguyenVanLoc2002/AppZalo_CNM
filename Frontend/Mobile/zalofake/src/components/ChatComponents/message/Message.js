import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView, ActivityIndicator, Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../../api/axiosInstance";
import { useAuthContext } from "../../../contexts/AuthContext";
import moment from 'moment-timezone';
import useMessage from '../../../hooks/useMessage'
import Toast from "react-native-toast-message";

const Message = ({ navigation, route }) => {
  const { user } = route.params;
  const [chats, setChats] = useState([]);
  const scrollViewRef = useRef();
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState("")
  const [isLoad, setIsLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { renderMessageContent,showToastSuccess } = useMessage();
  const [isModalVisible, setModalVisible] = useState(false);
  const [messageSelected, setMessageSelected] = useState("");

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get(`/chats/${user.userId}`);
        const reversedChats = response.data.data.reverse();
        setChats(reversedChats);
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
  const handlePressIn = ( message) => {
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
        if(response.status===200){
         
          
          // Sử dụng hàm removeItemById() để xóa phần tử có ID cụ thể khỏi mảng
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

        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderColor: "gray",
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 5,
            paddingLeft: 10,
          }}
          placeholder="Tin nhắn"
        />

        <TouchableOpacity onPress={() => console.log("Pressed menu")}>
          <Ionicons
            name="ellipsis-horizontal-outline"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Pressed microphone")}>
          <Ionicons
            name="mic-outline"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Pressed image")}>
          <Ionicons name="image-outline" size={30} color="black" style={{}} />
        </TouchableOpacity>
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
            <View style={styles.modalButtonContainer}>
              <Pressable >
                <Text style={styles.modalButton}>Chuyển tiếp</Text>
              </Pressable>
              <Pressable onPress={handleDeleteMess}>
                <Text style={styles.modalButton} >Xóa</Text>
              </Pressable>
              <Pressable >
                <Text style={styles.modalButton}>Thu hồi</Text>
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
});
export default Message;
