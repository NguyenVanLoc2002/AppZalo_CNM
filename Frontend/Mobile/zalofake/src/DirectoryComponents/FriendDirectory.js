import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, TextInput, Modal , ScrollView} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const listFriend = [
    "Boo", "Anh Yêu", "Trần Thị Yến Nhi", "Lê Ngọc Hân"
];

const FriendDirectory = ({ navigation }) => {
    const [friend, setFriend] = useState('');

    return (
        <ScrollView>
        <View className={"flex-1 bg-slate-200"}>
            <View className={"flex flex-col bg-white"}>

                <Pressable className={"flex flex-row m-2"}><Ionicons name={"people-circle-sharp"} size={40} color={"#0091FF"} />
                    <Text className={"flex justify-center items-center text-base font-semibold ml-2"}>Lời mời kết bạn</Text>
                </Pressable>
                <Pressable className={"flex flex-row m-2"}>
                    <Image style={{ width: null, height: '40px', aspectRatio: 1 }} resizeMode='contain' source={require('/assets/contacts.png')} ></Image>
                    <Text className={"flex justify-center items-center text-base font-semibold ml-2"}>Danh bạ máy</Text>
                </Pressable>
                <Pressable className={"flex flex-row m-2"}> <Image style={{ width: null, height: '40px', aspectRatio: 1 }} resizeMode='contain' source={require('/assets/cake.png')} ></Image>
                    <Text className={"flex justify-center items-center text-base font-semibold ml-2"}>Lịch sinh nhật</Text>
                </Pressable>

            </View>
            {/* khi có db thì chỉnh lại chổ này get đúng số lượng nha */}
            <View className={"flex flex-row mt-3 bg-white"}>
                <Pressable className={"btn rounded-full  text-white w-[120px] h-[30px] justify-center items-center bg-gray-200 m-2"}>
                    <Text>Tất cả 470</Text>
                </Pressable>
                <Pressable className={"btn rounded-full  text-white w-[120px] h-[30px] justify-center items-center bg-white m-2 border-gray-200 border-[1px]"}>
                    <Text>Mới truy cập 71</Text>
                </Pressable>
            </View>
            {/* List danh bạ bạn thân nhe nè */}
            <View className={"flex flex-col mt-1 bg-white"}>
                <View className={"flex-1 flex-row justify-between items-center"}>
                    <View className={"flex flex-row "}>
                        <Ionicons name={"star"} size={25} color={"#FCC914"} />
                        <Text className={"flex justify-center items-center text-sm font-semibold ml-2"}>Bạn thân</Text>
                    </View>
                    <Pressable className={"flex flex-row "}>
                        <Text className={"text-sm mr-3 font-semibold text-[#0091FF]"}>+ Thêm</Text>
                    </Pressable>
                </View>
                {listFriend.map((friend, index) => (
                    <View key={index}>
                        <Pressable className={"flex flex-row m-2 justify-between "}>
                            <View className={"flex flex-row"}>
                               <Image className={" w-[50px] h-[50px] rounded-full"}  source={require('/assets/meomeo.jpg')} ></Image>
                                <Text className={"flex justify-center items-center text-base font-semibold ml-2"}>{friend}</Text>
                            </View>
                            <View className={"flex flex-row items-center"}>
                                <View className={"mr-5"}>
                                    <Ionicons name={"call-outline"} size={25} color={"black"} />
                                </View>
                                <View>
                                    <Ionicons name={"videocam-outline"} size={25} color={"black"} />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                ))}

            </View>
            {/* List danh bạ nè */}
            <View className={"flex flex-col bg-white"}>
                <View className={"flex-1 flex-row justify-between items-center"}>

                    <Text className={"flex justify-center items-center text-lg font-bold ml-2"}>#</Text>

                </View>
                {listFriend.map((friend, index) => (
                    <View key={index}>
                        <Pressable className={"flex flex-row m-2 justify-between "}>
                            <View className={"flex flex-row"}>
                                <Image style={{ width: null, height: '50px', aspectRatio: 1 }} className={"rounded-full"} resizeMode='contain' source={require('/assets/meomeo.jpg')} ></Image>
                                <Text className={"flex justify-center items-center text-base font-semibold ml-2"}>{friend}</Text>
                            </View>
                            <View className={"flex flex-row items-center"}>
                                <View className={"mr-5"}>
                                    <Ionicons name={"call-outline"} size={25} color={"black"} />
                                </View>
                                <View>
                                    <Ionicons name={"videocam-outline"} size={25} color={"black"} />
                                </View>
                            </View>
                        </Pressable>
                    </View>
                ))}

            </View>

        </View>
        </ScrollView>
    )
};
export default FriendDirectory;