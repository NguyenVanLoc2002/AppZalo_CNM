import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../../api/axiosInstance";
import { useAuthContext } from "../../../contexts/AuthContext";

const Message = ({ navigation, route }) => {
  const { user } = route.params;
  const [chats, setChats] = useState([]);
  const [isSend, setIsSend] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axiosInstance.get(`/chats/${user.userId}`);
        const reversedChats = response.data.data.reverse(); 
        setChats(reversedChats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  }, []);

  const handleCheckIsSend = (message) => {
    if(message.senderId===user.userId){
      // setIsSend(false);
      return false;
    }else{
      return true;
      // setIsSend(true);
    }
  };
  const handleGetTime = (time) => {
    const dateObject = new Date(time); // Chuyển đổi chuỗi thành đối tượng Date
    return `${dateObject.getUTCHours()}:${dateObject.getUTCMinutes()}`
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Pressable>
            <Ionicons
              name="call-outline"
              size={27}
              color="white"
              style={{ padding: 5, paddingStart: 15, marginRight: 10 }}
            />
          </Pressable>
          <Ionicons
            name="videocam-outline"
            size={27}
            color="white"
            style={{ padding: 5, marginRight: 10 }}
          />
          <Pressable
            onPress={() => navigation.navigate("MessageSettings", { user })}
          >
            <Ionicons
              name="list-outline"
              size={27}
              color="white"
              style={{ padding: 5 }}
            />
          </Pressable>
        </View>
      ),
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>{user.profile.name}</Text>
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



  return (
    <View style={{ flex: 1, backgroundColor: "#E5E9EB" }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
       
        <View style={{flex: 1, justifyContent: "flex-start" }}>
        {chats.map((message, index) => (
          <View key={index} style={{width:'75%', justifyContent:'space-around', borderRadius:10,backgroundColor: handleCheckIsSend(message) ? "#7debf5" : "#d9d9d9", margin:5,alignItems: handleCheckIsSend(message) ? "flex-end" :"flex-start", alignSelf: handleCheckIsSend(message) ? "flex-end" :"flex-start"}}>        
              <View style={{paddingLeft:10, paddingRight:10, paddingTop:5}} >
               <Text style={{ fontSize:18}}>{message.contents[0].data}</Text>
                
              </View>
              <View style={{paddingLeft:10, paddingRight:10, paddingBottom:5}}><Text style={{ fontSize:18}}>{handleGetTime(message.timestamp)}</Text></View>
          </View>
        ))}
        </View>

      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 10,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={() => console.log("Pressed smiley")}>
          <Ionicons name="happy-outline" size={30} color="black" />
        </TouchableOpacity>

        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderColor: "gray",
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 5,
            paddingLeft: 10,
          }}
          placeholder="Tin nhắn"
        />

        <TouchableOpacity onPress={() => console.log("Pressed menu")}>
          <Ionicons
            name="ellipsis-horizontal-outline"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Pressed microphone")}>
          <Ionicons
            name="mic-outline"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Pressed image")}>
          <Ionicons name="image-outline" size={30} color="black" style={{}} />
        </TouchableOpacity>
      </View>
    </View>
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
export default Message;
