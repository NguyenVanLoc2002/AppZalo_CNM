// import { View, Text, Image, Pressable } from 'react-native'
// import React, { useState } from 'react'
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';
// import { TextInput } from 'react-native-paper';

// const PersonalPage = ({ navigation }) => {
//     const [status, setStatus] = useState('')

//     navigation.setOptions({
//         headerRight: () => (
//             <View className={"flex-row px-4"}>
//                 <Pressable className={"px-2"}>
//                     <Ionicons name="sync-circle-outline" size={24} color="white" />
//                 </Pressable>
//                 <Pressable className={"px-1"} onPress={() => {navigation.navigate("PersonalDetail")}}>
//                     <Ionicons name="ellipsis-horizontal-sharp" size={24} color="white" />
//                 </Pressable>
//             </View>
//         ),
//         headerTitle: () => {
//             <View>
//                 <Text></Text>
//             </View>
//         },
//         headerStyle: {
//             backgroundColor: "#0091FF",
//             shadowColor: "#fff",
//         },
//         headerTintColor: "#fff",
//         headerTitleStyle: {
//             fontWeight: "bold",
//             fontSize: 20,
//         },
//     });

//     return (
//         <View className={"bg-[#f1f2f6]"}>
//             <Pressable className={"w-full justify-center items-center"}>
//                 <Image source={require("/assets/cover-image.png")} className={"w-full h-44"}></Image>
//                 <Image source={require("/assets/avata-story-3.png")} className={"w-24 h-24"}></Image>

//             </Pressable>
//             {/* Name */}
//             <View className={"w-full items-center"}>
//                 <Text className={"font-semibold text-2xl my-2"}>Min Nguyên</Text>
//                 <View className={"flex-row m-2"}>
//                     <FontAwesomeIcons name="pen" size={18} color="#66a1f0" />
//                     <Text className={"text-[#66a1f0] font-medium px-4"}>Cập nhật giới thiệu bản thân</Text>
//                 </View>
//             </View>
//             {/* Select */}
//             <View className={"flex-row w-full  px-4 justify-evenly"}>
//                 {/* Ảnh */}
//                 <Pressable className={"bg-white flex-row px-1 w-36 h-12  justify-between items-center rounded-lg"}>
//                     <Ionicons name="image" size={26} color="#006af5" />
//                     <Text className={"font-medium"}>Ảnh của tôi</Text>
//                     <Text className={"text-gray-500"}>2,3K</Text>
//                 </Pressable>
//                 {/* Kho khoảnh khắc */}
//                 <Pressable className={"bg-white flex-row px-1 w-42 h-12  justify-between items-center rounded-lg"}>
//                     <FontAwesomeIcons name="shopping-bag" size={26} color="#12aee3" />
//                     <Text className={"font-medium pl-2"}>Kho khoảnh khắc</Text>
//                     <Text className={"text-gray-500"}>11</Text>
//                 </Pressable>
//             </View>

//             {/* Post status */}
//             <View className={"flex-row items-center w-10/12 self-center my-4"}>
//                 <TextInput
//                     value={status}
//                     onChangeText={setStatus}
//                     style={{ backgroundColor: 'white', color: 'red', width: '80%' }}
//                     placeholder='Bạn đang nghĩ gì'>
//                 </TextInput>
//                 <Pressable className={"bg-white h-full justify-center w-1/5 items-center"}>
//                     <Ionicons name="image" size={26} color="#a4ce50" />
//                 </Pressable>
//             </View>

//             {/* Setting */}
//             <View className={"w-10/12 m-2 flex-row items-center "}>
//                 <Pressable className={"bg-[#d4dce2] w-6 h-6 items-center justify-center rounded-full"}>
//                     <Ionicons name="lock-closed" size={16} color="#899097" />
//                 </Pressable>
//                 <View className={"w-11/12 px-4"}>
//                     <Text className={"text-gray-400 font-semibold"}>
//                         Bạn bè của bạn sẽ không xem được các bài đăng dưới đây. <Pressable><Text className={"text-[#12aee3] font-semibold"}>Thay đổi cài đặt</Text></Pressable>
//                     </Text>
//                 </View>
//             </View>

