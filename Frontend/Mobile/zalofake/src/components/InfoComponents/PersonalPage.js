import React, { useState } from "react";
import { View, Text, Image, Pressable, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";

const PersonalPage = ({ navigation }) => {
  const [status, setStatus] = useState("");

  navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
        <Pressable style={{ paddingHorizontal: 8 }}>
          <Ionicons name="sync-circle-outline" size={24} color="white" />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("PersonalDetail");
          }}
          style={{ paddingHorizontal: 8 }}
        >
          <Ionicons name="ellipsis-horizontal-sharp" size={24} color="white" />
        </Pressable>
      </View>
    ),
    headerTitle: () => (
      <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
        Trang cá nhân
      </Text>
    ),

    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: "#0091FF",
      shadowColor: "#fff",
    },
  });

  return (
    <View style={{ backgroundColor: "#f1f2f6", flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../../assets/cover-image.png")}
          style={{ width: "100%", height: 160 }}
        />
        <Image
          source={require("../../../assets/avata-story-3.png")}
          style={{ width: 96, height: 96, marginTop: -48, borderRadius: 48 }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 24, marginBottom: 8 }}>
          Min Nguyên
        </Text>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <FontAwesomeIcons name="pen" size={18} color="#66a1f0" />
          <Text style={{ color: "#66a1f0", marginLeft: 8 }}>
            Cập nhật giới thiệu bản thân
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            borderRadius: 8,
          }}
        >
          <Ionicons name="image" size={26} color="#006af5" />
          <Text style={{ marginLeft: 10 }}>Ảnh của tôi</Text>
          <Text style={{ color: "gray", marginLeft: "auto" }}>2,3K</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            borderRadius: 8,
          }}
        >
          <FontAwesomeIcons name="shopping-bag" size={26} color="#12aee3" />
          <Text style={{ marginLeft: 10 }}>Kho khoảnh khắc</Text>
          <Text style={{ color: "gray", marginLeft: "auto" }}>11</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <TextInput
          value={status}
          onChangeText={setStatus}
          style={{
            backgroundColor: "white",
            flex: 1,
            marginRight: 8,
            padding: 8,
            borderRadius: 8,
          }}
          placeholder="Bạn đang nghĩ gì"
        />
        <Pressable
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        >
          <Ionicons name="image" size={26} color="#a4ce50" />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            backgroundColor: "#d4dce2",
            width: 36,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 18,
          }}
        >
          <Ionicons name="lock-closed" size={16} color="#899097" />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <Text style={{ color: "gray", fontWeight: "bold" }}>
            Bạn bè của bạn sẽ không xem được các bài đăng dưới đây.{" "}
            <Text style={{ color: "#12aee3", fontWeight: "bold" }}>
              Thay đổi cài đặt
            </Text>
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View
          style={{
            backgroundColor: "#ccc",
            width: "40%",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            marginBottom: 8,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>8 tháng 9, 2020</Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginBottom: 16,
            borderRadius: 8,
          }}
        >
          <View style={{ margin: 8 }}>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              Happy New Year
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: 8,
              marginBottom: 8,
            }}
          >
            <Image
              source={require("../../../assets/status-HPNY-1.png")}
              style={{ width: "31%", aspectRatio: 1, marginBottom: 8 }}
            />
            <Image
              source={require("../../../assets/status-HPNY-2.png")}
              style={{ width: "31%", aspectRatio: 1, marginBottom: 8 }}
            />
            <Image
              source={require("../../../assets/status-HPNY-3.png")}
              style={{ width: "31%", aspectRatio: 1, marginBottom: 8 }}
            />
          </View>
          <View style={{ flexDirection: "row", padding: 8 }}>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 24,
              }}
            >
              <Ionicons name="heart-circle-outline" size={26} color="black" />
              <Text style={{ marginLeft: 4, fontWeight: "bold" }}>2</Text>
            </Pressable>
            <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={26}
                color="black"
              />
              <Text style={{ marginLeft: 4, fontWeight: "bold" }}>2</Text>
            </Pressable>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Pressable>
                <Ionicons name="people" size={26} color="black" />
              </Pressable>
              <Pressable>
                <Image
                  source={require("../../../assets/ic_threeDots.png")}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />
              </Pressable>
            </View>
          </View>
        </View>
        {/* Code cho status thứ hai */}
      </View>
    </View>
  );
};

export default PersonalPage;
