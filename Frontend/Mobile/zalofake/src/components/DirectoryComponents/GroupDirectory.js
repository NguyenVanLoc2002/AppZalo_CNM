import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../api/axiosInstance";
import moment from 'moment-timezone';

const GroupDirectory = ({ navigation }) => {
  const [listConversations, setListConversation] = useState([]);
  const [lengthGroup, setLengthGroup] = useState(0)
  const [group, setGroup] = useState()

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
          let userSendLast = data?.lastMessage?.senderId
          let timestamp = data?.lastMessage?.timestamp
          for (const participant of data.participants) {
            if (participant._id === userSendLast) {
              nameUserSendLast = participant.profile.name
              if(data?.lastMessage?.contents[0].type === 'text'){
                lastMessage = data?.lastMessage?.contents[0]?.data
              } else if(data?.lastMessage?.contents[0].type === 'image'){
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
            time : handleGetTime(timestamp)
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
    else if(hours>=1){
      return `${hours} giờ`;
    }
    else {
        return `${minutes} phút`;
    }
  };
  useEffect(() => {
    fetchConversations()
  }, [])


  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Pressable style={styles.item}>
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
            {friend.time !== "0 phút" && (
              <Text style={styles.timeText}>{friend.time}</Text>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