//             {/* List status */}
//             <View className={"w-11/12 self-center my-2"}>
//                 <View className={"bg-gray-300 rounded-lg w-4/12 h-8 my-2 justify-center items-center"}>
//                     <Text className={"font-bold"}>8 tháng 9, 2020</Text>
//                 </View>
//                 <View className={"bg-white"}>
//                     <View className={"m-2"}>
//                         <Text className={"text-red-800 font-semibold"}>Happy New Year</Text>
//                     </View>
//                     <View className={"grid grid-cols-3 w-11/12 h-32 self-center"}>
//                         <Image source={require('/assets/status-HPNY-1.png')} className={"w-26 h-26"}></Image>
//                         <Image source={require('/assets/status-HPNY-2.png')} className={"w-26 h-26"}></Image>
//                         <Image source={require('/assets/status-HPNY-3.png')} className={"w-26 h-26"}></Image>
//                     </View>
//                     <View className={"flex-row py-2"}>
//                         <View className={"w-1/2 flex-row px-4"}>
//                             <Pressable className={"w-2/6 flex-row items-center mr-4"}>
//                                 <Ionicons name="heart-circle-outline" size={26} color="black" />
//                                 <Text className={"ml-1 text-base font-semibold"}>2</Text>
//                             </Pressable>
//                             <Pressable className={"flex-row items-center"}>
//                                 <Ionicons name="chatbubble-ellipses-outline" size={26} color="black" />
//                                 <Text className={"ml-1 text-base font-semibold"}>2</Text>
//                             </Pressable>
//                         </View>
//                         <View className={"w-1/2 flex-row px-4 justify-end items-center"}>
//                             <Pressable className={"w-2/6"}>
//                                 <Ionicons name="people" size={26} color="black" />
//                             </Pressable>
//                             <Pressable>
//                                 <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
//                             </Pressable>
//                         </View>
//                     </View>
//                 </View>
//             </View>

//             <View className={"w-11/12 self-center my-2"}>
//                 <View className={"bg-gray-300 rounded-lg w-4/12 h-8 my-2 justify-center items-center"}>
//                     <Text className={"font-bold"}>8 tháng 9, 2020</Text>
//                 </View>
//                 <View className={"bg-white"}>
//                     <View className={"m-2"}>
//                         <Text className={"text-red-800 font-semibold"}>Happy New Year</Text>
//                     </View>
//                     <View className={"grid grid-cols-3 w-11/12 h-32 self-center"}>
//                         <Image source={require('/assets/status-HPNY-1.png')} className={"w-26 h-26"}></Image>
//                         <Image source={require('/assets/status-HPNY-2.png')} className={"w-26 h-26"}></Image>
//                         <Image source={require('/assets/status-HPNY-3.png')} className={"w-26 h-26"}></Image>
//                     </View>
//                     <View className={"flex-row py-2"}>
//                         <View className={"w-1/2 flex-row px-4"}>
//                             <Pressable className={"w-2/6 flex-row items-center mr-4"}>
//                                 <Ionicons name="heart-circle-outline" size={26} color="black" />
//                                 <Text className={"ml-1 text-base font-semibold"}>2</Text>
//                             </Pressable>
//                             <Pressable className={"flex-row items-center"}>
//                                 <Ionicons name="chatbubble-ellipses-outline" size={26} color="black" />
//                                 <Text className={"ml-1 text-base font-semibold"}>2</Text>
//                             </Pressable>
//                         </View>
//                         <View className={"w-1/2 flex-row px-4 justify-end items-center"}>
//                             <Pressable className={"w-2/6"}>
//                                 <Ionicons name="people" size={26} color="black" />
//                             </Pressable>
//                             <Pressable>
//                                 <Image source={require("/assets/ic_threeDots.png")} className={"w-4 h-4"} resizeMode='contain' ></Image>
//                             </Pressable>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     )
// }

// export default PersonalPage

