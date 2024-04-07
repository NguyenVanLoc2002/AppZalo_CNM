import React from "react";
import { Text, View, Image } from "react-native";

const ChatItem = ({ item }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "white",
      }}
    >
      <View
        style={{ width: "15%", justifyContent: "center", alignItems: "center" }}
      >
        <Image
          source={{  uri: item.friend?.profile?.avatar?.url, }}
          style={{ width: 55, height: 55, borderRadius: 25 }}
        />
      </View>
      <View
        style={{
          width: "65%",
          alignItems: "flex-start",
          paddingLeft: 20,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 5 }}>{item.friend.profile.name}</Text>
        <Text
          style={{
            fontSize: 14,
            opacity: 0.5,
          }}
          numberOfLines={1}
        >
          {item.chat}
        </Text>
      </View>
      {/* <View
        style={{
          width: "18%",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Text style={{ marginBottom: 5 }}>
          {item.thoiGian === 0 ? "vừa xong" : `${item.thoiGian} phút`}
        </Text> */}
        {/* <Text
          style={{
            backgroundColor: "red",
            width: 20,
            height: 20,
            textAlign: "center",
            borderRadius: 25,
            color: "white",
            fontWeight: "bold",
            display: item.soTNChuaDoc === 0 ? "none" : "flex",
          }}
        > */}
          {/* {item.soTNChuaDoc} */}
        {/* </Text> */}
      {/* </View> */}
    </View>
  );
};

export default ChatItem;
