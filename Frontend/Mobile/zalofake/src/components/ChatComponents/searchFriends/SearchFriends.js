import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigation } from "@react-navigation/native";

function SearchFriends() {
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedFriendIndex, setSelectedFriendIndex] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 10,
            paddingHorizontal: 5,
            paddingVertical: 3,
            width: 280,
          }}
        >
          <Ionicons name="search" size={18} color="gray" />
          <TextInput
            style={{ marginLeft: 5 }}
            placeholder="Tìm kiếm"
            placeholderTextColor={"gray"}
            onChangeText={(text) => setSearchKeyword(text)}
          />
        </View>
      ),
      headerStyle: {
        backgroundColor: "#0091FF",
        shadowColor: "#fff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosInstance.get("/users/get/friends");
        setFriends(response.data.friends);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, []);

  const filteredFriends = friends.filter((friend) =>
    friend.profile.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleFriendPress = (friend, index) => {
    setSelectedFriendIndex(index);
    console.log(friend);
    // Chuyển hướng đến màn hình Message khi người dùng nhấn vào một item bạn bè
    navigation.navigate("Message", { friend: filteredFriends[index] });
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.friendList}>
          {filteredFriends.map((friend, index) => (
            <View key={index} style={styles.friendRow}>
              <Pressable
                key={index}
                onPress={() => handleFriendPress(friend, index)}
                style={[
                  styles.friendItem,
                  index === selectedFriendIndex && {
                    backgroundColor: "#e0e0e0",
                  },
                ]}
              >
                <View style={styles.friendInfo}>
                  <Image
                    source={{
                      uri: friend?.profile?.avatar?.url,
                    }}
                    style={styles.friendAvatar}
                  />
                  <Text style={styles.friendName}>{friend.profile.name}</Text>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  friendList: {
    backgroundColor: "white",
    padding: 10,
    borderTopColor: "#e5e5e5",
    borderTopWidth: 0.5,
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
});

export default SearchFriends;
