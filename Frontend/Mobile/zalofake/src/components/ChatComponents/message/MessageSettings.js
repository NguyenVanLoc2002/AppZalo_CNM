import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Switch } from "react-native";

const MessageSettings = ({ navigation, route }) => {
  const { conver } = route.params;
  const [isMarkAsCloseFriend, setMarkAsCloseFriend] = useState(false);
  const [isPinChat, setPinChat] = useState(false);
  const [isHideChat, setHideChat] = useState(false);
  const [isNotifyIncomingCalls, setNotifyIncomingCalls] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Tùy chọn
          </Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#0091FF",
        shadowColor: "#fff",
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
    });
  }, [navigation]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable
        style={{
          height: 150,
          backgroundColor: "purple",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          backgroundColor: "white",
        }}
        onPress={() => navigation.navigate("FriendProfile", { conver })}
      >
        <Image
          source={{ uri: conver.avatar }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{conver.name}</Text>
      </Pressable>
      <View
        style={{
          height: 100,
          backgroundColor: "white",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 50,
        }}
      >
        <View
          style={{
            width: 70,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#F2F2F2",
              borderRadius: 25,
              padding: 5,
              opacity: 0.5,
            }}
          >
            <Ionicons
              name="search"
              size={24}
              color="black"
              style={{ padding: 5 }}
            />
          </View>
          <Text style={{ textAlign: "center", color: "black" }}>
            Tìm{"\n"}Tin Nhắn
          </Text>
        </View>
        <Pressable
          style={{
            width: 70,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#F2F2F2",
              borderRadius: 25,
              padding: 5,
              opacity: 0.5,
            }}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color="black"
              style={{ padding: 5 }}
            />
          </View>
          <Text style={{ textAlign: "center", color: "black" }}>
            Trang{"\n"}cá nhân
          </Text>
        </Pressable>
        <View
          style={{
            width: 70,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#F2F2F2",
              borderRadius: 25,
              padding: 5,
              opacity: 0.5,
            }}
          >
            <Ionicons
              name="brush-outline"
              size={24}
              color="black"
              style={{ padding: 5 }}
            />
          </View>
          <Text style={{ textAlign: "center", color: "black" }}>
            Đổi{"\n"}hình nền
          </Text>
        </View>
        <View
          style={{
            width: 70,
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#F2F2F2",
              borderRadius: 25,
              padding: 5,
              opacity: 0.5,
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color="black"
              style={{ padding: 5 }}
            />
          </View>
          <Text style={{ textAlign: "center", color: "black" }}>
            Tắt{"\n"}thông báo
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <Ionicons
          name="notifications-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Mã hóa đầu cuối
        </Text>
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="pencil"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Đổi tên gợi nhớ
        </Text>
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="star-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Đánh dấu bạn thân
        </Text>
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="time-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Nhật ký chung
        </Text>
        <View style={{ flex: 1 }} />
        <Switch
          trackColor={{ false: "#767577", true: "#0091FF" }}
          thumbColor={isMarkAsCloseFriend ? "#0091FF" : "#f4f3f4"}
          onValueChange={() => setMarkAsCloseFriend(!isMarkAsCloseFriend)}
          value={isMarkAsCloseFriend}
          style={{ marginEnd: 15 }}
        />
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
          marginVertical: 10,
        }}
      >
        <Ionicons
          name="images-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Ảnh, file, link đã gửi
        </Text>
      </View>
      <Pressable
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
        onPress={() => navigation.navigate("CreateGroup")}
      >
        <Ionicons
          name="add-circle-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          {`Tạo nhóm với ${conver.name}`}
        </Text>
      </Pressable>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="person-add-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          {`Thêm ${conver.name} vào nhóm`}
        </Text>
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="people-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Xem nhóm chung
        </Text>
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <MaterialCommunityIcons
          name="pin-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Ghim trò chuyện
        </Text>
        <View style={{ flex: 1 }} />
        <Switch
          trackColor={{ false: "#767577", true: "#0091FF" }}
          thumbColor={isPinChat ? "#0091FF" : "#f4f3f4"}
          onValueChange={() => setPinChat(!isPinChat)}
          value={isPinChat}
          style={{ marginEnd: 15 }}
        />
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="eye-off-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Ẩn trò chuyện
        </Text>
        <View style={{ flex: 1 }} />
        <Switch
          trackColor={{ false: "#767577", true: "#0091FF" }}
          thumbColor={isHideChat ? "#0091FF" : "#f4f3f4"}
          onValueChange={() => setHideChat(!isHideChat)}
          value={isHideChat}
          style={{ marginEnd: 15 }}
        />
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="call-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Báo cuộc gọi đến
        </Text>
        <View style={{ flex: 1 }} />
        <Switch
          trackColor={{ false: "#767577", true: "#0091FF" }}
          thumbColor={isNotifyIncomingCalls ? "#0091FF" : "#f4f3f4"}
          onValueChange={() => setNotifyIncomingCalls(!isNotifyIncomingCalls)}
          value={isNotifyIncomingCalls}
          style={{ marginEnd: 15 }}
        />
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="stopwatch-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Tin nhắn tự xóa
        </Text>
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="settings-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Cài đặt cá nhân
        </Text>
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
          marginTop: 10,
        }}
      >
        <Ionicons
          name="warning-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>Báo xấu</Text>
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <SimpleLineIcons
          name="ban"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Quản lý chặn
        </Text>
        <View style={{ flex: 1 }} />
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="pie-chart-outline"
          size={24}
          color="black"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "black" }}>
          Dung lượng trò chuyện
        </Text>
      </View>
      <View
        style={{
          height: 50,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons
          name="trash-outline"
          size={24}
          color="red"
          style={{ marginHorizontal: 15 }}
        />
        <Text style={{ textAlign: "center", color: "red" }}>
          Xóa lịch sử trò chuyện
        </Text>
      </View>
    </ScrollView>
  );
};

export default MessageSettings;
