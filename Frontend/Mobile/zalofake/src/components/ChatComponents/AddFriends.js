import { View, Text, Image, TextInput } from "react-native";
import React, { useEffect } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const AddFriends = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Thêm bạn",
      headerStyle: {
        backgroundColor: "white",
        shadowColor: "#fff",
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
    });
  }, [navigation]);
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
            width: "80%",
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
            backgroundColor: "#F2F2F2",
            borderRadius: 50,
            marginLeft: 10,
          }}
        >
          <Ionicons name="arrow-forward" size={22} style={{ margin: 10 }} />
        </View>
      </View>
      <View
        style={{
          marginTop: 2,
          alignItems: "center",
          backgroundColor: "white",
          flexDirection: "row",
          paddingVertical: 18,
        }}
      >
        <Ionicons
          name="qr-code"
          size={24}
          style={{ marginHorizontal: 15 }}
          color={"#447FAC"}
        />
        <Text style={{ textAlign: "center" }}>Quét mã QR</Text>
      </View>
      <View style={{ backgroundColor: "white", marginTop: 10 }}>
        <View
          style={{
            paddingVertical: 18,
            marginTop: 2,
            alignItems: "center",
            flexDirection: "row",
            borderBottomColor: "#E5E9EB",
            borderBottomWidth: 0.5,
          }}
        >
          <AntDesign
            name="contacts"
            size={24}
            style={{ marginHorizontal: 15 }}
            color={"#447FAC"}
          />
          <Text style={{ textAlign: "center" }}>Danh bạ máy</Text>
        </View>

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
            size={24}
            style={{ marginHorizontal: 15 }}
            color={"#447FAC"}
          />
          <Text style={{ textAlign: "center" }}>Bạn bè có thể quen</Text>
        </View>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontSize: 13,
          marginTop: 20,
          color: "gray",
        }}
      >
        Xem lời mời kết bạn đã gửi tại trang Danh bạ Zalo
      </Text>
    </View>
  );
};

export default AddFriends;
