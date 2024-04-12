import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Modal,
  SafeAreaView,
} from "react-native";
import ChatItem from "./ChatItem";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axiosInstance from "../../../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment-timezone';
import { useAuthContext } from "../../../contexts/AuthContext";
import { useSocketContext } from "../../../contexts/SocketContext"

function Chat({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [listFriends, setListFriends] = useState([]);
  const [isLoad, SetIsLoad] = useState(false);
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext()
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

  const fetchDataConver = async () => {
    try {
      const AsyncStorageValue = await AsyncStorage.getAllKeys();
      // console.log("AsyncStorageValue: ", AsyncStorageValue);
      const response = await axiosInstance.get("/conversations/getConversations");
      if (response.status === 200) {
        // console.log(response.data)
        let data = [];
        let name;
        let image;
        let dataChat;
        let user;
        for (let index = 0; index < response.data.length; index++) {
          const conver = response.data[index];
          // console.log(authUser.phone)
          if (conver.lastMessage !== undefined) {
            if(conver.participants.length!=2){
              for(let index = 0; index < conver.participants.length; index++){
                const part = conver.participants[index];
                name = name + part.profile?.name;
                user = conver;
              };
              image = "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png"
            }else{
              if(conver.participants[0].phone===authUser.phone){
                image = conver.participants[1].profile?.avatar?.url;
                name = conver.participants[1].profile?.name;
                user = conver.participants[1];
                if (conver.participants[1]._id === conver.lastMessage.senderId) {
                  dataChat = conver.participants[1].profile?.name;
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
              }else{
                image = conver.participants[0].profile?.avatar?.url;
                name = conver.participants[0].profile?.name;
                user = conver.participants[0];
                if (conver.participants[0]._id === conver.lastMessage.senderId) {
                  dataChat = conver.participants[0].profile?.name;
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
              }
            }
            
            const conversationNew = {
              conver:conver,
              name: name,
              image:image,
              dataChat:dataChat,
              time: handleGetTime(conver.lastMessage.timestamp),
              user:user
            };
            data.push(conversationNew);
          }
        };
        data.sort((a, b) => b.conver.lastMessage.timestamp - a.conver.lastMessage.timestamp);
        setConversations(data)
        console.log(data)
      }
      else if (response.status === 404) {
        console.log("getFriendError:", error);
      }
    } catch (error) {
      console.log("getFriendError:", error);
    }
  };
  

  // const fetchData = async () => {
  //   try {
  //     const AsyncStorageValue = await AsyncStorage.getAllKeys();
  //     console.log("AsyncStorageValue: ", AsyncStorageValue);
  //     const response = await axiosInstance.get("/users/get/friends");
  //     if (response.status === 200) {
  //       // setFriends(response.data.friends);
  //       fetchDataFriend(response.data.friends)
  //       // console.log(response.data.friends)
  //     }
  //     else if (response.status === 404) {
  //       console.log("getFriendError:", error);
  //     }
  //   } catch (error) {
  //     console.log("getFriendError:", error);
  //   }
  // };
  // const fetchDataFriend = async (fr) => {
  //   const idSet = new Set();
  //   for (let index = 0; index < fr.length; index++) {
  //     const friend = fr[index];
  //     try {
  //       const getChat = await axiosInstance.get(`/chats/${friend.userId}/getLastMessage`);
  //       if (getChat.status === 200) {
  //         let dataChat;
  //         console.log(friend.userId)
  //         console.log(getChat.data.data.senderId)
  //         if (friend.userId === getChat.data.data.senderId) {
  //           dataChat = friend.profile?.name;
  //         } else {
  //           dataChat = 'Bạn'
  //         }
  //         if (getChat.data.data.contents[0].type === "text") {
  //           dataChat = dataChat + ': ' + getChat.data.data.contents[0].data;
  //         } else if (getChat.data.data.contents[0].type === "image") {
  //           dataChat = dataChat + ': [Hình ảnh]';
  //         } else {
  //           dataChat = dataChat + ': [Video]';
  //         }

  //         const newFriend = {
  //           friend: friend,
  //           chat: dataChat,
  //           time: handleGetTime(getChat.data.data.timestamp)
  //         };
  //         if (!idSet.has(friend.userId)) {
  //           setListFriends(prevList => [...prevList, newFriend]);
  //           idSet.add(friend.userId);
  //         }
  //       } else {
  //         console.log("Error get chat");
  //       }
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //   }
  // }
  useEffect(() => {
    const fetchDataListFriend = async () => {
      try {
        await fetchDataConver();
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
    // fetchDataConver();
    navigation.navigate("Message", { conver: item.conver , user: item.user});
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
        data={conversations}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleChatItemPress(item)} >
            <ChatItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.conver._id}
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
  }
});

export default Chat;
