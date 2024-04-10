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

function Chat({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  // const [friends, setFriends] = useState([]);
  const [listFriends, setListFriends] = useState([]);
  const [isLoad, SetIsLoad] = useState(false);
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


  const fetchData = async () => {
    try {
      const AsyncStorageValue = await AsyncStorage.getAllKeys();
      console.log("AsyncStorageValue: ", AsyncStorageValue);
      const response = await axiosInstance.get("/users/get/friends");
      if (response.status === 200) {
        // setFriends(response.data.friends);
        fetchDataFriend(response.data.friends)
        // console.log(response.data.friends)
      }
      else if (response.status === 404) {
        console.log("getFriendError:", error);
      }
    } catch (error) {
      console.log("getFriendError:", error);
    }
  };
  const fetchDataFriend = async (fr) => {
    const idSet = new Set();
    for (let index = 0; index < fr.length; index++) {
      const friend = fr[index];
      try {
        const getChat = await axiosInstance.get(`/chats/${friend.userId}/getLastMessage`);
        if (getChat.status === 200) {
          let dataChat;
          console.log(friend.userId)
          console.log(getChat.data.data.senderId)
          if(friend.userId === getChat.data.data.senderId){
            dataChat = friend.profile?.name ;
          }else{
            dataChat = 'Bạn'
          }
          if (getChat.data.data.contents[0].type === "text") {
            dataChat = dataChat + ': ' +getChat.data.data.contents[0].data;
          } else if (getChat.data.data.contents[0].type === "image") {
            dataChat =  dataChat +': [Hình ảnh]';
          } else {
            dataChat = dataChat +': [Video]';
          }
          
          const newFriend = {
            friend: friend,
            chat: dataChat,
            time: handleGetTime(getChat.data.data.timestamp)
          };
          if (!idSet.has(friend.userId)) {
            setListFriends(prevList => [...prevList, newFriend]);
            idSet.add(friend.userId);
          }
        } else {
          console.log("Error get chat");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }
  useEffect(() => {
    const fetchDataListFriend = async () => {
      try {
        await fetchData();
      } catch (error) {
        console.log("getFriendError:", error);
      }
    };
    if(!isLoad){
      fetchDataListFriend();
      SetIsLoad(true);
    }
  }, []);
  const handleChatItemPress = (item) => {
    navigation.navigate("Message", { user: item.friend });
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
    else if(hours>=1){
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
            <ChatItem item={item}  />
          </Pressable>
        )}
        keyExtractor={(item) => item.url}
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
