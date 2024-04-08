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
function Chat({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    try {
      const response = await axiosInstance.get("/conversations/getConversations");
      setConversations(response.data);
      // console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    
    fetchConversations();
  }, []);



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

  // Mảng dữ liệu mẫu
 

  const handleChatItemPress = (item) => {
    fetchConversations()
    // fetchConversations()
    // Chuyển đến trang Message
    // console.log(item.participants[0]._id)
    // navigation.navigate("Message", { user: item });
  };
  const [user, setUser] = useState();
  // router.get("/get/uid/:uid", protect, getUserByPhoneOrId);

  useEffect(() => {
    const fetchUser = async (item) => {
      console.log(item)
      try {
        const response = await axiosInstance.get(`/users/get/uid/${item.participants[0]._id}`);
       return response.data;
        // console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleChatItemPress(item)}>
            <ChatItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item}
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
});

export default Chat;
