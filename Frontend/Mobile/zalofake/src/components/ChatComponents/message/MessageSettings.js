import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Switch } from "react-native";
import Toast from "react-native-toast-message";

import { useAuthContext } from "../../../contexts/AuthContext";
import useGroup from "../../../hooks/useGroup";
import useConversation from "../../../hooks/useConversation";

const MessageSettings = ({ navigation, route }) => {
  const { conver } = route.params;
  const [isMarkAsCloseFriend, setMarkAsCloseFriend] = useState(false);
  const [isPinChat, setPinChat] = useState(false);
  const [isHideChat, setHideChat] = useState(false);
  const [isNotifyIncomingCalls, setNotifyIncomingCalls] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [modalAddMember, setModalAddMember] = useState(false);
  const [name, setName] = useState("");
  const [isGroupAdmin, setIsGroupAdmin] = useState(false);
  const { authUser } = useAuthContext();
  const [nameGroup, setNameGroup] = useState(null);
  const [textSearch, setTextSearch] = useState(null);
  const [radioButton, setRadioButton] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [listSearch, setListSearch] = useState([]);
  const { updateGroup, addMember, removeMember, deleteGroup, loading } =
    useGroup();
  const { getConversationByID, conversation } = useConversation();

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
    setName(conver.name);
    getConversationByID(conver.conversation._id);
    if (conver?.createBy?._id === authUser._id) {
      setIsGroupAdmin(true);
    }
  }, [navigation]);

  const handleRemoveMember = async (memberId) => {
    try {
      const response = await removeMember(conver._id, memberId);
      if (response) {
        getConversationByID(conver.conversation._id);
        Toast.show("Xóa thành viên khỏi nhóm thành công");
      }
    } catch (error) {
      console.error(error);
      if (error.response.data.error === "Group must have at least 2 members") {
        Toast.show("Nhóm phải có ít nhất 2 thành viên");
      } else {
        Toast.show("Xóa thành viên khỏi nhóm thất bại");
      }
    }
  };
  const handleAddMember = async () => {
    getConversationByID(conver.conversation._id);
  };

  const handleSearch = () => {
    console.log("Giá trị của radioButton:", radioButton);

    if (!textSearch) {
      showToastError("Bạn chưa nhập");
    } else {
      const filteredFriends = listFriends.filter((friend) => {
        return (
          friend.profile.name
            .toLowerCase()
            .includes(textSearch.toLowerCase()) || friend.phone === textSearch
        );
      });

      if (filteredFriends.length > 0) {
        const newRadioButtons = [];
        for (const friend of filteredFriends) {
          const item = {
            id: friend.userId,
            name: friend.profile.name,
            avatar: friend?.profile?.avatar?.url,
          };
          newRadioButtons.push(item);
        }
        setListSearch(newRadioButtons);
        console.log(
          "Giá trị của radioButton sau khi tìm kiếm:",
          newRadioButtons
        );
      } else {
        showToastError("Không tìm thấy");
      }
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const response = await deleteGroup(conver._id);
      if (response) {
        Toast.show("Xóa nhóm thành công");
        navigation.navigate("GroupDirectory");
      }
    } catch (error) {
      console.error(error);
      Toast.show("Xóa nhóm thất bại");
    }
  };

  const handleFriendSelection = (item) => {
    if (selectedFriends.includes(item)) {
      setSelectedFriends((prevState) =>
        prevState.filter((friend) => friend.id !== item.id)
      );
    } else {
      setSelectedFriends((prevState) => [...prevState, item]);
    }
    setIsHidden(true);
  };

  const isFriendSelected = (friend) => {
    return selectedFriends.includes(friend);
  };

  const handleDeleteFriendSelected = (item) => {
    setSelectedFriends(
      selectedFriends.filter((friend) => friend.id !== item.id)
    );
  };

  useEffect(() => {
    if (selectedFriends.length === 0) {
      setIsHidden(false);
    }
  }, [selectedFriends]);

  const renderListItem = (item, index) => (

    <Pressable
      key={index}
      style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
    >
      <View style={{ height: 45, width: 45, borderRadius: 50 }}></View>
      <View
        style={{ width: "75%", flexDirection: "row", alignItems: "center" }}
      >
        <View style={{ padding: 10 }}>
          <Image
            source={{
              uri: item.avatar
                ? item.avatar
                : "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
            }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        </View>
        <Text style={{ fontWeight: "500", marginLeft: 0 }}>{item.name}</Text>
      </View>
      {/* <Pressable
        style={{
          height: 150,
          backgroundColor: "purple",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          backgroundColor: "white",
        }}
        // onPress={() => navigation.navigate("FriendProfile", { user })}
      >
        <Image
          source={{ uri: user?.profile?.avatar?.url }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.profile.name}</Text>
      </Pressable> */}
    </Pressable>
  );

  const handleShowAddMember = () => {
    setModalAddMember(true);
  };

  const handleHideAddMember = () => {
    setModalAddMember(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          backgroundColor: "#ccc",
          width: "100%",
          borderColor: "black",
          borderLeftWidth: 1,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Image
              source={{ uri: conver?.avatar }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "#ccc",
              }}
            />
          </View>
          <View
            style={{
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <TextInput
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "black",
              }}
              value={name}
              editable={isEditing}
              onChangeText={setName}
            />
            {isGroupAdmin && (
              <View
                style={{
                  position: "absolute",
                  top: -1,
                  right: 40,
                  flexDirection: "row",
                }}
              >
                {isEditing ? (
                  <View style={{ flexDirection: "row" }}>
                    <Pressable onPress={updateGroupInfo}>
                      <CiCircleCheck
                        size={25}
                        color="green"
                        style={{ marginHorizontal: 5 }}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setIsEditing(false);
                        setName(conver?.name);
                      }}
                    >
                      <MdOutlineCancel
                        size={25}
                        color="red"
                        style={{ marginLeft: 10 }}
                      />
                    </Pressable>
                  </View>
                ) : (
                  <Pressable
                    onPress={() => {
                      setIsEditing(!isEditing);
                    }}
                  >
                    {/* <LuPencilLine size={22} color="green" /> */}
                  </Pressable>
                )}
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
              borderWidth: 1,
              borderColor: "orange",
              borderRadius: 20,
              marginTop: 20,
              marginHorizontal: 10,
              padding: 10,
              justifyContent: "center",
            }}
          >
            <Text>{"Quản Trị Viên :"}</Text>
            <Text style={{ marginLeft: 10, fontWeight: "bold" }}>
              {conver?.createBy?.profile?.name}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
              position: "relative",
              width: "100%",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {"Danh sách thành viên"}
            </Text>
            <Pressable
              style={{ position: "absolute", top: 10, right: 20 }}
              onPress={handleShowAddMember}
            >
              {/* <IoPersonAddOutline size={20} color="green" /> */}
              <MaterialCommunityIcons
                name="account-plus"
                size={24}
                color="black"
              />
            </Pressable>
          </View>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <ActivityIndicator size="large" color="blue" />
            </View>
          ) : (
            <ScrollView
              style={{
                flex: 1,
                marginTop: 5,
                marginHorizontal: 10,
                width: "100%",
                paddingHorizontal: 10,
              }}
            >
              {conversation?.participants?.map((member, index) => (
                
                <Pressable
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                    backgroundColor: "#eee",
                    borderRadius: 10,
                    marginBottom: 5,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: member.profile?.avatar?.url }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                    />
                    <Text style={{ marginLeft: 10 }}>
                      {member.profile?.name}
                    </Text>
                  </View>
                  {isGroupAdmin && (
                    <Pressable>
                      {loading ? (
                        <ActivityIndicator size="small" color="blue" />
                      ) : (
                        <MaterialCommunityIcons
                          name="minus"
                          size={24}
                          color="black"
                          onPress={() => handleRemoveMember(member._id)}
                        />
                        // <Text>haha</Text>
                      )}
                    </Pressable>
                  )}
                </Pressable>
              ))}
            </ScrollView>
          )}
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
        {/* <Text style={{ textAlign: "center", color: "black" }}>
          {`Tạo nhóm với ${user.ten}`}
        </Text> */}
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
        {/* <Text style={{ textAlign: "center", color: "black" }}>
          {`Thêm ${user.ten} vào nhóm`}
        </Text> */}
      </View>
      <Modal animationType="slide" transparent={true} visible={modalAddMember}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "90%",
              backgroundColor: "white",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Toast />
            <View style={{ width: "100%", height: 50, alignItems: "flex-end" }}>
              <Pressable
                style={{
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleHideAddMember}
              >
                <Ionicons name="close" size={30} color="black" />
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                height: "7%",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                paddingHorizontal: 20,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 20 }}>
                Thêm thành viên
              </Text>
              <Text style={{ color: "#979797", fontWeight: "600" }}>
                Đã chọn: 0
              </Text>
            </View>
            {/* <View
              style={{ height: "7%", width: "80%", justifyContent: "center" }}
            >
              <TextInput
                value={nameGroup}
                onChangeText={setNameGroup}
                placeholder="Đặt tên nhóm"
                placeholderTextColor="gray"
                style={{ fontSize: 18, height: "80%", width: "100%" }}
              ></TextInput>
            </View> */}
            <View
              style={{
                flexDirection: "row",
                width: "85%",
                height: "7%",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                paddingHorizontal: 5,
              }}
            >
              <Pressable onPress={handleSearch}>
                <Ionicons name="search-outline" size={30} color="black" />
              </Pressable>
              <TextInput
                value={textSearch}
                onChangeText={setTextSearch}
                placeholder="Tìm tên hoặc số điện thoại"
                placeholderTextColor="gray"
                style={{
                  fontSize: 18,
                  height: "80%",
                  width: "80%",
                  paddingHorizontal: 10,
                }}
              ></TextInput>
              <Pressable
                onPress={() => {
                  setTextSearch(null);
                }}
              >
                <Ionicons name="close" size={30} color="black" />
              </Pressable>
            </View>
            <ScrollView style={{ height: "65%", width: "100%" }}>
              {listSearch.map((item, index) => renderListItem(item, index))}
            </ScrollView>
            <View
              style={{
                width: "100%",
                height: "7%",
                justifyContent: "center",
                flexDirection: "row",
                paddingHorizontal: 10,
              }}
            >
              <Pressable
                style={{
                  width: "45%",
                  height: "90%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#2196F3",
                  borderRadius: 10,
                }}
                onPress={() => {
                  if (selectedFriends.length > 0) {
                    addMember(
                      conver._id,
                      selectedFriends.map((f) => f.id)
                    );
                    setModalAddMember(false);
                  } else {
                    showToastError("Bạn chưa chọn thành viên");
                  }
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Thêm</Text>
              </Pressable>
              <Pressable
                style={{
                  width: "45%",
                  height: "90%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#FF1744",
                  borderRadius: 10,
                }}
                onPress={handleHideAddMember}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Huỷ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MessageSettings;
