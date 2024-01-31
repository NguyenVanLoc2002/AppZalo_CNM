// import React, { useState, useEffect } from 'react';
// import { View, Text, Pressable, Image, TextInput, Modal, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const listFriend = [
//     "Báo mới", "Bộ y tế", "Điện máy xanh", "Game Center", "Thế giới di động", "Thời tiết"
// ];

// const QA = ({ navigation }) => {

//     const [officialAccount, setOfficialAccount] = useState('');
//     return (
//         <ScrollView>
//             <View className={"flex-1 bg-slate-200"}>
//                 <View className={"flex flex-col bg-white"}>
//                     <Pressable className={"flex flex-row m-2"}>
//                         <Image style={{ width: null, height: '40px', aspectRatio: 1 }} resizeMode='contain' source={require('/assets/broadcast.png')} ></Image>
//                         <Text className={"flex justify-center items-center text-base font-bold ml-2"}>Tìm thêm Official Account</Text>
//                     </Pressable>
//                 </View>
//                 <View className={"flex flex-col bg-white mt-2"}>
//                     <Text className={"flex  text-base font-bold m-3"}>Official Account đã quan tâm</Text>

//                     <View className={"flex flex-col "}>
//                         {listFriend.map((officialAccount, index) => (
//                             <View key={index}>
//                                 <Pressable className={"flex flex-row m-4"}>  <View className={"w-[80px]"}> <Image className={" w-[60px] h-[60px] rounded-full"} source={require('/assets/meomeo.jpg')} ></Image></View>
//                                     <Text className={"flex pl-5 items-center text-lg font-semibold "}>{officialAccount}</Text>
//                                 </Pressable>
//                             </View>
//                         ))}
//                     </View>

//                 </View>

//             </View>
//         </ScrollView>
//     )
// };
// export default QA;

import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const listFriend = [
  "Báo mới",
  "Bộ y tế",
  "Điện máy xanh",
  "Game Center",
  "Thế giới di động",
  "Thời tiết",
];

const QA = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Pressable style={styles.item}>
          <LinearGradient
            // Button Linear Gradient
            colors={["#b04bff", "#5a38fe"]}
            style={styles.icon}
          >
            <Octicons name="broadcast" size={24} color="white" />
          </LinearGradient>
          <Text style={styles.itemText}>Tìm thêm Official Account</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionText}>Official Account đã quan tâm</Text>
        <View style={styles.officialAccountsContainer}>
          {listFriend.map((officialAccount, index) => (
            <Pressable key={index} style={styles.officialAccountItem}>
              <Image
                style={styles.avatar}
                source={require("/assets/meomeo.jpg")}
              />
              <Text style={styles.officialAccountText}>{officialAccount}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },
  section: {
    backgroundColor: "white",
    marginBottom: 10,
    padding: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  officialAccountsContainer: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  officialAccountItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginRight: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  officialAccountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 50,
  },
});

export default QA;
