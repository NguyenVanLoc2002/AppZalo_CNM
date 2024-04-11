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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../api/axiosInstance";
import moment from 'moment-timezone';
import RadioButton from "react-native-radio-buttons-group";
import Toast from "react-native-toast-message";

const GroupDirectory = ({ navigation }) => {
  const [listConversations, setListConversation] = useState([]);
  const [listFriends, setListFriends] = useState([])
  const [lengthGroup, setLengthGroup] = useState(0)
  const [group, setGroup] = useState()
  const [modalCreateGr, setModalCreateGr] = useState(false)
  const [nameGroup, setNameGroup] = useState(null)
  const [textSearch, setTextSearch] = useState(null)
  const [radioButton, setRadioButton] = useState([]);
  const [listSearch, setListSearch] = useState([])

  const fetchConversations = async () => {
    try {
      const response = await axiosInstance.get("/conversations/getConversations");
      if (response.status === 200) {
        const newGroups = [];
        let dem = 0
        for (const data of response.data) {
          if (data.participants.length > 2) {
            dem++;
            setListConversation(listConversations.concat(data))
            const nameFriend = [];
            let memberCount = 0;
            let nameUserSendLast = null;
            let lastMessage = null;

            for (const participant of data.participants) {
              if (participant._id === data?.lastMessage?.senderId) {
                nameUserSendLast = participant.profile.name
                if (data?.lastMessage?.contents[0].type === 'text') {
                  lastMessage = data?.lastMessage?.contents[0]?.data
                } else if (data?.lastMessage?.contents[0].type === 'image') {
                  lastMessage = "đã gửi ảnh"
                } else {
                  lastMessage = "đã gửi video"
                }
              }

              if (memberCount < 4) {
                nameFriend.push(participant.profile.name)
                memberCount++;
              } else {
                break;
              }
            }
            const group = {
              idGroup: data._id,
              userSendLast: nameUserSendLast,
              lastMessage: lastMessage,
              participants: nameFriend.join(", "),
              time: handleGetTime(data?.lastMessage?.timestamp),
              createAt: handleGetTime(data?.createdAt)
            }
            newGroups.push(group);
          }
        }
        setGroup(newGroups);
        setLengthGroup(dem)
      }
      else if (response.status === 500) {
        console.log("FetchConversationError");
      }
    } catch (error) {
      console.log("FetchConversationError:", error);
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
        const newRadioButtons = [];
        for (const friend of response.data.friends) {
          const item = {
            id: friend.userId,
            name: friend.profile.name,
            avatar: friend?.profile?.avatar?.url
          }
          newRadioButtons.push(item);

        }
        setRadioButton(newRadioButtons);
      } else if (response.status === 404) {
        console.log("getFriendError:");
      }
    } catch (error) {
      console.log("getFriendError:", error);
    }
  }

  useEffect(() => {
    fetchConversations()
    fetchFriend()
  }, [])

  const showToastError = (notice) => {
    Toast.show({
      text1: notice,
      type: "error",
      topOffset: 0,
      position: "top",

    });
  };
  const handleSearch = () => {
    console.log("press");
    if (!textSearch) {
      showToastError("Bạn chưa nhập")
    }
    else {
      const filteredFriends = listFriends.filter((friend) => {
        return friend.profile.name.toLowerCase().includes(textSearch.toLowerCase()) || friend.phone === textSearch;
      });

      if (filteredFriends.length > 0) {
        const newRadioButtons = [];
        for (const friend of filteredFriends) {
          const item = {
            id: friend.userId,
            name: friend.profile.name,
            avatar: friend?.profile?.avatar?.url
          }
          newRadioButtons.push(item);
        }
        setListSearch(newRadioButtons);
      } else {
        showToastError("Không tìm thấy")
      }
    }
  }

  const renderListItem = (item, index) => (
    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <RadioButton
        radioButtons={[{ id: item.id }]}
        // onPress={(value) => setUsGender(value)}
        // selectedId={usGender}
        labelStyle={{ fontSize: 20 }}
        containerStyle={{ alignItems: 'flex-start' }}
      />
      <View style={{ padding: 10 }}>
        <Image
          source={{ uri: item.avatar ? item.avatar : "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png" }}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        /></View>
      <Text style={{ fontSize: 20 }}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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
          {group?.map((friend, index) => (
            <Pressable key={index} style={styles.groupItem}>
              <Image
                style={styles.avatar}
                source={require("../../../assets/meomeo.jpg")}
              />
              <View style={styles.groupTextContainer}>
                <Text style={styles.groupTitle}>{friend.participants}</Text>
                <Text style={styles.groupDescription}>
                  {friend.userSendLast ? `${friend.userSendLast}: ${friend.lastMessage}` : "Chưa có tin nhắn"}
                </Text>
              </View>
              {friend.time !== "0 phút" ? (
                <Text style={styles.timeText}>{friend.time}</Text>
              ) : (
                <Text style={styles.timeText}>{friend.createAt}</Text>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCreateGr}
        onRequestClose={() => {
          setModalXacNhan(false);
        }}>
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
              <Text style={{ color: '#979797', fontWeight: '600' }}>Đã chọn: 0</Text>
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
                {textSearch === null ? (
                  radioButton.map(renderListItem)
                ) : (
                  listSearch.map(renderListItem)
                )}
              </ScrollView>
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
    width: '90%',
    height: '75%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
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
    paddingRight: 20,
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
