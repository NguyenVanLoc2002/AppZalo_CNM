import React from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

import FriendDirectory from "./FriendDirectory";
import GroupDirectory from "./GroupDirectory";
import OA from "./OA";

const Tab = createMaterialTopTabNavigator();

const DirectoryComponents = ({ navigation }) => {
  navigation.setOptions({
    headerRight: () => (
      <View style={styles.headerRightContainer}>
        <Pressable
          style={styles.headerIcon}
          onPress={() => {
            navigation.navigate("AddFriends");
          }}
        >
          <Ionicons
            name="person-add-outline"
            size={24}
            color="white"
            style={{ marginRight: 10 }}
          />
        </Pressable>
      </View>
    ),
    headerTitle: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="search"
          size={24}
          color="white"
          style={{ marginLeft: 5, marginRight: 25 }}
        />
        <TextInput
          onFocus={() => {
            navigation.navigate("SearchFriends");
          }}
          style={{
            height: 45,
            width: 300,
            marginLeft: 25,
            fontSize: 16,
          }}
          placeholder="Tìm kiếm"
          placeholderTextColor={"white"}
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

  return (
    <Tab.Navigator initialRouteName="Bạn bè" tabBarPosition="top">
      <Tab.Screen name="Bạn bè" component={FriendDirectory} />
      <Tab.Screen name="Nhóm" component={GroupDirectory} />
      <Tab.Screen name="OA" component={OA} />
    </Tab.Navigator>
  );
};

export default DirectoryComponents;

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
  },
  headerIcon: {
    padding: 10,
    marginLeft: 15,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    marginLeft: 10,
  },
  headerTitleText: {
    color: "gray",
    fontSize: 18,
    marginLeft: 40,
  },
});
