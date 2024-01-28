import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import ChatItem from "./ChatItem";
import { Ionicons } from "@expo/vector-icons";

function Chat({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);

  navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: "row" }}>
        <Pressable>
          <Ionicons
            name="qr-code"
            size={24}
            color="white"
            style={{ padding: 5, paddingStart: 15 }}
          />
        </Pressable>
        <Pressable onPress={() => setModalVisible(!isModalVisible)}>
          <Ionicons name="add" size={24} color="white" style={{ padding: 5 }} />
        </Pressable>
      </View>
    ),
    headerTitle: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="search"
          size={24}
          color="white"
          style={{ position: "absolute", marginLeft: 10 }}
        />
        <TextInput
          onFocus={() => {
            navigation.navigate("SearchFriends");
          }}
          style={{
            flex: 1,
            height: 45,
            width: 300,
            paddingLeft: 40,
            borderRadius: 10,
            color: "white",
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
  // Mảng dữ liệu mẫu
  const [users, setUsers] = useState([
    {
      ten: "Nguyen Van A",
      url: "https://randomuser.me/api/portraits/men/68.jpg",
      tinNhan: "Hello",
      soTNChuaDoc: 6,
      thoiGian: 2,
    },
    {
      ten: "Luong thi Tho",
      url: "https://randomuser.me/api/portraits/men/70.jpg",
      tinNhan: "Khoe khong",
      soTNChuaDoc: 0,
      thoiGian: 6,
    },
    {
      ten: "Nguyen Van Teo",
      url: "https://randomuser.me/api/portraits/men/80.jpg",
      tinNhan: "An com chua",
      soTNChuaDoc: 0,
      thoiGian: 0,
    },
    {
      ten: "Le Van Ty",
      url: "https://randomuser.me/api/portraits/men/90.jpg",
      tinNhan: "Dang lam gi the",
      soTNChuaDoc: 5,
      thoiGian: 8,
    },
    {
      ten: "Huynh Quoc Hao",
      url: "https://randomuser.me/api/portraits/men/10.jpg",
      tinNhan:
        "Cupidatat do aliquip excepteur magna Lorem pariatur. Qui aliqua adipisicing dolore sint qui dolor elit cillum. Labore Lorem velit ullamco proident aliquip labore ad ad. Fugiat sunt aute labore dolor et laboris. Consectetur velit Lorem minim anim adipisicing irure. Lorem adipisicing aliquip dolor pariatur dolore velit id sit id incididunt dolore.",
      soTNChuaDoc: 7,
      thoiGian: 0,
    },
    {
      ten: "Bui Tri Thuc",
      url: "https://randomuser.me/api/portraits/men/20.jpg",
      tinNhan:
        "Nisi ipsum aute commodo laboris pariatur amet ut. Enim cillum eiusmod ex esse Lorem anim minim pariatur reprehenderit anim reprehenderit commodo. Cillum Lorem voluptate adipisicing Lorem ullamco commodo commodo deserunt sit ullamco culpa ex dolore. Nostrud enim ullamco nostrud occaecat non elit consequat non pariatur nostrud voluptate aute duis. Do ut consequat mollit ipsum consequat ullamco aute aute quis ullamco deserunt enim proident.",
      soTNChuaDoc: 3,
      thoiGian: 12,
    },
    {
      ten: "Thanh Tam",
      url: "https://randomuser.me/api/portraits/men/53.jpg",
      tinNhan: "lam bai tap chua",
      soTNChuaDoc: 0,
      thoiGian: 5,
    },
    {
      ten: "Hung Dung",
      url: "https://randomuser.me/api/portraits/men/62.jpg",
      tinNhan: "lam bai tap chua",
      soTNChuaDoc: 4,
      thoiGian: 0,
    },
    {
      ten: "Nam",
      url: "https://randomuser.me/api/portraits/men/26.jpg",
      tinNhan: "lam bai tap chua",
      soTNChuaDoc: 7,
      thoiGian: 2,
    },
    {
      ten: "Hau",
      url: "https://randomuser.me/api/portraits/men/63.jpg",
      tinNhan: "lam bai tap chua",
      soTNChuaDoc: 0,
      thoiGian: 3,
    },
  ]);

  const handleChatItemPress = (item) => {
    // Chuyển đến trang Message
    navigation.navigate("Message", { user: item });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleChatItemPress(item)}>
            <ChatItem item={item} />
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
                size={24}
                color="black"
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
                size={24}
                color="black"
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
                size={24}
                color="black"
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
                size={24}
                color="black"
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
                size={24}
                color="black"
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
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text>Thiết bị đăng nhập</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export default Chat;
