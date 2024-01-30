import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';

const PersonalSetting = ({navigation}) => {

    navigation.setOptions({
        headerRight: () => (
            <View className={"flex-row px-4"}>
                <Pressable className={"px-2"}>
                    <Ionicons name="search" size={24} color="white" />
                </Pressable>
                
            </View>
        ),
        headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text className={"text-white text-lg font-semibold"}>Cài đặt</Text>
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
          
            {/* View select */}

            {/* Tài khoản và bảo mật*/}
            <Pressable onPress={() => {navigation.navigate("AccountVsSecurity")}} className={"bg-white flex-row items-center h-12"}>
                <View className={"w-1/6 items-center"}>
                    <Ionicons name="shield-checkmark-outline" size={22} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Tài khoản và bảo mật</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable>

            {/* Quyền riêng tư */}
            <Pressable onPress={() => {navigation.navigate("PersonalPrivacy")}}  className={"bg-white flex-row items-center h-12 mb-2"}>
                <View className={"w-1/6 items-center"}>
                    <Ionicons name="lock-closed-outline" size={22} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Quyền riêng tư</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable>

            {/* Dung lượng dữ liệu */}
            <Pressable className={"bg-white flex-row items-center h-16"}>
                <View className={"w-1/6 items-center"}>
                    <Ionicons name="pie-chart-outline" size={24} color="#0091FF" />
                </View>
                <View className={"w-4/6 h-3/4"}>
                    <Text className={"font-semibold text-base pb-1"}>Dung lượng dữ liệu</Text>
                    <Text className={"text-gray-500 font-medium pb-2"}>Quản lý dữ liệu Zalo của bạn</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable >

            {/* Bộ nhớ */}
            < Pressable className={"bg-white flex-row items-center h-16 mb-2"} >
                <View className={"w-1/6 items-center"}>
                    <Ionicons name="cloudy-outline" size={24} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Sao lưu và khôi phục</Text>
                    <Text className={"text-gray-500 font-medium"}>Bảo vệ tin nhắn khi đổi máy hoặc cài lại Zalo</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable >

            {/* Thông báo*/}
            <Pressable className={"bg-white flex-row items-center h-12"}>
                <View className={"w-1/6 items-center"}>
                    <FontAwesomeIcons name="bell" size={22} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Thông báo</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable>

            {/* Tin nhắn*/}
            <Pressable className={"bg-white flex-row items-center h-12"}>
                <View className={"w-1/6 items-center"}>
                    <Ionicons name="chatbubble-outline" size={22} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Tin nhắn</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable>

            {/* Cuộc gọi*/}
            <Pressable className={"bg-white flex-row items-center h-12"}>
                <View className={"w-1/6 items-center"}>
                    <Ionicons name="call-outline" size={22} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Cuộc gọi</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable>

            {/* Nhật ký*/}
            <Pressable className={"bg-white flex-row items-center h-12"}>
                <View className={"w-1/6 items-center"}>
                    <FontAwesomeIcons name="clock" size={22} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Nhật ký</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable>

            {/* Danh bạ*/}
            <Pressable className={"bg-white flex-row items-center h-12"}>
                <View className={"w-1/6 items-center"}>
                    <FontAwesomeIcons name="address-book" size={22} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Danh bạ</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable>

            {/* Giao diện và ngôn ngữ*/}
            <Pressable className={"bg-white flex-row items-center h-12 mb-2"}>
                <View className={"w-1/6 items-center"}>
                    <Ionicons name="color-palette-outline" size={22} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Giao diện và ngôn ngữ</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable>

            {/* Thông tin về Zalo*/}
            <Pressable className={"bg-white flex-row items-center h-12"}>
                <View className={"w-1/6 items-center"}>
                    <Ionicons name="information-circle-outline" size={22} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Thông tin về Zalo</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable>

            {/* Liên hệ hỗ trợ*/}
            <Pressable className={"bg-white flex-row items-center h-12 mb-2"}>
                <View className={"w-1/6 items-center"}>
                    <Ionicons name="help-circle-outline" size={22} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Liên hệ hỗ trợ</Text>
                </View>
                <Pressable className={"bg-gray-200 p-1 rounded-2xl"}>
                    <Ionicons name="chatbubble-ellipses-outline" size={18} color="black" />
                </Pressable>
            </Pressable>

            {/* Chuyển tài khoản*/}
            <Pressable className={"bg-white flex-row items-center h-12"}>
                <View className={"w-1/6 items-center"}>
                    <Ionicons name="sync-circle-outline" size={22} color="#0091FF" />
                </View>
                <View className={"w-4/6"}>
                    <Text className={"font-semibold text-base"}>Chuyển tài khoản</Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="#cccccc" />
            </Pressable>

            <Pressable className={"bg-gray-200 flex-row items-center justify-center h-12 w-11/12 rounded-2xl self-center"}>
                <View className={"items-center px-1"}>
                    <Ionicons name="exit-outline" size={22} color="black" />
                </View>
                <View className={"px-1"}>
                    <Text className={"font-bold text-base"}>Đăng xuất</Text>
                </View>
            </Pressable>
        </View >
    )
}

export default PersonalSetting