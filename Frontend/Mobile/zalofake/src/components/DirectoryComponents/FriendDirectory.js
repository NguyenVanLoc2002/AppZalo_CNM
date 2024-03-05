// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Pressable,
//   Image,
//   TextInput,
//   Modal,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const listFriend = ["Boo", "Anh Yêu", "Trần Thị Yến Nhi", "Lê Ngọc Hân"];

// const FriendDirectory = ({ navigation }) => {
//   const [friend, setFriend] = useState("");

//   return (
//     <ScrollView>
//       <View className={"flex-1 bg-slate-200"}>
//         <View className={"flex flex-col bg-white"}>
//           <Pressable className={"flex flex-row m-2"}>
//             <Ionicons
//               name={"people-circle-sharp"}
//               size={40}
//               color={"#0091FF"}
//             />
//             <Text
//               className={
//                 "flex justify-center items-center text-base font-semibold ml-2"
//               }
//             >
//               Lời mời kết bạn
//             </Text>
//           </Pressable>
//           <Pressable className={"flex flex-row m-2"}>
//             <Image
//               style={{ width: null, height: "40px", aspectRatio: 1 }}
//               resizeMode="contain"
//               source={require("/assets/contacts.png")}
//             ></Image>
//             <Text
//               className={
//                 "flex justify-center items-center text-base font-semibold ml-2"
//               }
//             >
//               Danh bạ máy
//             </Text>
//           </Pressable>
//           <Pressable className={"flex flex-row m-2"}>
//             {" "}
//             <Image
//               style={{ width: null, height: "40px", aspectRatio: 1 }}
//               resizeMode="contain"
//               source={require("/assets/cake.png")}
//             ></Image>
//             <Text
//               className={
//                 "flex justify-center items-center text-base font-semibold ml-2"
//               }
//             >
//               Lịch sinh nhật
//             </Text>
//           </Pressable>
//         </View>
//         {/* khi có db thì chỉnh lại chổ này get đúng số lượng nha */}
//         <View className={"flex flex-row mt-3 bg-white"}>
//           <Pressable
//             className={
//               "btn rounded-full  text-white w-[120px] h-[30px] justify-center items-center bg-gray-200 m-2"
//             }
//           >
//             <Text>Tất cả 470</Text>
//           </Pressable>
//           <Pressable
//             className={
//               "btn rounded-full  text-white w-[120px] h-[30px] justify-center items-center bg-white m-2 border-gray-200 border-[1px]"
//             }
//           >
//             <Text>Mới truy cập 71</Text>
//           </Pressable>
//         </View>
//         {/* List danh bạ bạn thân nhe nè */}
//         <View className={"flex flex-col mt-1 bg-white"}>
//           <View className={"flex-1 flex-row justify-between items-center"}>
//             <View className={"flex flex-row "}>
//               <Ionicons name={"star"} size={25} color={"#FCC914"} />
//               <Text
//                 className={
//                   "flex justify-center items-center text-sm font-semibold ml-2"
//                 }
//               >
//                 Bạn thân
//               </Text>
//             </View>
//             <Pressable className={"flex flex-row "}>
//               <Text className={"text-sm mr-3 font-semibold text-[#0091FF]"}>
//                 + Thêm
//               </Text>
//             </Pressable>
//           </View>
//           {listFriend.map((friend, index) => (
//             <View key={index}>
//               <Pressable className={"flex flex-row m-2 justify-between "}>
//                 <View className={"flex flex-row"}>
//                   <Image
//                     className={" w-[50px] h-[50px] rounded-full"}
//                     source={require("/assets/meomeo.jpg")}
//                   ></Image>
//                   <Text
//                     className={
//                       "flex justify-center items-center text-base font-semibold ml-2"
//                     }
//                   >
//                     {friend}
//                   </Text>
//                 </View>
//                 <View className={"flex flex-row items-center"}>
//                   <View className={"mr-5"}>
//                     <Ionicons name={"call-outline"} size={25} color={"black"} />
//                   </View>
//                   <View>
//                     <Ionicons
//                       name={"videocam-outline"}
//                       size={25}
//                       color={"black"}
//                     />
//                   </View>
//                 </View>
//               </Pressable>
//             </View>
//           ))}
//         </View>
//         {/* List danh bạ nè */}
//         <View className={"flex flex-col bg-white"}>
//           <View className={"flex-1 flex-row justify-between items-center"}>
//             <Text
//               className={
//                 "flex justify-center items-center text-lg font-bold ml-2"
//               }
//             >
//               #
//             </Text>
//           </View>
//           {listFriend.map((friend, index) => (
//             <View key={index}>
//               <Pressable className={"flex flex-row m-2 justify-between "}>
//                 <View className={"flex flex-row"}>
//                   <Image
//                     style={{ width: null, height: "50px", aspectRatio: 1 }}
//                     className={"rounded-full"}
//                     resizeMode="contain"
//                     source={require("/assets/meomeo.jpg")}
//                   ></Image>
//                   <Text
//                     className={
//                       "flex justify-center items-center text-base font-semibold ml-2"
//                     }
//                   >
//                     {friend}
//                   </Text>
//                 </View>
//                 <View className={"flex flex-row items-center"}>
//                   <View className={"mr-5"}>
//                     <Ionicons name={"call-outline"} size={25} color={"black"} />
//                   </View>
//                   <View>
//                     <Ionicons
//                       name={"videocam-outline"}
//                       size={25}
//                       color={"black"}
//                     />
//                   </View>
//                 </View>
//               </Pressable>
//             </View>
//           ))}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };
// export default FriendDirectory;

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

