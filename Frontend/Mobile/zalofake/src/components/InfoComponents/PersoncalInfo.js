import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";
import { useAuthContext } from "../../contexts/AuthContext";
import { format } from "date-fns";

const PersonalInfo = ({ navigation }) => {
  const { authUser } = useAuthContext();
  const gender = authUser?.profile?.gender === "male" ? "Nam" : "Nữ";

  const dob = authUser?.profile?.dob;
  let dobFormat = format(new Date(dob), "dd/MM/yyyy");
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", paddingHorizontal: 5 }}>
          <Pressable style={{ paddingHorizontal: 8 }}>
            <Ionicons name="sync-circle-outline" size={24} color="white" />
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("PersonalDetail");
            }}
            style={{ paddingHorizontal: 8 }}
          >
            <Ionicons
              name="ellipsis-horizontal-sharp"
              size={24}
              color="white"
            />
          </Pressable>
        </View>
      ),
      headerTitle: () => (
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Thông tin cá nhân
        </Text>
      ),

      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#0091FF",
        shadowColor: "#fff",
      },
    });
  }, [navigation]);

  return (
    <ScrollView style={{ backgroundColor: "#EFEFEF", flex: 1 }}>
      <View style={{}}>
        <Image
          source={{
            uri:
              authUser?.profile?.background?.url ||
              "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
          }}
          style={{ width: "100%", height: 250 }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: -100,
            alignItems: "left",
            marginBot: 100,
            paddingBottom: 10,
            paddingLeft: 10,
          }}
        >
          <Image
            source={{
              uri:
                authUser?.profile?.avatar?.url ||
                "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
            }}
            style={{ width: 75, height: 75, borderRadius: 48 }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
              {authUser?.profile?.name}
            </Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: "#fff", paddingTop: 15, paddingLeft: 10 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "500", paddingBottom: 10 }}>
            Thông tin cá nhân
          </Text>
          <View>
            <View
              style={{
                height: 50,
                paddingTop: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#bbb",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ width: "30%", fontSize: 16, fontWeight: "400" }}>
                Giới tính
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "400" }}>{gender}</Text>
            </View>
            <View
              style={{
                height: 50,
                paddingTop: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#bbb",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ width: "30%", fontSize: 16, fontWeight: "400" }}>
                Ngày sinh
              </Text>

              <Text style={{ fontSize: 16, fontWeight: "400" }}>
                {dobFormat}
              </Text>
            </View>
            <View
              style={{
                height: 100,
                paddingTop: 15,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ width: "30%", fontSize: 16, fontWeight: "400" }}>
                Điện thoại
              </Text>
              <View
                style={{
                  width: "67%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "400" }}>
                  {authUser?.phone}
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "gray" }}
                >
                  Số điện thoại này chỉ hiển thị với người có lưu số bạn trong
                  danh bạ máy
                </Text>
              </View>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20,
                paddingTop: 10,
              }}
            >
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#bbb" : "#d9d9d9",
                    borderRadius: 30,
                    width: "80%",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                    flexDirection: "row",
                  },
                ]}
              >
                <FontAwesomeIcons name="edit" size={24} color="black" />
                <Text
                  style={{ fontSize: 16, fontWeight: "500", paddingLeft: 15 }}
                >
                  Chỉnh sửa
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonalInfo;
