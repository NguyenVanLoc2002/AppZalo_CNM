import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../api/axiosInstance";
import moment from 'moment-timezone';
import Toast from "react-native-toast-message";
import useCreateGroup from "../../hooks/useCreateGroup";
import { useAuthContext } from "../../contexts/AuthContext";

const GroupDirectory = ({ navigation }) => {
  const [listFriends, setListFriends] = useState([])
  const [lengthGroup, setLengthGroup] = useState(0)
  const [modalCreateGr, setModalCreateGr] = useState(false)
  const [nameGroup, setNameGroup] = useState(null)
  const [textSearch, setTextSearch] = useState(null)
  const [radioButton, setRadioButton] = useState([]);
  const [listSearch, setListSearch] = useState([])
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [groupAll, setGroupAll] = useState([])
  const { getAllGroup, getConversationById, createGroup, getUserById } = useCreateGroup()
  const { authUser } = useAuthContext();

  const fetchGroup = async () => {
    try {
      const allGr = await getAllGroup();
      let dem = 0
      let sender
      const newGroup = await Promise.all(allGr.map(async (group) => {
        dem++;
        let lastMessage;
        if (group?.lastMessage?.contents[0].type === 'text') {
          lastMessage = group?.lastMessage?.contents[0].data
        } else if (group?.lastMessage?.contents[0].type === 'image') {
          lastMessage = " [Hình ảnh]"
        } else {
          lastMessage = " [Video]"
        }
        const getUser = await getUserById(group?.lastMessage?.senderId)
        if (authUser.profile.name === getUser.user.profile.name) {
          sender = "Bạn"
        } else {
          sender = getUser.user.profile.name
        }

        return {
          _id: group._id,
          group : group,
          name: group.groupName,
          avatar: group.avatar.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
          conversation: group.conversation,
          createBy: group.createBy,
          lastMessage: lastMessage,
          sender: sender,
          timeSend: handleGetTime(group.lastMessage.timestamp),
          tag: group.conversation.tag,
          admins: group?.admins 
        }
      }))
     
      newGroup.sort((a, b) => {
        const timeA = a.group.lastMessage.timestamp || ""
        const timeB = b.group.lastMessage.timestamp || ""
        return timeB.localeCompare(timeA);
      });
      setGroupAll(newGroup)
      setLengthGroup(dem)
    } catch (error) {
      console.log("FetchGroupError: ", error);
    }
  }

  const handleGetTime = (time) => {
    const currentTime = moment().tz('Asia/Ho_Chi_Minh'); // Lấy thời gian hiện tại ở múi giờ Việt Nam
    const vietnamDatetime = moment(time).tz('Asia/Ho_Chi_Minh'); // Chuyển đổi thời gian đã cho sang múi giờ Việt Nam
    const timeDifference = moment.duration(currentTime.diff(vietnamDatetime)); // Tính khoảng cách thời gian

    const days = Math.floor(timeDifference.asDays()); // Số ngày
    const hours = Math.abs(timeDifference.hours()); // Số giờ (dương)
    const minutes = Math.abs(timeDifference.minutes()); // Số phút (dương)

    if (days >= 1) {
      return `${days} ngày`;
    }
    else if (hours >= 1) {
      return `${hours} giờ`;
    }
    else {
      return `${minutes} phút`;
    }
  };
  const fetchFriend = async () => {
    try {
      const response = await axiosInstance.get("/users/get/friends");
      if (response.status === 200) {
        setListFriends(response.data.friends)
        const newRadioButtons = response.data.friends.map(friend => ({
          _id: friend.userId,
          name: friend.profile.name,
          avatar: friend?.profile?.avatar?.url
        }))
        setRadioButton(newRadioButtons)
      } else if (response.status === 404) {
        console.log("getFriendError:");
      }
    } catch (error) {
      console.log("getFriendError:", error);
    }
  }

  useEffect(() => {
    fetchFriend()
    fetchGroup()
  }, [])
  const showToast = (notice, type) => {
    Toast.show({
      text1: notice,
      type: type,
      topOffset: 0,
      position: "top",

    });
  };
  const handleSearch = () => {
    console.log("press");
    if (!textSearch) {
      showToast("Bạn chưa nhập", "error")
    }
    else {
      const filteredFriends = listFriends.filter((friend) => {
        return friend.profile.name.toLowerCase().includes(textSearch.toLowerCase()) || friend.phone === textSearch;
      });

      if (filteredFriends.length > 0) {
        const newRadioButtons = filteredFriends.map(friend => ({
          _id: friend.userId,
          name: friend.profile.name,
          avatar: friend?.profile?.avatar?.url
        }))
        setListSearch(newRadioButtons)
      } else {
        showToast("Không tìm thấy", "error")
      }
    }
  }

  const handleFriendSelection = (item) => {
    if (selectedFriends.includes(item)) {
      setSelectedFriends(prevState => prevState.filter(friend => friend._id !== item._id));
    } else {
      setSelectedFriends(prevState => [...prevState, item]);
    }
    setIsHidden(true)
  };
  const isFriendSelected = (friend) => {
    return selectedFriends.includes(friend);
  };
  const handleDeleteFriendSelected = (item) => {
    setSelectedFriends(selectedFriends.filter(friend => friend._id !== item._id));
  }
  useEffect(() => {
    if (selectedFriends.length === 0) {
      setIsHidden(false);
    }
  }, [selectedFriends]);

  const renderListItem = (item, index) => (
    <Pressable key={index} style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
      <View style={{ height: 45, width: 45, borderRadius: 50 }}></View>
      <View style={{ width: "75%", flexDirection: 'row', alignItems: 'center' }}>

        <View style={{ padding: 10 }}>
          <Image
            source={{ uri: item.avatar ? item.avatar : "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png" }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          /></View>
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
  )

  const handleCreate = async () => {
    setIsLoading(true)
    if (!nameGroup) {
      showToast("Vui lòng đặt tên nhóm", "error")
      setIsLoading(false)
      return;
    }
    else {
      let idUser = [];
      for (const id of selectedFriends) {
        idUser.push(id._id)
      }
      if (idUser.length < 2) {
        showToast("Group phải từ 2 người trở lên", "error")
        setIsLoading(false)
      } else {
        try {
          const response = await createGroup(nameGroup, idUser)
          if (response) {
            setIsLoading(false)
            setNameGroup(null)
            setTextSearch(null)
            setIsHidden(false)
            setSelectedFriends([])
            setModalCreateGr(false)
            fetchGroup()

            const group = {
              _id: response.group._id,
              name: response.group.groupName,
              createAt: handleGetTime(response.group.createAt),
              createBy: response.group.createBy,
              avatar: response.group?.avatar?.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
              conversation: response.group.conversation,
              tag: response.group.conversation.tag
            }
            navigation.navigate("Message", { conver: group })
          }
        } catch (error) {
          console.log("CreateGroupError:", error);
          setIsLoading(false)
        }
      }
    }
  }


  return (
    <View style={styles.container}>
      {/* <Toast/> */}
      <ScrollView>
        <View style={styles.section}>
          <Pressable style={styles.item} onPress={() => setModalCreateGr(true)}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require("../../../assets/createGroup.png")}
            />
            <Text style={styles.itemText}>Tạo nhóm mới</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <View style={styles.groupHeader}>
            <Text style={styles.groupHeaderText}>Nhóm đang tham gia ({lengthGroup})</Text>
            <Pressable style={styles.sortButton}>
              <Ionicons
                name={"ios-swap-vertical-outline"}
                size={25}
                color={"#979797"}
              />
              <Text style={styles.sortButtonText}>Sắp xếp</Text>
            </Pressable>
          </View>
          {groupAll?.map((group, index) => (
            <Pressable key={index} style={styles.groupItem} onPress={() => navigation.navigate("Message", { conver: group })}>
              <Image
                style={styles.avatar}
                source={{ uri: group.avatar }}
              />
              <View style={styles.groupTextContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons name="people" size={20} color="gray" />
                  <Text style={styles.groupTitle}>{group.name}</Text>
                </View>
                <Text style={styles.groupDescription}>
                  {group.sender ? `${group.sender}: ${group.lastMessage}` : "Chưa có tin nhắn nào"}
                </Text>
              </View>
              <Text style={styles.timeText}>{group.timeSend === "0 phút" ? "vừa xong" : `${group.timeSend} `}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCreateGr}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Toast />
            <View style={{ width: '100%', height: 50, alignItems: 'flex-end' }}>
              <Pressable style={styles.pressClose} onPress={() => { setModalCreateGr(false) }}>
                <Ionicons name="close" size={30} color="black" />
              </Pressable>
            </View>
            <View style={styles.viewClose}>
              <Text style={{ fontWeight: '600', fontSize: 20 }}>Nhóm mới</Text>
              <Text style={{ color: '#979797', fontWeight: '600' }}>Đã chọn: {selectedFriends.length}</Text>
            </View>
            <View style={{ height: '7%', width: '80%', justifyContent: 'center' }}>
              <TextInput
                value={nameGroup}
                onChangeText={setNameGroup}
                placeholder="Đặt tên nhóm"
                placeholderTextColor='gray'
                style={{ fontSize: 18, height: '80%', width: '100%' }}
              >
              </TextInput>
            </View>
            <View style={styles.viewSearch}>
              <Pressable onPress={handleSearch}>
                <Ionicons name="search-outline" size={30} color="black" />
              </Pressable>
              <TextInput
                value={textSearch}
                onChangeText={setTextSearch}
                placeholder="Tìm tên hoặc số điện thoại"
                placeholderTextColor='gray'
                style={{ fontSize: 18, height: '80%', width: '80%', paddingHorizontal: 10 }}></TextInput>
              <Pressable onPress={() => { setTextSearch(null) }}>
                <Ionicons name="close-circle" size={30} color="gray" />
              </Pressable>
            </View>
            <View style={styles.viewScroll}>
              <ScrollView>
                {textSearch === null || textSearch.trim() === '' ? (
                  radioButton.map(renderListItem)
                ) : (
                  listSearch.map(renderListItem)
                )}
              </ScrollView>
              {isHidden ? (
                <View style={{ width: '95%', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 50 }}>
                  <Pressable
                    style={
                      { width: 70, height: 70, borderRadius: 35, justifyContent: "center", alignItems: "center", backgroundColor: "#0091FF" }}
                    onPress={handleCreate}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Image
                        style={{ width: 50, height: 50, }}
                        source={require("../../../assets/arrow.png")}
                      />
                    )}
                  </Pressable>
                </View>
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>


  );
};

const styles = StyleSheet.create({
  viewScroll: {
    paddingTop: 15,
    width: '100%',
    height: '75%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  viewSearch: {
    flexDirection: 'row',
    width: '85%',
    height: '7%',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 5
  },
  pressClose: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewClose: {
    width: '100%',
    height: '7%',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,

  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
    // alignItems: "center",
  },
  sectionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  featureContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  featureItem: {
    alignItems: "center",
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  featureText: {
    marginTop: 5,
    fontSize: 14,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  groupHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#979797",
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  groupTextContainer: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "bold",
    height: 30,
    paddingLeft: 10,
  },
  groupDescription: {
    fontSize: 14,
    color: "#979797",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#979797",
  },
});

export default GroupDirectory;
