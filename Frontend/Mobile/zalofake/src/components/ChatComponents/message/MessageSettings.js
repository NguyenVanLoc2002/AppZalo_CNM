import { View, Text, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Switch } from "react-native";

const MessageSettings = ({ navigation, route }) => {
  const { user, group } = route.params;
  console.log("groupsetting", group);
  const [isMarkAsCloseFriend, setMarkAsCloseFriend] = useState(false);
  const [isPinChat, setPinChat] = useState(false);
  const [isHideChat, setHideChat] = useState(false);
  const [isNotifyIncomingCalls, setNotifyIncomingCalls] = useState(false);

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
  }, [navigation]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable
        style={{
          height: 150,
          backgroundColor: "purple",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          backgroundColor: "white",
        }}
        onPress={() => navigation.navigate("FriendProfile", { user })}
      >
        <Image
          source={{ uri: user?.profile?.avatar?.url || group?.avatarGroup }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {user?.profile?.name || group?.nameGroup}
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default MessageSettings;
