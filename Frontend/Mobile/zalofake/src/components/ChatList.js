import { View, Text, Pressable } from "react-native";
import React from "react";

const ChatList = ({navigation}) => {
  return (
    <View>
      <Text className={"text-red-400"}>Chat List</Text>
      <Pressable className={"btn rounded-full  bg-cyan-400 p-5 font-bold text-red-400"}
      onPress={() => navigation.navigate("ChatContent") }
      >
        <Text className={"font-bold text-red-400 text-center"}>Chat</Text>
      </Pressable>
    </View>
  );
};

export default ChatList;