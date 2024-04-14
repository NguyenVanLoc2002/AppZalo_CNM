import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  SafeAreaView,ActivityIndicator
} from "react-native";
import ChatItem from "./ChatItem";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axiosInstance from "../../../api/axiosInstance";
import Toast from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";
import moment from 'moment-timezone';
import { useAuthContext } from "../../../contexts/AuthContext";
import { useSocketContext } from "../../../contexts/SocketContext";
import useConversation from "../../../hooks/useConversation";
import useGroup from "../../../hooks/useGroup";
import useMessage from '../../../hooks/useMessage'
function Chat({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { conversations, getConversations } = useConversation();
  const { groups, getGroups } = useGroup();
  // const [conversations, setConversations] = useState([]);
  const [listFriends, setListFriends] = useState([]);
  const [chats, setChats] = useState([]);
  const [isLoad, SetIsLoad] = useState(false);
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const [isModalVisibleXoa, setModalVisibleXoa] = useState(false);
  const [isLoadXoa, setIsLoadXoa] = useState(false)
  const [itemCurrent, setItemCurrent] = useState()
  const { showToastSuccess, showToastError } = useMessage();

  const toggleModal = () => {
    setModalVisibleXoa(!isModalVisibleXoa);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <Pressable style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={22}
              color="white"
            />
          </Pressable>
          <Pressable
            onPress={() => setModalVisible(!isModalVisible)}
            style={styles.headerIcon}
          >
            <Ionicons name="add" size={24} color="white" />
          </Pressable>
        </View>
      ),
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="search"
            size={24}
            color="white"
            style={{ marginLeft: 5, marginRight: 25 }}
          />
          <TextInput
            onFocus={() => {
              navigation.navigate("SearchFriends");
            }}
            focusable={false}
            style={{
              height: 45,
              width: 300,
              marginLeft: 25,
              fontSize: 16,
            }}
            placeholder="Tìm kiếm"
            placeholderTextColor={"white"}
          />
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

  const fetchDataChat = async () => {
    const listChat = conversations.map((conversation) => {
      const friend = conversation.participants.find(
        (participant) => participant.phone !== authUser.phone
      );

      return {
        id: friend?._id,
        conversationId: conversation.id,
        name: friend?.profile.name,
        avatar: friend?.profile.avatar?.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
        background: friend?.profile.background?.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
        unread: conversation.messages.some(
          (message) => message.receiver === authUser.phone && !message.isRead
        ),
        lastMessage: conversation.lastMessage,
        tag: conversation.tag,
      };
    });


    const listGroup = groups.map((group) => {
      return {
        id: group._id,
        conversationId: group.conversation._id,
        name: group.groupName,
        avatar: group.avatar.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
        background: group.avatar.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
        lastMessage: group.lastMessage,
        tag: group.conversation.tag,
      };
    });
    listChat.push(...listGroup);
    // console.log(listChat);
    fetchDataConver(listChat)
  };

  useEffect(() => {
   
    fetchDataChat();
  }, [conversations, groups]);

  const fetchDataConver = async (listChat) => {

    let data = [];
    let dataChat;
    let int = listChat.length;
    // console.log(listChat)
    for (let index = 0; index < int; index++) {

      const conver = listChat[index];
      if (conver.lastMessage !== undefined && conver.lastMessage !== null) {
        if (conver.id === conver.lastMessage.senderId) {
          dataChat = conver.name;
        } else {
          dataChat = 'Bạn'
        }
        if (conver.lastMessage.contents[0].type === "text") {
          dataChat = dataChat + ': ' + conver.lastMessage.contents[0].data;
        } else if (conver.lastMessage.contents[0].type === "image") {
          dataChat = dataChat + ': [Hình ảnh]';
        } else {
          dataChat = dataChat + ': [Video]';
        }
        const conversationNew = {
          conver: conver,
          dataChat: dataChat,
          time: handleGetTime(conver.lastMessage.timestamp)
        };
        data.push(conversationNew);

      }

    };
    data.sort((a, b) => {
      const timeA = a.conver.lastMessage.timestamp || "";
      const timeB = b.conver.lastMessage.timestamp || "";
      return timeB.localeCompare(timeA);
    });
    setListFriends(data);

  };

  useEffect(() => {
    const fetchDataListFriend = async () => {
      try {

        getConversations();
        getGroups();

      } catch (error) {
        console.log("getFriendError:", error);
      }
    };
    if (!isLoad) {
      fetchDataListFriend();
      SetIsLoad(true);
    }
  }, []);
  const handleChatItemPress = (item) => {

    setItemCurrent(item);
    // fetchDataConver();
    toggleModal();
    // navigation.navigate("Message", { conver: item.conver});
  };
  const removeItemById = (array, idToRemove) => {
    const indexToRemove = array.findIndex(item => item.id === idToRemove);
    if (indexToRemove !== -1) {
      array.splice(indexToRemove, 1);
    }
    return array;
  };
  const handleDelete = () => {
    setIsLoadXoa(true)
    const deleteChat = async () => {
      try {
        const response = await axiosInstance.post(`/conversations/deleted/${itemCurrent.conver.conversationId}`);
        console.log(response)
        if (response.status === 200) {
          removeItemById(conversations, itemCurrent.conver.conversationId);
          fetchDataChat();
          showToastSuccess("Xóa thành công")
          toggleModal()
          setIsLoadXoa(false)
        }
      } catch (error) {
        console.log(error);
        setIsLoadXoa(false)
        toggleModal()
      }
    };
    deleteChat();
  };

  const handleView = () => {
    toggleModal();
    console.log('1')
    navigation.navigate("Message", { conver: itemCurrent.conver });
  };
  const handleGetTime = (time) => {
    const currentTime = moment().tz('Asia/Ho_Chi_Minh'); // Lấy thời gian hiện tại ở múi giờ Việt Nam
    const vietnamDatetime = moment(time).tz('Asia/Ho_Chi_Minh'); // Chuyển đổi thời gian đã cho sang múi giờ Việt Nam
    const timeDifference = moment.duration(currentTime.diff(vietnamDatetime)); // Tính khoảng cách thời gian

    const days = Math.floor(timeDifference.asDays()); // Số ngày
    const hours = Math.abs(timeDifference.hours()); // Số giờ (dương)
    const minutes = Math.abs(timeDifference.minutes()); // Số phút (dương)

    if (days >= 1) {
      return `${days} ngày`;
    }
    else if (hours >= 1) {
      return `${hours} giờ`;
    }
    else {
      return `${minutes} phút`;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Toast />
      <FlatList
        data={listFriends}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleChatItemPress(item)} >
            <ChatItem item={item} />
          </Pressable>
        )}
      // keyExtractor={(item) => item.conver.conversationId}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(!isModalVisible)}
      >
        <Pressable
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-end",
            marginEnd: 10,
            marginTop: 10,
          }}
          onPress={() => setModalVisible(!isModalVisible)}
        >
          <View
            style={{ backgroundColor: "white", padding: 10, borderRadius: 10 }}
          >
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
              onPress={() => {
                navigation.navigate("AddFriends");

                setModalVisible(!isModalVisible);
              }}
            >
              <Ionicons
                name="person-add-outline"
                size={22}
                color="grey"
                style={{ marginRight: 10 }}
              />
              <Text>Thêm bạn</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Ionicons
                name="people-outline"
                size={22}
                color="grey"
                style={{ marginRight: 10 }}
              />
              <Text>Tạo nhóm</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Ionicons
                name="cloud-outline"
                size={22}
                color="grey"
                style={{ marginRight: 10 }}
              />
              <Text>Cloud của tôi</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Ionicons
                name="calendar-outline"
                size={22}
                color="grey"
                style={{ marginRight: 10 }}
              />
              <Text>Lịch Zalo</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Ionicons
                name="videocam-outline"
                size={22}
                color="grey"
                style={{ marginRight: 10 }}
              />
              <Text>Tạo cuộc gọi nhóm</Text>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Ionicons
                name="desktop-outline"
                size={22}
                color="grey"
                style={{ marginRight: 10 }}
              />
              <Text>Thiết bị đăng nhập</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisibleXoa}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>
              {/* {itemCurrent.conver.name} */}
            </Text>
            <View style={styles.modalButtonContainer1}>

              <Pressable style={styles.pressCol} onPress={handleDelete}>
                {isLoadXoa ? (
                  <ActivityIndicator color="black" size="large" />
                ) : (
                  <FontAwesome5
                    name="trash"
                    size={20}
                    color="black"
                    style={{ marginRight: 8 }}
                  />
                )}
                <Text style={styles.modalButton} >Xóa trò chuyện</Text>
              </Pressable>

            </View>
            <View style={styles.modalButtonContainer1} >
              <Pressable style={styles.pressCol} onPress={handleView}>
                <FontAwesome5
                  name="list"
                  size={20}
                  color="black"
                  style={{ margin: 'auto' }}
                />
                <Text style={styles.modalButton}>Xem trò chuyện</Text>
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  modalButtonContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 20,
   
  },
  headerIcon: {
    padding: 10,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    marginLeft: 10,
  },
  headerTitleText: {
    color: "gray",
    fontSize: 18,
    marginLeft: 40,
  },
  button: {
    backgroundColor: '#fff'
  },
  pressedButton: {
    backgroundColor: '#33c4c2'
  },
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
    display:'flex',
    flexDirection: "column",
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
  pressCol: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
});

export default Chat;