import React, { useState } from "react";
import { View, Text, Image, Pressable, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";

const PersonalPage = ({ navigation }) => {
  const [status, setStatus] = useState("");

  navigation.setOptions({
    headerRight: () => (
      <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
        <Pressable style={{ paddingHorizontal: 8 }}>
          <Ionicons name="sync-circle-outline" size={24} color="white" />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("PersonalDetail");
          }}
          style={{ paddingHorizontal: 8 }}
        >
          <Ionicons name="ellipsis-horizontal-sharp" size={24} color="white" />
        </Pressable>
      </View>
    ),
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
    },
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: "#0091FF",
      shadowColor: "#fff",
    },
  });

  return (
    <View style={{ backgroundColor: "#f1f2f6", flex: 1 }}>
      <View style={{ alignItems: "center", paddingVertical: 16 }}>
        <Image
          source={require("/assets/cover-image.png")}
          style={{ width: "100%", height: 160 }}
        />
        <Image
          source={require("/assets/avata-story-3.png")}
          style={{ width: 96, height: 96, marginTop: -48, borderRadius: 48 }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 24, marginBottom: 8 }}>
          Min Nguyên
        </Text>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <FontAwesomeIcons name="pen" size={18} color="#66a1f0" />
          <Text style={{ color: "#66a1f0", marginLeft: 8 }}>
            Cập nhật giới thiệu bản thân
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            borderRadius: 8,
          }}
        >
          <Ionicons name="image" size={26} color="#006af5" />
          <Text style={{ fontWeight: "bold", marginLeft: 8 }}>Ảnh của tôi</Text>
          <Text style={{ color: "gray", marginLeft: "auto" }}>2,3K</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            borderRadius: 8,
          }}
        >
          <FontAwesomeIcons name="shopping-bag" size={26} color="#12aee3" />
          <Text style={{ fontWeight: "bold", marginLeft: 8 }}>
            Kho khoảnh khắc
          </Text>
          <Text style={{ color: "gray", marginLeft: "auto" }}>11</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <TextInput
          value={status}
          onChangeText={setStatus}
          style={{
            backgroundColor: "white",
            flex: 1,
            marginRight: 8,
            padding: 8,
            borderRadius: 8,
          }}
          placeholder="Bạn đang nghĩ gì"
        />
        <Pressable
          style={{
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        >
          <Ionicons name="image" size={26} color="#a4ce50" />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            backgroundColor: "#d4dce2",
            width: 36,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 18,
          }}
        >
          <Ionicons name="lock-closed" size={16} color="#899097" />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <Text style={{ color: "gray", fontWeight: "bold" }}>
            Bạn bè của bạn sẽ không xem được các bài đăng dưới đây.{" "}
            <Text style={{ color: "#12aee3", fontWeight: "bold" }}>
              Thay đổi cài đặt
            </Text>
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View
          style={{
            backgroundColor: "#ccc",
            width: "40%",
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            marginBottom: 8,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>8 tháng 9, 2020</Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginBottom: 16,
            borderRadius: 8,
          }}
        >
          <View style={{ margin: 8 }}>
            <Text style={{ color: "red", fontWeight: "bold" }}>
              Happy New Year
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: 8,
              marginBottom: 8,
            }}
          >
            <Image
              source={require("/assets/status-HPNY-1.png")}
              style={{ width: "31%", aspectRatio: 1, marginBottom: 8 }}
            />
            <Image
              source={require("/assets/status-HPNY-2.png")}
              style={{ width: "31%", aspectRatio: 1, marginBottom: 8 }}
            />
            <Image
              source={require("/assets/status-HPNY-3.png")}
              style={{ width: "31%", aspectRatio: 1, marginBottom: 8 }}
            />
          </View>
          <View style={{ flexDirection: "row", padding: 8 }}>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 24,
              }}
            >
              <Ionicons name="heart-circle-outline" size={26} color="black" />
              <Text style={{ marginLeft: 4, fontWeight: "bold" }}>2</Text>
            </Pressable>
            <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={26}
                color="black"
              />
              <Text style={{ marginLeft: 4, fontWeight: "bold" }}>2</Text>
            </Pressable>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Pressable>
                <Ionicons name="people" size={26} color="black" />
              </Pressable>
              <Pressable>
                <Image
                  source={require("/assets/ic_threeDots.png")}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />
              </Pressable>
            </View>
          </View>
        </View>
        {/* Code cho status thứ hai */}
      </View>
    </View>
  );
};

export default PersonalPage;
