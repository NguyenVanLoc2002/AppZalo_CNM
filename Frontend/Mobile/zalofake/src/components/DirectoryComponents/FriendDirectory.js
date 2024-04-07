import React, { useState, useEffect } from "react";
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
import { useAuthContext } from "../../contexts/AuthContext";
const FriendDirectory = ({ navigation }) => {
  const [friend, setFriend] = useState("");
  const [friends, setFriends] = useState([]);
  const { authUser } = useAuthContext();
  const [totalFriends, setTotalFriends] = useState("");
  // console.log(authUser);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosInstance.get("/users/get/friends");
        setFriends(response.data.friends);
        console.log(friends)
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, []);
  useEffect(() => {
    setTotalFriends(friends.length);
  }, [friends]);

  const handleFriendMessage = (friend) => {
    navigation.navigate("Message",{ user :friend });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <Pressable style={styles.buttonRow}>
          <Ionicons name={"people-circle-sharp"} size={40} color={"#0091FF"} />
          <Text style={styles.buttonText}>Lời mời kết bạn</Text>
        </Pressable>
      </View>
      <View style={styles.buttonBar}>
        <Pressable style={styles.roundedButton}>
          <Text style={styles.whiteText}>Tất cả {totalFriends}</Text>
        </Pressable>
      </View>

      {/* List danh bạ nè */}
      <View style={styles.friendList}>
        <View style={styles.friendListHeader}>
          <Text style={styles.sectionTitle}>#</Text>
        </View>
        {friends.map((friend, index) => (
          <View key={index} style={styles.friendRow}>
            <Pressable style={styles.friendItem} onPress={() => handleFriendMessage(friend)}>
              <View style={styles.friendInfo}>
                <Image
                  source={{
                    uri: friend?.profile?.avatar?.url,
                  }}
                  style={styles.friendAvatar}
                />
                <Text style={styles.friendName}>{friend.profile.name}</Text>
              </View>
              <View style={styles.friendActions}>
                <View style={styles.actionIcon}>
                  <Ionicons name={"call-outline"} size={25} color={"black"} />
                </View>
                <View style={styles.actionIcon}>
                  <Ionicons
                    name={"videocam-outline"}
                    size={25}
                    color={"black"}
                  />
                </View>
              </View>
            </Pressable>
          </View>
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
  topSection: {
    backgroundColor: "white",
    padding: 10,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  iconImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  buttonBar: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
  },
  roundedButton: {
    borderRadius: 50,
    backgroundColor: "#bebebe",
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
  },
  borderedButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  whiteText: {
    color: "white",
    fontSize: 16,
  },
  grayText: {
    color: "gray",
    fontSize: 16,
  },
  friendList: {
    backgroundColor: "white",
    padding: 10,
    borderTopColor: "#e5e5e5",
    borderTopWidth: 0.5,
  },
  friendListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  addText: {
    color: "#0091FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  friendRow: {
    paddingVertical: 10,
  },
  friendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendName: {
    fontSize: 16,
  },
  friendActions: {
    flexDirection: "row",
  },
  actionIcon: {
    marginRight: 20,
  },
});

export default FriendDirectory;
