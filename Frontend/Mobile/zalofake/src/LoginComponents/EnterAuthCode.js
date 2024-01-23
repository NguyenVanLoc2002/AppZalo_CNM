import React, { useState } from 'react';
import { View, Text, Pressable, Image, TextInput, Modal } from "react-native";
import { CheckBox } from 'react-native-elements';
import CountryDropdown from './CountryDropdown'


const EnterAuthCode = () => {
  return (
    <View className={"flex-1  bg-white "}>
      <View className={"bg-gray-200"}><Text className={"font-semibold text-black-400 p-2 "}>Vui lòng không chia sẽ mã xác thực để tránh mất tài khoản</Text></View>
      <View className={"flex "}>
        <View className={"flex flex-col justify-center items-center m-3"}>
          <Image style={{ width: '20%', height: null, aspectRatio: 1 }} resizeMode='contain' source={require('/assets/phone.png')} ></Image>
          <Text className={"font-bold text-black m-2 "}>Đang gọi đến số (+84) 338 030 541</Text>
          <Text className={"font-normal text-black m-2 "}>Vui lòng bắt máy để nghe mã</Text>
        </View>
        <View className={"flex  "}>
          <View className="flex flex-row justify-center m-5">
            <TextInput className="mr-3 border-b-2 border-gray-300" style={{ width: 30 }}></TextInput>
            <TextInput className="mr-3 border-b-2 border-gray-300" style={{ width: 30 }}></TextInput>
            <TextInput className="mr-3 border-b-2 border-gray-300" style={{ width: 30 }}></TextInput>
            <TextInput className="mr-3 border-b-2 border-gray-300" style={{ width: 30 }}></TextInput>
            <TextInput className="mr-3 border-b-2 border-gray-300" style={{ width: 30 }}></TextInput>
            <TextInput className="mr-3 border-b-2 border-gray-300" style={{ width: 30 }}></TextInput>
          </View>
          <View className="flex flex-row justify-center"><Text className={"font-bold text-gray-400 "}>Gửi lại mã <Text className={"font-bold text-sky-300 "}>00:57</Text></Text></View>
          <View className={"flex justify-center items-center m-5"}>
            <Pressable style={{ width: 120, height: 40, justifyContent: "center", alignItems: "center", backgroundColor: "gray" }} className={"btn rounded-full  text-white"}
            ><Text className={" text-white"}>Tiếp tục</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
};
export default EnterAuthCode;