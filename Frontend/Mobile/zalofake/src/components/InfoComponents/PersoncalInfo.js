import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";
import { useAuthContext } from "../../contexts/AuthContext";
import RadioButton from "react-native-radio-buttons-group";
import useUpdate from "../../hooks/useUpdate";

const PersonalInfo = ({ navigation }) => {
  const { authUser } = useAuthContext();
  const [usDob, setUsDob] = useState(new Date(authUser?.profile.dob));
  const [usGender, setUsGender] = useState(authUser?.profile.gender);
  const [usName, setUsName] = useState(authUser?.profile?.name);
  const [usEmail, setUsEmail] = useState(authUser?.email);
  const { updateProfile, loading } = useUpdate();

  const handleNameChange = (text) => {
    setUsName(text);
  };

  const handleEmailChange = (text) => {
    setUsEmail(text);
  };

  const handleUpdateProfile = async () => {
    try {
      const selectedDay = usDob.getDate() + 1;
      const selectedMonth = usDob.getMonth();
      const selectedYear = usDob.getFullYear();

      const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

      await updateProfile(usName, usEmail, usGender, selectedDate);

      setModalVisible(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

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

  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const radioButtons = useMemo(
    () => [
      {
        id: "male",
        label: "Nam",
        value: "male",
        color: "blue",
        size: 24,
      },
      {
        id: "female",
        label: "Nữ",
        value: "female",
        color: "blue",
        size: 24,
      },
      {
        id: "other",
        label: "Khác",
        value: "other",
        color: "blue",
        size: 24,
      },
    ],
    []
  );

  return (
    <View style={{ backgroundColor: "#EFEFEF", flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            source={{
              uri: authUser?.profile?.background?.url,
            }}
            style={{ width: "100%", height: 250 }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: -100,
              alignItems: "left",
              paddingBottom: 10,
              paddingLeft: 10,
            }}
          >
            <Pressable onPress={() => setModalVisible(true)}>
              <Image
                source={{
                  uri: authUser?.profile?.avatar?.url,
                }}
                style={{ width: 75, height: 75, borderRadius: 48 }}
              />
            </Pressable>
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
            <Text
              style={{ fontSize: 18, fontWeight: "500", paddingBottom: 10 }}
            >
              Thông tin cá nhân
            </Text>
            <View>
              <Text style={{ width: "30%", fontSize: 16, fontWeight: "400" }}>
                Tên hiển thị:
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  height: 60,
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBlockColor: "#e0e3e5",
                }}
              >
                <TextInput
                  style={{ fontSize: 18 }}
                  defaultValue={usName}
                  onChangeText={handleNameChange}
                />
              </View>
              <Text style={{ width: "30%", fontSize: 16, fontWeight: "400" }}>
                Email hiển thị:
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  height: 60,
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBlockColor: "#e0e3e5",
                }}
              >
                <TextInput
                  style={{ fontSize: 18 }}
                  defaultValue={usEmail}
                  onChangeText={handleEmailChange}
                />
              </View>

              <Text style={{ width: "30%", fontSize: 16, fontWeight: "400" }}>
                Giới tính
              </Text>
              <View
                style={{
                  height: 50,
                  borderBottomWidth: 1,
                  borderBottomColor: "#bbb",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    marginBottom: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <RadioButton
                    radioButtons={radioButtons}
                    onPress={(value) => setUsGender(value)}
                    selectedId={usGender}
                    layout="row"
                    labelStyle={{ fontSize: 18 }}
                  />
                </View>
              </View>

              <Text style={{ width: "30%", fontSize: 16, fontWeight: "400" }}>
                Ngày sinh
              </Text>
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBlockColor: "#e0e3e5",
                  }}
                >
                  <Picker
                    selectedValue={usDob.getFullYear()}
                    onValueChange={(itemValue, itemIndex) => {
                      const isLeapYear =
                        (itemValue % 4 === 0 && itemValue % 100 !== 0) ||
                        itemValue % 400 === 0;
                      const daysInMonth = [
                        31,
                        isLeapYear ? 29 : 28,
                        31,
                        30,
                        31,
                        30,
                        31,
                        31,
                        30,
                        31,
                        30,
                        31,
                      ];

                      const newDay =
                        usDob.getDate() > daysInMonth[usDob.getMonth()]
                          ? daysInMonth[usDob.getMonth()]
                          : usDob.getDate();

                      const newDate = new Date(
                        itemValue,
                        usDob.getMonth(),
                        newDay
                      );
                      setUsDob(newDate);
                    }}
                    style={{ height: 50, width: "40%" }}
                  >
                    {[...Array(121)].map((_, i) => (
                      <Picker.Item
                        key={i + 1920}
                        label={(i + 1920).toString()}
                        value={i + 1920}
                      />
                    ))}
                  </Picker>

                  <Picker
                    selectedValue={usDob.getMonth()}
                    onValueChange={(itemValue, itemIndex) => {
                      const isLeapYear =
                        (usDob.getFullYear() % 4 === 0 &&
                          usDob.getFullYear() % 100 !== 0) ||
                        usDob.getFullYear() % 400 === 0;
                      const daysInMonth = [
                        31,
                        isLeapYear ? 29 : 28,
                        31,
                        30,
                        31,
                        30,
                        31,
                        31,
                        30,
                        31,
                        30,
                        31,
                      ];

                      const newDay =
                        usDob.getDate() > daysInMonth[itemValue]
                          ? daysInMonth[itemValue]
                          : usDob.getDate();

                      const newDate = new Date(
                        usDob.getFullYear(),
                        itemValue,
                        newDay
                      );
                      setUsDob(newDate);
                    }}
                    style={{ height: 50, width: "30%" }}
                  >
                    {[...Array(12)].map((_, i) => (
                      <Picker.Item
                        key={i}
                        label={(i + 1).toString()}
                        value={i}
                      />
                    ))}
                  </Picker>

                  <Picker
                    selectedValue={usDob.getDate()}
                    onValueChange={(itemValue, itemIndex) => {
                      const newDate = new Date(
                        usDob.getFullYear(),
                        usDob.getMonth(),
                        itemValue
                      );
                      setUsDob(newDate);
                    }}
                    style={{ height: 50, width: "30%" }}
                  >
                    {[...Array(31)].map((_, i) => (
                      <Picker.Item
                        key={i + 1}
                        label={(i + 1).toString()}
                        value={i + 1}
                      />
                    ))}
                  </Picker>
                </View>
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
                  onPress={handleUpdateProfile}
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                width: "100%",
                height: 300,
              }}
            >
              <Pressable
                style={{
                  width: "100%",
                  alignItems: "center",
                  height: 30,
                  justifyContent: "flex-start",
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <View
                  style={{
                    width: "20%",
                    height: 6,
                    backgroundColor: "#e0e3e5",
                    borderRadius: 20,
                  }}
                ></View>
              </Pressable>
              <Text
                style={{
                  color: "#6c8dc1",
                  fontWeight: "bold",
                  margin: 10,
                  fontSize: 16,
                }}
              >
                Ảnh đại diện
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcons name="user-circle" size={30} color="gray" />
                <Text
                  style={{
                    margin: 15,
                    fontSize: 16,
                    justifyContent: "center",
                    fontWeight: "400",
                  }}
                >
                  Xem ảnh đại diện
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  alignItems: "center",
                }}
              >
                <Ionicons name="camera-outline" size={30} color="gray" />
                <Text
                  style={{
                    margin: 15,
                    fontSize: 16,
                    justifyContent: "center",
                    fontWeight: "400",
                  }}
                >
                  Chụp ảnh mới
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  margin: 10,
                  alignItems: "center",
                }}
              >
                <Ionicons name="image-outline" size={30} color="gray" />
                <Text
                  style={{
                    margin: 15,
                    fontSize: 16,
                    justifyContent: "center",
                    fontWeight: "400",
                  }}
                >
                  Chọn ảnh trên máy
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default PersonalInfo;
