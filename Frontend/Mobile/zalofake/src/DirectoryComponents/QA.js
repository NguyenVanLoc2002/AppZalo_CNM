import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, TextInput, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const listFriend = [
    "Báo mới", "Bộ y tế", "Điện máy xanh", "Game Center", "Thế giới di động", "Thời tiết"
];

const QA = ({ navigation }) => {

    const [officialAccount, setOfficialAccount] = useState('');
    return (
        <ScrollView>
            <View className={"flex-1 bg-slate-200"}>
                <View className={"flex flex-col bg-white"}>
                    <Pressable className={"flex flex-row m-2"}>
                        <Image style={{ width: null, height: '40px', aspectRatio: 1 }} resizeMode='contain' source={require('/assets/broadcast.png')} ></Image>
                        <Text className={"flex justify-center items-center text-base font-bold ml-2"}>Tìm thêm Official Account</Text>
                    </Pressable>
                </View>
                <View className={"flex flex-col bg-white mt-2"}>
                    <Text className={"flex  text-base font-bold m-3"}>Official Account đã quan tâm</Text>

                    <View className={"flex flex-col "}>
                        {listFriend.map((officialAccount, index) => (
                            <View key={index}>
                                <Pressable className={"flex flex-row m-4"}>  <View className={"w-[80px]"}> <Image className={" w-[60px] h-[60px] rounded-full"} source={require('/assets/meomeo.jpg')} ></Image></View>
                                    <Text className={"flex pl-5 items-center text-lg font-semibold "}>{officialAccount}</Text>
                                </Pressable>
                            </View>
                        ))}
                    </View>

                </View>


            </View>
        </ScrollView>
    )
};
export default QA;