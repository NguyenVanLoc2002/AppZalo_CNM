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
import axiosInstance from "../../../api/axiosInstance";
import { useAuthContext } from "../../../contexts/AuthContext";
import useGroup from "../../../hooks/useGroup";
import useConversation from "../../../hooks/useConversation";
import useMessage from "../../../hooks/useMessage";
import useSendMessage from "../../../hooks/useSendMessage";
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
  const language = "vi";
  const [nameGroup, setNameGroup] = useState(null);
  const [textSearch, setTextSearch] = useState(null);
  const [radioButton, setRadioButton] = useState([]);
  const [isHidden, setIsHidden] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [listSearch, setListSearch] = useState([]);
  // const [friends, setFriends] = useState([]);
  const [listFriendCanSearch, setListFriendCanSearch] = useState([]);
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
    fetchData();
  }, [navigation]);
  const fetchData = async () => {
    setName(conver.name);
    await getConversationByID(conver.conversation._id);
    if (conver?.createBy?._id === authUser._id) {
      setIsGroupAdmin(true);
    }
    // console.log(conversation)
    fetchFriends();
    // getConversationByID(conver.conversation._id);
  };


  const addMemberToGroup = async () => {

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
          { type: 'text', data: textMessage }, null, true)
        getConversationByID(conver.conversation._id);
        setModalAddMember(false);
        setSelectedFriends([]);
        showToastSuccess("Thêm thành viên vào nhóm thành công");
      } else {
        showToastError("Thêm thành viên vào nhóm thất bại");
      }
      setModalAddMember(false);
    } else {
      showToastError("Bạn chưa chọn thành viên");
    }

  };


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


  const fetchFriends = async () => {
    try {
      const response = await axiosInstance.get("/users/get/friends");
     
      const newRadioButtons = [];
      let i = true;
      for (const friend of response.data.friends) {
        for (const friend1 of conver?.conversation?.participants) {
          // console.log(friend);
          // console.log(friend1)
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
          i = false;
        }
      }
  
      setListSearch(newRadioButtons);
      setListFriendCanSearch(newRadioButtons)
    } catch (error) {
      console.log(error);
    }
  };


  const handleSearch = () => {
    console.log("Giá trị của radioButton:", radioButton);

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
        console.log(
          "Giá trị của radioButton sau khi tìm kiếm:",
          newRadioButtons
        );
      }
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const response = await deleteGroup(conver._id);
      if (response) {
        Toast.show(
          language === "vi"
            ? "Xóa nhóm thành công"
            : "Delete group successfully"
        );
        navigation.navigate("GroupDirectory");
      }
    } catch (error) {
      console.error(error);
      Toast.show(
        language === "vi" ? "Xóa nhóm thất bại" : "Delete group failed"
      );
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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Toast />
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
                    <Pressable>
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
            <Text>{language === "vi" ? "Quản Trị Viên :" : "Admin :"}</Text>
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
              {language === "vi" ? "Danh sách thành viên" : "Member list"}
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
                onPress={addMemberToGroup}
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