const listFriend = ["Boo", "Anh Yêu", "Trần Thị Yến Nhi", "Lê Ngọc Hân"];

const FriendDirectory = ({ navigation }) => {
  const [friend, setFriend] = useState("");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topSection}>
        <Pressable style={styles.buttonRow}>
          <Ionicons name={"people-circle-sharp"} size={40} color={"#0091FF"} />
          <Text style={styles.buttonText}>Lời mời kết bạn</Text>
        </Pressable>
        <Pressable style={styles.buttonRow}>
          <Image
            style={styles.iconImage}
            resizeMode="contain"
            source={require("/assets/contacts.png")}
          />
          <Text style={styles.buttonText}>Danh bạ máy</Text>
        </Pressable>
        <Pressable style={styles.buttonRow}>
          <Image
            style={styles.iconImage}
            resizeMode="contain"
            source={require("/assets/cake.png")}
          />
          <Text style={styles.buttonText}>Lịch sinh nhật</Text>
        </Pressable>
      </View>
      <View style={styles.buttonBar}>
        <Pressable style={styles.roundedButton}>
          <Text style={styles.whiteText}>Tất cả 470</Text>
        </Pressable>
        <Pressable style={styles.borderedButton}>
          <Text style={styles.grayText}>Mới truy cập 71</Text>
        </Pressable>
      </View>
      {/* List danh bạ bạn thân nhe nè */}
      <View style={styles.friendList}>
        <View style={styles.friendListHeader}>
          <View style={styles.titleRow}>
            <Ionicons name={"star"} size={25} color={"#FCC914"} />
            <Text style={styles.titleText}>Bạn thân</Text>
          </View>
          <Pressable style={styles.titleRow}>
            <Text style={styles.addText}>+ Thêm</Text>
          </Pressable>
        </View>
        {listFriend.map((friend, index) => (
          <View key={index} style={styles.friendRow}>
            <Pressable style={styles.friendItem}>
              <View style={styles.friendInfo}>
                <Image
                  style={styles.friendAvatar}
                  source={require("/assets/meomeo.jpg")}
                />
                <Text style={styles.friendName}>{friend}</Text>
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
      {/* List danh bạ nè */}
      <View style={styles.friendList}>
        <View style={styles.friendListHeader}>
          <Text style={styles.sectionTitle}>#</Text>
        </View>
        {listFriend.map((friend, index) => (
          <View key={index} style={styles.friendRow}>
            <Pressable style={styles.friendItem}>
              <View style={styles.friendInfo}>
                <Image
                  style={styles.friendAvatar}
                  source={require("/assets/meomeo.jpg")}
                />
                <Text style={styles.friendName}>{friend}</Text>
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
    backgroundColor: "#e5e5e5",
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
