import { View, Text, Image, TextInput, Pressable } from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const AddFriends = ({ navigation }) => {
  navigation.setOptions({
    headerTitle: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        Thêm bạn
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
  return (
    <View style={{ flex: 1, backgroundColor: "#E5E9EB" }}>
      <View
        style={{
          height: 200,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 170,
            width: 170,
            backgroundColor: "#447FAC",
            borderRadius: 20,
            // flex : 1,
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <Text style={{ fontSize: 20, color: "white", fontWeight: 600 }}>
            Meo Meo
          </Text>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP9K07HCn8Ia93xqZUHwjXID8gc3EUsasv7Q&usqp=CAU",
            }}
            style={{ height: 80, width: 80, resizeMode: "cover" }}
          />
          <Text style={{ fontSize: 10, color: "white" }}>
            Quét mã để thêm bạn Zalo với tôi
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 60,
          backgroundColor: "white",
          marginTop: 2,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            height: 40,
            width: "100%",
            marginLeft: 40,
            marginRight: 10,
            borderRadius: 10,
            color: "black",
            backgroundColor: "#F2F2F2",
            paddingStart: 20,
          }}
          placeholder="Nhập số điện thoại"
          placeholderTextColor={"#8B8B8B"}
        />
        <View
          style={{
            backgroundColor: "#0091FF",
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            width: 40,
            borderRadius: 25,
            marginEnd: 20,
          }}
        >
          <Ionicons
            name="arrow-forward"
            size={25}
            color="grap"
            style={{ marginHorizontal: 10 }}
          />
        </View>
      </View>
      <View
        style={{
          height: 50,
          marginTop: 2,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
        }}
      >
        <Ionicons name="qr-code" size={27} style={{ marginHorizontal: 15 }} />
        <Text style={{ textAlign: "center" }}>Quét mã QR</Text>
      </View>
      <View style={{ backgroundColor: "white", marginTop: 10 }}>
        <View
          style={{
            height: 50,
            marginTop: 2,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <AntDesign
            name="contacts"
            size={27}
            style={{ marginHorizontal: 15 }}
          />
          <Text style={{ textAlign: "center" }}>Danh bạ máy</Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "gray",
            marginLeft: 20,
            marginEnd: 10,
            opacity: 0.2,
          }}
        />
        <View
          style={{
            height: 50,
            marginTop: 2,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Ionicons
            name="people-outline"
            size={27}
            style={{ marginHorizontal: 15 }}
          />
          <Text style={{ textAlign: "center" }}>Bạn bè có thể quen</Text>
        </View>
      </View>
      <Text style={{ textAlign: "center", fontSize: 12, marginTop: 10 }}>
        Xem lời mời kết bạn đã gửi tại trang Danh bạ Zalo
      </Text>
    </View>
  );
};

export default AddFriends;
