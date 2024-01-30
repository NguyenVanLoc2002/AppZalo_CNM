import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';

const PersonalPrivacy = ({navigation}) => {

    navigation.setOptions({
        headerTitle: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text className={"text-white text-lg font-semibold"}>Quyền riêng tư</Text>
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
                {/* Cá nhân */}
                <View className={"bg-white mb-2"}>
                    <Text className={"ml-2 px-4 mt-2 text-sm text-[#0069fc] font-bold"}>Cá nhân</Text>
                    <Pressable className={"flex-row ml-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <Ionicons name='calendar-outline' size={26} color="#a5a9aa"></Ionicons>
                        <Text className={"text-base font-semibold w-3/4 pl-4"}>Sinh nhật</Text>
                        <View className={"w-1/6 items-center"}>
                            <Ionicons name='arrow-forward' size={22} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                    <Pressable className={"flex-row ml-2 mt-2 py-2 px-4 border-b border-gray-300 items-center"}>
                        <Ionicons name='person-circle-outline' size={26} color="#a5a9aa"></Ionicons>
                        <Text className={"text-base font-semibold w-3/4 pl-4 "}>Hiện trạng thái truy cập</Text>
                        <Text className={"text-[#a5a9aa] text-xs font-bold w-1/4 text-end"}>Đang bật</Text>
                    </Pressable>
                </View>
                {/* Tin nhắn và cuộc gọi */}
                <View className={"bg-white mb-2"}>
                    <Text className={"ml-2 px-4 mt-2 text-sm text-[#0069fc] font-bold"}>Tin nhắn và cuộc gọi</Text>
                    <Pressable className={"flex-row ml-2 mt-2 py-2 px-4 border-b border-gray-300 items-center"}>
                        <Ionicons name='chatbubble-outline' size={24} color="#a5a9aa"></Ionicons>
                        <Text className={"text-base font-semibold w-3/4 px-4"}>Hiện trạng thái "Đã xem"</Text>
                        <Text className={"text-[#a5a9aa] text-xs font-bold w-1/4 text-end"}>Đang tắt</Text>
                    </Pressable>
                    <Pressable className={"flex-row ml-2 mt-2 py-2 px-4 border-b border-gray-300 items-center"}>
                        <Ionicons name='chatbubble-ellipses-sharp' size={24} color="#a5a9aa"></Ionicons>
                        <Text className={"text-base font-semibold w-3/4 pl-4 "}>Cho phép tin nhắn</Text>
                        <Text className={"text-[#a5a9aa] text-xs font-bold w-1/4 text-end "}>Mọi người</Text>
                    </Pressable>
                    <Pressable className={"flex-row ml-2 mt-2 py-2 px-4 border-b border-gray-300 items-center"}>
                        <Ionicons name='call-outline' size={24} color="#a5a9aa"></Ionicons>
                        <Text className={"text-base font-semibold w-3/4 pl-4 "}>Cho phép gọi điện</Text>
                        <Text className={"text-[#a5a9aa] text-xs font-bold text-right "}>Bạn bè và người lạ từng liên hệ</Text>
                    </Pressable>
                </View>
                {/* Nhật ký*/}
                <View className={"bg-white mb-2"}>
                    <Text className={"ml-2 px-4 mt-2 text-sm text-[#0069fc] font-bold"}>Nhật ký</Text>
                    <Pressable className={"flex-row ml-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <FontAwesomeIcons name='pen-square' size={22} color="#a5a9aa"></FontAwesomeIcons>
                        <Text className={"text-base font-semibold w-3/4 pl-4"}>Cho phép xem và bình luận</Text>
                        <View className={"w-1/6 items-center"}>
                            <Ionicons name='arrow-forward' size={22} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                    <Pressable className={"flex-row ml-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <FontAwesomeIcons name='ban' size={22} color="#a5a9aa"></FontAwesomeIcons>
                        <Text className={"text-base font-semibold w-3/4 pl-4 "}>Chặn và ẩn</Text>
                        <View className={"w-1/6 items-center"}>
                            <Ionicons name='arrow-forward' size={22} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                </View>
                {/* Nguồn tìm kiếm và kết bạn*/}
                <View className={"bg-white mb-2"}>
                    <Text className={"ml-2 px-4 mt-2 text-sm text-[#0069fc] font-bold"}>Nguồn tìm kiếm và kết bạn</Text>
                    <Pressable className={"flex-row ml-2 mt-2 py-2 px-4 border-b border-gray-300 items-center"}>
                        <FontAwesomeIcons name='address-book' size={22} color="#a5a9aa"></FontAwesomeIcons>
                        <View className="flex-shrink">
                            <Text className={"text-base font-semibold px-4"}>Tự động kết bạn từ danh bạ máy</Text>
                            <Text className={"text-[#a5a9aa] text-xs font-bold pl-4"}>Thêm liên hệ vào danh bạ Zalo khi cả 2 đều lưu số nhau trên máy</Text>
                        </View>
                    </Pressable>
                    <Pressable className={"flex-row ml-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <FontAwesomeIcons name='people-arrows' size={22} color="#a5a9aa"></FontAwesomeIcons>
                        <Text className={"text-base font-semibold w-3/4 pl-4 "}>Quản lý nguồn tìm kiếm và kết bạn</Text>
                        <View className={"w-1/6 items-center"}>
                            <Ionicons name='arrow-forward' size={22} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                </View>
                {/* Quyền của tiện ích và ứng dụng*/}
                <View className={"bg-white mb-2"}>
                    <Text className={"ml-2 px-4 mt-2 text-sm text-[#0069fc] font-bold"}>Quyền của tiện ích và ứng dụng</Text>
                    <Pressable className={"flex-row ml-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <FontAwesomeIcons name='boxes' size={22} color="#a5a9aa"></FontAwesomeIcons>
                        <Text className={"text-base font-semibold w-3/4 pl-4 "}>Tiện ích</Text>
                        <View className={"w-1/6 items-center"}>
                            <Ionicons name='arrow-forward' size={22} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                    <Pressable className={"flex-row ml-2 mt-2 py-2 pl-4 border-b border-gray-300 items-center"}>
                        <FontAwesomeIcons name='border-all' size={22} color="#a5a9aa"></FontAwesomeIcons>
                        <Text className={"text-base font-semibold w-3/4 pl-4 "}>Ứng dụng</Text>
                        <View className={"w-1/6 items-center"}>
                            <Ionicons name='arrow-forward' size={22} color="#a5a9aa"></Ionicons>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default PersonalPrivacy