import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, TextInput, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const listFriend = [
    "Boo", "Anh Yêu", "Trần Thị Yến Nhi", "Lê Ngọc Hân"
];

const GroupDirectory = ({ navigation }) => {
    const [friend, setFriend] = useState('');
    return (
        <ScrollView>
        <View className={"flex-1 bg-slate-200"}>
            <View className={"flex flex-col bg-white"}>
                <Pressable className={"flex flex-row m-2"}> <Image style={{ width: null, height: '40px', aspectRatio: 1 }} resizeMode='contain' source={require('/assets/createGroup.png')} ></Image>
                    <Text className={"flex justify-center items-center text-base font-bold ml-2"}>Tạo nhóm mới</Text>
                </Pressable>
            </View>
            <View className={"flex flex-col bg-white mt-2"}>
                <Text className={"flex  text-base font-bold ml-2"}>Tính năng nổi bật</Text>
                <View className={"flex flex-row justify-around items-center"}>
                    <Pressable className={"flex flex-col justify-center items-center"}><View className={"w-[50px] h-[50px] bg-slate-200 rounded-lg items-center justify-center "}> <Ionicons name={"ios-calendar-sharp"} size={40} color={"#0091FF"} /></View>
                        <Text className={"flex justify-center items-center text-base font-semibold "}>Lịch</Text>
                    </Pressable>
                    <Pressable className={"flex flex-col justify-center items-center"}><View className={"w-[50px] h-[50px] bg-slate-200 rounded-lg items-center justify-center "}> <Ionicons name={"alarm-sharp"} size={40} color={"#FF1133"} /></View>
                        <Text className={"flex justify-center items-center text-base font-semibold "}>Nhắc hẹn</Text>
                    </Pressable>
                    <Pressable className={"flex flex-col justify-center items-center"}><View className={"w-[50px] h-[50px] bg-slate-200 rounded-lg items-center justify-center "}><Image style={{ width: null, height: '40px', aspectRatio: 1 }} resizeMode='contain' source={require('/assets/radar.png')} ></Image></View>
                        <Text className={"flex justify-center items-center text-base font-semibold "}>Nhóm offline</Text>
                    </Pressable>
                    <Pressable className={"flex flex-col justify-center items-center"}><View className={"w-[50px] h-[50px] bg-slate-200 rounded-lg items-center justify-center "}> <Ionicons name={"image-outline"} size={40} color={"#F6904C"} /></View>
                        <Text className={"flex justify-center items-center text-base font-semibold "}>Chia sẻ ảnh</Text>
                    </Pressable>
                </View>
            </View>

            {/* List nhóm, lấy thông số theo db */}
            <View className={"flex flex-col mt-2 bg-white"}>
                <View className={"flex-1 flex-row justify-between items-center m-2"}>
                    <View className={"flex flex-row "}>
                        <Text className={"flex justify-center items-center text-lg font-bold ml-2"}>Nhóm đang tham gia (176)</Text>
                    </View>
                    <Pressable className={"flex flex-row "}>
                        <Ionicons name={"ios-swap-vertical-outline"} size={25} color={"#979797"} />
                        <Text className={"text-base mr-3 font-semibold text-[#979797]"}>Sắp xếp</Text>
                    </Pressable>
                </View>
                {listFriend.map((friend, index) => (
                    <View key={index}>
                        <Pressable className={"flex flex-row  justify-between items-center m-3 mb-0"}>
                            <View className={"flex-1 flex-row"}>
                                <View className={"w-[70px]"}> <Image className={" w-[50px] h-[50px] rounded-full"} source={require('/assets/meomeo.jpg')} ></Image></View>
                                <View className={"flex-1 flex-row justify-between items-center border-b-gray-200 border-b-[3px] "}>
                                    <View className={""}>
                                        <Text className={"flex  text-lg font-bold"}>{friend}</Text>
                                        <Text className={"flex text-base font-semibold  text-[#979797]"}>{friend}: hihi cuti</Text>
                                    </View>
                                    <Text className={"text-base mr-3 font-semibold text-[#979797]"}>1 giờ</Text>
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
export default GroupDirectory;