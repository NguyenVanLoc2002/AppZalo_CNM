import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';

const PersonalDetail = ({navigation}) => {

    navigation.setOptions({
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text className={"text-white text-lg font-semibold"}>Min Nguyên</Text>
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
    return (
        <View className={"bg-white h-full"}>
           
            {/* Body */}
            <View className={""}>
                <Pressable className={"ml-2 mt-2 py-2 px-4 border-b border-gray-300"}>
                    <Text className={"text-base font-medium"}>Thông tin</Text>
                </Pressable>
                <Pressable className={"ml-2 mt-2 py-2 px-4 border-b border-gray-300"}>
                    <Text className={"text-base font-medium"}>Đổi ảnh đại diện</Text>
                </Pressable>
                <Pressable className={"ml-2 mt-2 py-2 px-4 border-b border-gray-300"}>
                    <Text className={"text-base font-medium"}>Đổi ảnh bìa</Text>
                </Pressable>
                <Pressable className={"ml-2 mt-2 py-2 px-4 border-b border-gray-300"}>
                    <Text className={"text-base font-medium"}>Cập nhật giới thiệu bản thân</Text>
                </Pressable>
                <Pressable className={"ml-2 mt-2 py-2 px-4 border-b border-gray-300"}>
                    <Text className={"text-base font-medium"}>Ví của tôi</Text>
                </Pressable>
            </View>
            <View className={"bg-gray-100 h-2 w-full"}></View>
            {/* Setting */}
            <View className={""}>
                <Text className={"ml-2 px-4 mt-2 text-base text-[#4b91c8] font-semibold"}>Cài đặt</Text>
                <Pressable className={"ml-2 mt-2 py-2 px-4 border-b border-gray-300"}>
                    <Text className={"text-base font-medium"}>Mã QR của tôi</Text>
                </Pressable>
                <Pressable onPress={() => {navigation.navigate("PersonalPrivacy")}} className={"ml-2 mt-2 py-2 px-4 border-b border-gray-300"}>
                    <Text className={"text-base font-medium"}>Quyền riêng tư</Text>
                </Pressable>
                <Pressable onPress={() => {navigation.navigate("AccountVsSecurity")}} className={"ml-2 mt-2 py-2 px-4 border-b border-gray-300"}>
                    <Text className={"text-base font-medium"}>Quản lý tài khoản</Text>
                </Pressable>
                <Pressable className={"ml-2 mt-2 py-2 px-4 border-b border-gray-300"}>
                    <Text className={"text-base font-medium"}>Cài đặt chung</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default PersonalDetail