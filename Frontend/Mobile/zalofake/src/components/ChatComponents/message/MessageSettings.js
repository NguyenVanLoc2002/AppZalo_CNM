import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Modal, ActivityIndicator
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Switch } from "react-native";
import Toast from "react-native-toast-message";
import axiosInstance from "../../../api/axiosInstance";
import { useAuthContext } from "../../../contexts/AuthContext";
import useGroup from "../../../hooks/useGroup";
import useConversation from "../../../hooks/useConversation";
import useMessage from "../../../hooks/useMessage";
import useSendMessage from "../../../hooks/useSendMessage";
import * as ImagePicker from "expo-image-picker";

const MessageSettings = ({ navigation, route }) => {
  const { conver } = route.params;
  const { sendMessage } = useSendMessage();
  const { showToastError, showToastSuccess } = useMessage();
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
  const [isLoadingUpdateName, setIsLoadingUpdateName] = useState(false);
  const [isLoadingUpdataAvatar, setIsLoadingUpdataAvatar] = useState(false);
  const [isLoadingAddMem, setIsLoadingAddMem] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [listFriendCanSearch, setListFriendCanSearch] = useState([]);
  
  const { updateGroup, addMember, removeMember, deleteGroup, loading } =
    useGroup();
  const { getConversationByID, conversation } = useConversation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
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
    fetchData();
  }, [navigation]);
  const fetchData = async () => {
    setName(conver.name);
    await getConversationByID(conver.conversation._id);
    if (conver?.createBy?._id === authUser._id) {
      setIsGroupAdmin(true);
    }
    fetchFriends();
  };
  // cập nhật tên nhóm
  const updateGroupInfo = async () => {
    setIsLoadingUpdateName(true);
    if (name.trim() === "") {
      setName(conver.name);
      setIsEditing(false);
      showToastError('Tên không được rỗng')
      return;
    }
    try {
      const response = await updateGroup(conver._id, { name });
      if (response) {
        let textMessage = authUser?.profile?.name + ' đã cập nhật tên nhóm thành ' + name;
        await sendMessage(conver._id,
          { type: 'text', data: textMessage }, null, true)
        setIsEditing(false);
        setIsLoadingUpdateName(false);
        showToastSuccess(
          "Cập nhật thông tin nhóm thành công"
        );
      }
      setIsLoadingUpdateName(false);
    } catch (error) {
      setIsLoadingUpdateName(false);
      console.error(error);
      showToastError(
        "Cập nhật thông tin nhóm thất bại"
      );
    }
  };

  // Thêm thành viên
  const addMemberToGroup = async () => {
    setIsLoadingAddMem(true);
    if (selectedFriends.length > 0) {
      let selectedFr = []
      let selectedFrName = "";
      selectedFriends.map((f) => {
        selectedFr.push(f.id);
        selectedFrName = selectedFrName + f.name + ' - ';
      }
      )
      const groupData = {
        groupId: conver._id,
        members: selectedFr
      };
      const rs = await addMember(
        conver._id,
        groupData
      );
      if (rs) {
        let textMessage = authUser?.profile?.name + ' đã thêm ' + selectedFrName + ' vào nhóm!!!';
        await sendMessage(conver._id,
          { type: 'text', data: textMessage }, null, true);

        getConversationByID(conver.conversation._id);
        setModalAddMember(false);
        setSelectedFriends([]);
        showToastSuccess("Thêm thành viên vào nhóm thành công");
      } else {
        showToastError("Thêm thành viên vào nhóm thất bại");
      }
      setIsLoadingAddMem(false);
      setModalAddMember(false);
    } else {
      setIsLoadingAddMem(false);
      showToastError("Bạn chưa chọn thành viên");
    }

  };
  // xóa thành viên
  const removeMemberInGroup = async (member) => {
    try {
      let selectedFrName = member.profile?.name;
      let selectedFr = [member._id]

      const groupData = {
        groupId: conver._id,
        members: selectedFr
      };
      const response = await removeMember(conver._id, groupData);
      if (response) {
        getConversationByID(conver.conversation._id);
        let textMessage = authUser?.profile?.name + ' đã xóa ' + selectedFrName + ' khỏi nhóm!!!';
        await sendMessage(conver._id,
          { type: 'text', data: textMessage }, null, true)
        showToastSuccess('Xóa thành viên khỏi nhóm thành công')
      }
    } catch (error) {
      console.error(error);
      if (error.response.data.error === "Group must have at least 2 members") {
        showToastError('Nhóm phải có ít nhất 2 thành viên')
      } else {
        showToastError('Xóa thành viên khỏi nhóm thất bại')
      }
    }
  };
  // load danh sách bạn, set danh sách bạn có thể add vào group
  const fetchFriends = async () => {
    try {
      const response = await axiosInstance.get("/users/get/friends");
      const newRadioButtons = [];
      let i = true;
      for (const friend of response.data.friends) {
        for (const friend1 of conver?.conversation?.participants) {
          if (friend.userId === friend1) {
            i = false;
          }
        }
        if (i === true) {
          const item = {
            id: friend.userId,
            name: friend?.profile?.name,
            avatar: friend?.profile?.avatar?.url,
            phone: friend.phone
          };
          newRadioButtons.push(item);
        } else {
          i = true;
        }
      }
      // console.log('radio', newRadioButtons)
      setListSearch(newRadioButtons);
      setListFriendCanSearch(newRadioButtons)
    } catch (error) {
      console.log(error);
    }
  };

  // Search bạn để add vào group
  const handleSearch = () => {
    // console.log("Giá trị của radioButton:", radioButton);

    if (!textSearch) {
      showToastError("Bạn chưa nhập");
    } else {
      const filteredFriends = listFriendCanSearch.filter((friend) => {
        // console.log(textSearch)
        // console.log(friend)
        return (
          friend.name
            .toLowerCase()
            .includes(textSearch.toLowerCase()) || friend.phone === textSearch
        );
      });
      // console.log(filteredFriends)
      if (filteredFriends.length === 0) {
        showToastError("Không tìm thấy");

      } else {
        const newRadioButtons = [];
        for (const friend of filteredFriends) {
          const item = {
            id: friend.userId,
            name: friend.name,
            avatar: friend.avatar,
            phone: friend.phone
          };
          newRadioButtons.push(item);
        }
        setListSearch(newRadioButtons);
        // console.log(
        //   "Giá trị của radioButton sau khi tìm kiếm:",
        //   newRadioButtons
        // );
      }
    }
  };
  //giải tán nhóm
  const handleDeleteGroup = async () => {
    try {
      const response = await deleteGroup(conver._id);
      if (response) {
        showToastSuccess(
          "Xóa nhóm thành công"
        );
        navigation.navigate("ChatComponent");
      }
    } catch (error) {
      console.error(error);
      showToastError(
        "Xóa nhóm thất bại"
      );
    }
  };
  // chọn bạn để add group
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
  const handleRemoveSearch = () => {
    setTextSearch(null);
    setListSearch(listFriendCanSearch);
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
      <Pressable
        onPress={() => {
          handleFriendSelection(item)
        }}
      >
        <View style={{ padding: 13, width: 24, height: 24, backgroundColor: '#F3F5F6', borderRadius: 50, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#37333A' }}>
          {isFriendSelected(item) ? (
            <Pressable style={{ width: 25, height: 25, backgroundColor: '#0091FF', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }} onPress={
              () => handleDeleteFriendSelected(item)
            }>
              <Ionicons color='white' size={27} name="checkmark-circle" />
            </Pressable>
          ) : (
            <View></View>
          )}
        </View>
      </Pressable>

    </Pressable>
  );

  const handleShowAddMember = () => {
    setModalAddMember(true);
  };

  const handleHideAddMember = () => {
    setModalAddMember(false);
  };

  // Cập nhật avatar
  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      console.log("Permission to access camera roll is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    } else {
      console.log("No image selected");
    }
  };

  const handleUpdateAvatar = async () => {
    try {
      setIsLoadingUpdataAvatar(true);
      const formData = new FormData();
      formData.append("avatar", {
        uri: selectedImage,
        type: "image/jpeg",
        name: "avatar.jpg",
      });   
      const response = await updateGroup(conver._id,  formData );
      if (response) {
        let textMessage = authUser?.profile?.name + ' đã cập nhật avatar mới';
        await sendMessage(conver._id,
          { type: 'text', data: textMessage }, null, true)
        setIsLoadingUpdataAvatar(false);
        setSelectedAvatar(selectedImage);
        showToastSuccess(
          "Cập nhật avtar nhóm thành công"
        );
      }
      setIsLoadingUpdataAvatar(false);

    } catch (error) {
      setIsLoadingUpdataAvatar(false);
      console.error(error);
      console.log("Error", error.message || "Failed to update avatar");
    } finally {
      setIsLoadingUpdataAvatar(false);
      closeModal();
    }
  };
  const openModal = () => {
    if (conver?.createBy?._id === authUser._id) {
      setSelectedImage(
        conver.avatar
      );
      setModalVisible(true);
    }

  };

  const closeModal = () => {
    setModalVisible(false);
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
        <Toast />
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            paddingTop: 10,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <Pressable onPress={openModal}>
              <Image
                source={{ uri: selectedAvatar || conver?.avatar }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: "#ccc",
                }}
              />
            </Pressable>
          </View>
          <View
            style={{
              // position: "relative",
              display: 'flex',
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
                borderBottomWidth: isEditing ? 1 : 0, borderColor: 'black',
                marginBottom: 5
              }}
              value={name}
              editable={isEditing}
              onChangeText={setName}
            />
            {isGroupAdmin && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: "row",
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  alignSelf: 'flex-end'
                }}
              >
                <Pressable style={{ width: 50, height: 35, borderWidth: 1, borderColor: 'blue', justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: '#9cf5ff', borderRadius: 10 }}
                  onPress={() => {
                    setIsEditing(true);
                  }}>
                  <FontAwesome5
                    name="pen"
                    size={20}
                    color="black"
                    style={{ marginRight: 8 }} />
                </Pressable>

                {isEditing ? (
                  <View>
                    <Pressable style={{ width: 50, height: 35, borderWidth: 1, borderColor: 'blue', justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: '#9cf5ff', borderRadius: 10 }}
                      onPress={() => {
                        setIsEditing(false);
                        setName(conver?.name);
                      }}>
                      <FontAwesome5
                        name="times"
                        size={20}
                        color="black"
                        style={{ marginRight: 8 }}
                      />
                    </Pressable>
                    <Pressable style={{ width: 50, height: 35, borderWidth: 1, borderColor: 'blue', justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: '#9cf5ff', borderRadius: 10 }}
                      onPress={updateGroupInfo}>
                      {isLoadingUpdateName ? (
                        <ActivityIndicator color="blue" size="large" />
                      ) : (
                        <FontAwesome5
                          name="check"
                          size={20}
                          color="black"
                          style={{ marginRight: 8 }}
                        />
                      )}

                    </Pressable>
                  </View>
                ) : (
                  <View></View>
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
              {conversation?.participants?.map((member, index) =>
              (<View key={index}>
                {member._id !== authUser._id && (
                  <Pressable

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
                      <Pressable onPress={() => { removeMemberInGroup(member) }}>
                        {loading ? (
                          <ActivityIndicator size="small" color="blue" />
                        ) : (
                          <MaterialCommunityIcons
                            name="minus"
                            size={24}
                            color="black"
                          />
                        )}
                      </Pressable>
                    )}
                  </Pressable>
                )
                }
              </View>
              ))}
            </ScrollView>
          )}
        </View>

        <View style={{ backgroundColor: "white", marginTop: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {"Thiết lập nhóm"}
            </Text>
          </View>
          <View>
            {isGroupAdmin && (
              <Pressable
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
                onPress={handleDeleteGroup}
              >
                {/* <GrUserAdmin size={20} color="gray" /> */}
                <Text style={{ color: "gray", marginLeft: 10 }}>
                  {"Quản trị viên"}
                </Text>
              </Pressable>
            )}

            <Pressable
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}
              onPress={isGroupAdmin ? handleDeleteGroup : null}
            >
              {/* <IoTrashOutline size={20} color="red" /> */}
              <Text style={{ color: "red", marginLeft: 10 }}>
                {isGroupAdmin ? "Giải tán nhóm" : "Rời nhóm"}
              </Text>
            </Pressable>
          </View>
        </View>
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
                Đã chọn: {selectedFriends.length}
              </Text>
            </View>

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
                  handleRemoveSearch();

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
                width: "95%",
                height: "7%",
                justifyContent: "space-evenly",
                flexDirection: "row",
                paddingHorizontal: 10,
                marginBottom: 10
              }}
            >
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
                <Text style={{ color: "white", fontSize: 18 , fontWeight:'bold'}}>Huỷ</Text>
              </Pressable>
              <Pressable
                style={{
                  width: "45%",
                  height: "90%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#2196F3",
                  borderRadius: 10,
                }}
                onPress={addMemberToGroup}
              >
                {isLoadingAddMem ? (
                  <ActivityIndicator color="blue" size="large" />
                ) : (
                  <Text style={{ color: "white", fontSize: 18, fontWeight:'bold'}}>Thêm</Text>
                )}

              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal cập nhật avatar group */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Image
              source={{
                uri:
                  selectedImage ||
                  conver.avatar
              }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
            <Pressable onPress={openImagePicker}>
              <Text
                style={{
                  color: "#0091FF",
                  textAlign: "center",
                  paddingVertical: 20,
                }}
              >
                Chọn ảnh
              </Text>
            </Pressable>
            <Pressable onPress={handleUpdateAvatar}>
              {isLoadingUpdataAvatar ? (
                <ActivityIndicator color="blue" size="large" />
              ) : (
                <Text
                  style={{
                    color: "#0091FF",
                    textAlign: "center",
                    paddingVertical: 20,
                  }}
                >
                  cập nhật
                </Text>
              )}

            </Pressable>

            <Pressable onPress={closeModal}>
              <Text style={{ color: "#0091FF", textAlign: "center" }}>
                Đóng
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MessageSettings;
