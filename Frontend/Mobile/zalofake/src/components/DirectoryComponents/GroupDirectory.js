import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const listFriend = ["Boo", "Anh Yêu", "Trần Thị Yến Nhi", "Lê Ngọc Hân"];

const GroupDirectory = ({ navigation }) => {
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
          <Text style={styles.groupHeaderText}>Nhóm đang tham gia (176)</Text>
          <Pressable style={styles.sortButton}>
            <Ionicons
              name={"ios-swap-vertical-outline"}
              size={25}
              color={"#979797"}
            />
            <Text style={styles.sortButtonText}>Sắp xếp</Text>
          </Pressable>
        </View>
        {listFriend.map((friend, index) => (
          <View key={index} style={styles.groupItem}>
            <Image
              style={styles.avatar}
              source={require("../../../assets/meomeo.jpg")}
            />
            <View style={styles.groupTextContainer}>
              <Text style={styles.groupTitle}>{friend}</Text>
              <Text style={styles.groupDescription}>{friend}: hihi cuti</Text>
            </View>
            <Text style={styles.timeText}>1 giờ</Text>
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
