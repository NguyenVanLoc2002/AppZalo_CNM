import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  SafeAreaView
} from "react-native";
import ChatItem from "./ChatItem";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useSocketContext } from "../../../contexts/SocketContext";
import useConversation from "../../../hooks/useConversation";
import useGroup from "../../../hooks/useGroup";
import useMessage from '../../../hooks/useMessage'
import { useSelector } from "react-redux";

function Chat({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { conversations, getConversations } = useConversation();
  const { groups, getGroups } = useGroup();
  const [listFriends, setListFriends] = useState([]);
  const { authUser } = useAuthContext();
  const { isNewSocket, newSocketData, setNewSocketData } = useSocketContext();
  const { showToastSuccess, handleGetTimeInChat, setDataChat, sortTime } = useMessage();
  var isGroupRedux = useSelector(state => state.isGroup.isGroup);
  
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
        lastMessage: conversation?.lastMessage,
        tag: conversation.tag,
      };
    });

    const listGroup = groups.map((group) => {
      return addDataToGroup(group);
    });
    listChat.push(...listGroup);
    fetchDataConver(listChat);
  };
  const addDataToGroup = (group) => {
    return {
      _id: group._id,
      conversation: group.conversation,
      name: group.groupName,
      avatar: group.avatar.url,
      lastMessage: group.lastMessage || group.conversation.lastMessage,
      tag: group.conversation.tag,
      createBy: group.createBy,
      createAt: group?.createAt,
    };
  };
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
          chat: conver,
          dataChat: dataChat,
          time: handleGetTimeInChat(conver?.lastMessage?.timestamp)
        };
        data.push(conversationNew);
      }
    };
    sortTime(data)
    setListFriends(data);
  };

  const updatedListFriends = async (conversationId, message, isDelete) => {
    const updatedListFriends = await Promise.all(listFriends.map(async (item) => {
      if (item.chat.conversation._id === conversationId) {
        const dataChat = await setDataChat(message, isDelete);
        return {
          ...item,
          chat: {
            ...item?.chat,
            lastMessage: message
          },
          dataChat: dataChat,
          time: handleGetTimeInChat(message?.timestamp)
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
    fetchDataListFriend();
  }, [isGroupRedux])

  useEffect(() => {
    const fetchSocket = async () => {
      if (isNewSocket === "new_message") {
        const message = newSocketData;
        if (message && message.retrunMessage) {
          // console.log("new_message:", message);
          const update = await updatedListFriends(message.conversationId, message.retrunMessage, false)
          const sortUpdate = sortTime(update);
          setListFriends(sortUpdate);
          setNewSocketData(null);
        }
      }
      if (isNewSocket === "delete_message") {
        const { chatRemove, conversationId, isDeleted } = newSocketData;
        if (chatRemove) {
          if (isDeleted) {
            const updatedListFriends = listFriends.map((item) => {
              if (item.chat.conversation._id === conversationId) {

              }
            });
          } else {
            // console.log("delete_message:", chatRemove);
            const update = await updatedListFriends(conversationId, chatRemove, true)
            setListFriends(update)
          }
        }
      }
      if (isNewSocket === "add-to-group") {
        const data = newSocketData;
        if (data && data.addMembers) {
          // console.log("add-to-group", data)
          if (!listFriends.find(item => item.chat._id === data.group._id)) {
            const group = data.group
            if (data.addMembers.includes(authUser._id) && group.createBy._id !== authUser._id) {
              console.log(`Bạn đã tham gia nhóm ${group.groupName}`);
              showToastSuccess(`Bạn đã tham gia nhóm ${group.groupName}`)
              const addGroup = addDataToGroup(group)
              let dataChat
              if (addGroup?.lastMessage?.senderId) {
                dataChat = await setDataChat(addGroup.lastMessage, false);
              }
              const conversationNew = {
                chat: addGroup,
                dataChat: dataChat || 'Chưa có tin nhắn',
                time: handleGetTimeInChat(addGroup?.lastMessage?.timestamp || addGroup.createAt)
              };
              const newListFriends = [conversationNew, ...listFriends]
              setListFriends(newListFriends);
              setNewSocketData(null);
            }
          }
        }
      }

      if (isNewSocket === "remove-from-group") {
        const group = newSocketData
        if (group && group.removeMembers) {
          // console.log("remove-from-group", group);
          if (group.removeMembers.includes(authUser._id)) {
            console.log(`Bạn đã bị xoá khỏi nhóm ${group.name}`);
            showToastSuccess(`Bạn đã bị xoá khỏi nhóm ${group.name}`)
            const updatedConversationList = listFriends.filter(item => item.chat._id !== group.id);
            setListFriends(updatedConversationList)
            setNewSocketData(null);
          }
        }
      }
      if (isNewSocket === "delete-group") {
        const group = newSocketData;
        // console.log("delete-group", group);
        if (group && group.name) {
          showToastSuccess(`Nhóm ${group.name} đã giải tán`)
          const updatedConversationList = listFriends.filter(item => item.chat._id !== group.id);
          setListFriends(updatedConversationList)
          setNewSocketData(null);
        }
      }
      if (isNewSocket === "update-group") {
        const group = newSocketData
        if (group && group.avatar) {
          // console.log("update-group", group);
          const groupUpdate = listFriends.map((item) => {
            if (item.chat._id === group.id) {
              return {
                ...item,
                chat: {
                  ...item.chat,
                  name: group.name,
                  avatar: group.avatar
                }
              }
            }
            return item;
          })
          setListFriends(groupUpdate)
        }
      }
    }

    fetchSocket()
  }, [isNewSocket, newSocketData]);

  const handleChatItemPress = (item) => {
    navigation.navigate("Message", { chatItem: item.chat });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={listFriends}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleChatItemPress(item)}>
            <ChatItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.chat.conversation._id}
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
    alignItems: "center",
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
    backgroundColor: "#fff",
  },
  pressedButton: {
    backgroundColor: "#33c4c2",
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
    display: "flex",
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
    marginTop: 20,
  },
  modalButton: {
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#0091FF",
  },
  pressCol: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default Chat;