import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';

const AccountVsSecurity = ({navigation}) => {

    navigation.setOptions({
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text className={"text-white text-lg font-semibold"}>Tài khoản và bảo mật</Text>
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
        <View>
           
            {/* Body */}
            <View>
                {/* Tài khoản */}
                <View className={"bg-white mb-2"}>
                    <Text className={"ml-2 px-4 mt-2 text-sm text-[#0069fc] font-bold"}>Tài khoản</Text>
                    <Pressable className={"flex-row mx-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <Ionicons name='call-outline' size={24} color="#a5a9aa"></Ionicons>
                        <View className={" w-3/4 pl-4"}>
                            <Text className={"text-base font-semibold"}>Số điện thoại</Text>
                            <Text className={"text-gray-400 font-semibold"}>(+84) 338 123 689</Text>
                        </View>
                        <View className={"w-1/6 items-end"}>
                            <Ionicons name='arrow-forward' size={20} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                    <Pressable className={"flex-row mx-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <FontAwesomeIcons name='user-check' size={22} color="#a5a9aa"></FontAwesomeIcons>
                        <Text className={"text-base font-semibold w-3/4 pl-4 "}>Định danh tài khoản</Text>
                        <View className={"w-2/6 justify-end items-center flex-row"}>
                            <Text className={"text-gray-400 font-bold text-xs"}>Chưa định danh</Text>
                            <Ionicons name='arrow-forward' size={22} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                    <Pressable className={"flex-row mx-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <Ionicons name='qr-code-outline' size={22} color="#a5a9aa"></Ionicons>
                        <Text className={"text-base font-semibold w-3/4 pl-4 "}>Mã QR của tôi</Text>
                        <View className={"w-1/6 items-end"}>
                            <Ionicons name='arrow-forward' size={22} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                </View>

                {/* Bảo mật */}
                <View className={"bg-white mb-2"}>
                    <Text className={"ml-2 px-4 mt-2 text-sm text-[#0069fc] font-bold"}>Bảo mật</Text>
                    <Pressable className={"flex-row mx-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <Ionicons name='shield-checkmark-outline' size={24} color="#a5a9aa"></Ionicons>
                        <View className={"w-3/4 pl-4"}>
                            <Text className={"text-base font-semibold"}>Kiểm tra bảo mật</Text>
                            <Text className={"text-[#f7c001] font-bold"}>2 vấn đề cần xử lý</Text>
                        </View>
                        <View className={"w-1/6 justify-end items-center flex-row"}>
                            <Ionicons name="warning" size={20} color="#f7c001"></Ionicons>
                            <Ionicons name='arrow-forward' size={20} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                    <Pressable className={"flex-row mx-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <FontAwesomeIcons name='user-lock' size={20} color="#a5a9aa"></FontAwesomeIcons>
                        <Text className={"text-base font-semibold w-3/4 pl-4 "}>Khoá Zalo</Text>
                        <View className={"w-2/6 justify-end items-center flex-row"}>
                            <Text className={"text-gray-400 font-bold text-xs"}>Đang tắt</Text>
                            <Ionicons name='arrow-forward' size={22} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                </View>

                {/* Đăng nhập */}
                <View className={"bg-white mb-2"}>
                    <Text className={"ml-2 px-4 mt-2 text-sm text-[#0069fc] font-bold"}>Đăng nhập</Text>
                    <Pressable className={"flex-row mx-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <FontAwesomeIcons name='shield-virus' size={24} color="#a5a9aa"></FontAwesomeIcons>
                        <View className={" w-3/4 pl-4"}>
                            <Text className={"text-base font-semibold"}>Bảo mật 2 lớp</Text>
                            <Text className={"text-gray-400 font-semibold"}>Thêm hình thức xác nhận để bảo vệ tài khoản khi đăng nhập trên thiết bị mới</Text>
                        </View>
                        <View className={"w-1/6 items-end"}>
                            <Ionicons name='arrow-forward' size={20} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                    <Pressable className={"flex-row mx-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <Ionicons name='phone-portrait-outline' size={24} color="#a5a9aa"></Ionicons>
                        <View className={" w-3/4 pl-4"}>
                            <Text className={"text-base font-semibold"}>Thiết bị đăng nhập</Text>
                            <Text className={"text-gray-400 font-semibold"}>Quản lý các thiết bị bạn sử dụng để đăng nhập Zalo</Text>
                        </View>
                        <View className={"w-1/6 items-end"}>
                            <Ionicons name='arrow-forward' size={20} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                    <Pressable className={"flex-row mx-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <Ionicons name='lock-closed-outline' size={22} color="#a5a9aa"></Ionicons>
                        <Text className={"text-base font-semibold w-3/4 pl-4 "}>Mật khẩu</Text>
                        <View className={"w-1/6 items-end"}>
                            <Ionicons name='arrow-forward' size={22} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                </View>
                {/* Xoá tài khoản */}
                <Pressable className={"bg-white mb-2 flex-row mx-2 mt-2 py-2 pl-4 items-center"}>
                    <Text className={"text-base font-semibold w-3/4 "}>Xoá tài khoản</Text>
                    <View className={"w-2/6 justify-end items-center flex-row"}>
                        <Ionicons name='arrow-forward' size={22} color="#a5a9aa"></Ionicons>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default AccountVsSecurity