import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  SafeAreaView, ActivityIndicator
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
import useCreateGroup from "../../../hooks/useCreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { setIsGroup } from "../../../redux/stateCreateGroupSlice";

function Chat({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { conversations, getConversations, getConversationByID } = useConversation();
  const { groups, getGroups } = useGroup();
  const [listFriends, setListFriends] = useState([]);
  const [chats, setChats] = useState([]);
  const [isLoad, SetIsLoad] = useState(false);
  const { authUser } = useAuthContext();
  const { getUserById } = useCreateGroup()
  const { isNewSocket, newSocketData, socket } = useSocketContext();
  const { showToastSuccess } = useMessage();
  var isGroup = useSelector(state => state.isGroup.isGroup);
  const dispatch = useDispatch();

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
        _id: friend?._id,
        conversation: conversation,
        name: friend?.profile.name,
        avatar: friend?.profile.avatar?.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
        background: friend?.profile.background?.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
        unread: conversation.messages.some(
          (message) => message.receiver === authUser.phone && !message.isRead
        ),
        lastMessage: conversation?.lastMessage,
        tag: conversation.tag,
      };
    });

    const listGroup = groups.map((group) => {
      return addDataToGroup(group)
    });
    listChat.push(...listGroup);
    fetchDataConver(listChat)
  };

  const addDataToGroup = (group) => {
    return {
      _id: group._id,
      conversation: group.conversation,
      name: group.groupName,
      avatar: group.avatar.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
      background: group.avatar.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
      lastMessage: group.lastMessage,
      tag: group.conversation.tag,
      createBy: group.createBy,
    };
  }
  useEffect(() => {
    fetchDataChat();
  }, [conversations, groups]);

  const fetchDataConver = async (listChat) => {
    let data = [];
    let int = listChat.length;

    for (let index = 0; index < int; index++) {

      const conver = listChat[index];

      if (conver.lastMessage) {
        const dataChat = await setDataChat(conver.lastMessage, false);
        const conversationNew = {
          conversation: conver,
          dataChat: dataChat,
          time: handleGetTime(conver?.lastMessage?.timestamp)
        };
        data.push(conversationNew);

      }

    };
    sortTime(data)
    setListFriends(data);
  };

  const sortTime = (data) => {
    data.sort((a, b) => {
      const timeA = a?.conversation?.lastMessage?.timestamp || "";
      const timeB = b?.conversation?.lastMessage?.timestamp || "";
      return timeB.localeCompare(timeA);
    });
    return data;
  }
  const setDataChat = async (conver, isDelete) => {
    let dataChat = '';
    if (conver) {
      const getUser = await getUserById(conver.senderId)
      if (authUser.profile.name === getUser.user.profile.name) {
        dataChat = "Bạn"
      } else {
        dataChat = getUser.user.profile.name
      }
      if (isDelete) {
        dataChat = dataChat + ": đã thu hồi tin nhắn";
      }
      else {
        if (conver.contents[0].type === "text") {
          dataChat = dataChat + ': ' + conver.contents[0].data;
        } else if (conver.contents[0].type === "image") {
          dataChat = dataChat + ': [Hình ảnh]';
        } else {
          dataChat = dataChat + ': [Video]';
        }
      }
    }
    return dataChat;
  }
  const updatedListFriends = async (conversationId, message, isDelete) => {
    const updatedListFriends = await Promise.all(listFriends.map(async (item) => {
      if (item.conver.conversation._id === conversationId) {
        const dataChat = await setDataChat(message, isDelete);
        return {
          ...item,
          conversation: {
            ...item?.conversation,
            lastMessage: message
          },
          dataChat: dataChat,
          time: handleGetTime(message?.timestamp)
        };
      }
      return item;
    }));
    return updatedListFriends;
  }


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

    const fetchSocket = async () => {
      if (isNewSocket === "new_message") {
        const message = newSocketData;
        if (message) {
          // console.log("messagge", JSON.stringify(message));
          console.log("socket new message");
          const update = await updatedListFriends(message.conversationId, message.retrunMessage, false)
          const sortUpdate = sortTime(update);
          setListFriends(sortUpdate)
        }
      }
      if (isNewSocket === "delete_message") {
        const { chatRemove, conversationId, isDeleted } = newSocketData;
        if (chatRemove) {
          if (isDeleted) {
            console.log("delete_conversation", conversationId);
            const updatedListFriends = listFriends.map((item) => {
              if (item.conversation.conversation._id === conversationId) {
                console.log("hihi");
              }
            })
          } else {
            const update = await updatedListFriends(conversationId, chatRemove, true)
            const sortUpdate = sortTime(update);
            setListFriends(sortUpdate)
          }
        }
      }
      if (isNewSocket === "add-to-group") {
        const data = newSocketData;
        if (!listFriends.find(item => item.conversation._id === data.group._id)) {
          const group = data.group
          if (data.addMembers.includes(authUser._id)) {
            console.log(`Bạn đã tham gia nhóm ${data.group.groupName}`);
            showToastSuccess(`Bạn đã tham gia nhóm ${data.group.groupName}`)
          }
          const conver = await getConversationByID(group.conversation._id)
          group.lastMessage = conver.lastMessage
          const addGroup = addDataToGroup(group)
          const dataChat = await setDataChat(addGroup.lastMessage, false);
          const conversationNew = {
            conversation: addGroup,
            dataChat: dataChat,
            time: handleGetTime(addGroup.lastMessage.timestamp)
          };
          const newListFriends = [...listFriends, conversationNew]
          const sortUpdate = sortTime(newListFriends);
          setListFriends(sortUpdate)
        }
      }

      if (isNewSocket === "remove-from-group") {
        if (newSocketData.removeMembers) {
          var isChange = newSocketData
          if (isChange) {
            if (isChange.removeMembers?.includes(authUser._id)) {
              console.log(`Bạn đã bị xoá khỏi nhóm ${isChange.name}`);
              showToastSuccess(`Bạn đã bị xoá khỏi nhóm ${isChange.name}`)
              const updatedConversationList = listFriends.filter(item => item.conversation._id !== isChange.id);
              setListFriends(updatedConversationList)
              getGroups()
              fetchDataListFriend()
              fetchDataChat()
              isChange = null
            }
            isChange = null
          }
        }
      }
      
    }
    fetchSocket()
    fetchDataListFriend()
  }, [isNewSocket, newSocketData, isGroup]);

  const handleChatItemPress = (item) => {
    navigation.navigate("Message", { conver: item.conversation });
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
      <FlatList
        data={listFriends}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleChatItemPress(item)} >
            <ChatItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.conversation.conversation._id}
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
    display: 'flex',
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
    flexDirection: 'row'
  },
});

export default Chat;
