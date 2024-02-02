import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';
import { ProgressBar } from 'react-native-paper';

const Info = ({ navigation }) => {

  navigation.setOptions({
    headerRight: () => (
      <View className={"flex-row px-4"}>
        <Pressable  onPress={() => {navigation.navigate("PersonalSetting")}}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </Pressable>
      </View>
    ),
    headerTitle: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="search" size={24} color="white"
          style={{ position: "absolute", marginLeft: 10 }} />
        <Text className={"text-[#71b9fe] text-xl font-semibold ml-12"}>Tìm kiếm</Text>
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
      {/* View Info */}
      <View className={"flex-row items-center bg-white mb-2"}>
        <Pressable onPress={() => {navigation.navigate("PersonalPage")}} className={"w-11/12 flex-row items-center"}>
          <View className={"w-1/5"}>
            <Image source={require("/assets/avata-story-3.png")} require='contain' className={"w-16 h-16"}></Image>
          </View>
          <View className={"w-2/3"}>
            <Text className={"text-base font-medium"}>Min Nguyên</Text>
            <Text className={"text-gray-500 font-semibold"}>Xem trang cá nhân</Text>
          </View>
        </Pressable>
        <Pressable>
          <FontAwesomeIcons name="exchange-alt" size={24} color="#0091FF" />
        </Pressable>
      </View>

      {/* View select */}
      {/* Đăng ký nhạc chờ */}
      <Pressable className={"bg-white flex-row items-center h-1/4"}>
        <View className={"w-1/6 items-center"}>
          <FontAwesomeIcons name="music" size={24} color="#0091FF" />
        </View>
        <View className={""}>
          <View className={"flex-row"}>
            <Text className={"font-semibold text-base pr-4"}>Nhạc chờ Zalo</Text>
            <FontAwesomeIcons name="crown" size={16} color="#e48e04" />
          </View>
          <Text className={"text-gray-500 font-medium"}>Đăng ký nhạc chờ, thể hiện cá tính</Text>
        </View>
      </Pressable>

      {/* Ví QR */}
      <Pressable className={"bg-white flex-row items-center h-1/4"}>
        <View className={"w-1/6 items-center"}>
          <Ionicons name="qr-code-outline" size={24} color="#0091FF" />
        </View>
        <View className={""}>
          <Text className={"font-semibold text-base"}>Ví QR</Text>
          <Text className={"text-gray-500 font-medium"}>Lưu trữ và xuất trình các mã QR quan trọng</Text>
        </View>
      </Pressable>

      {/* Clound */}
      <Pressable className={"bg-white flex-row items-center h-1/4 mb-2"}>
        <View className={"w-1/6 items-center"}>
          <Ionicons name="cloudy-outline" size={24} color="#0091FF" />
        </View>
        <View className={"w-4/6 h-3/4"}>
          <Text className={"font-semibold text-base pb-1"}>Clound của tôi</Text>
          <Text className={"text-gray-500 font-medium pb-2"}>372,2 MB / 1 GB</Text>
          <ProgressBar
            style={{ height: 2, with: '100%' }}
            progress={0.5}
            color='#0091FF'
          ></ProgressBar>
        </View>
        <Ionicons name="arrow-forward" size={24} color="#cccccc" />
      </Pressable >

      {/* Bộ nhớ */}
      < Pressable className={"bg-white flex-row items-center h-1/4 mb-2"} >
        <View className={"w-1/6 items-center"}>
          <FontAwesomeIcons name="chart-pie" size={24} color="#0091FF" />
        </View>
        <View className={"w-4/6"}>
          <Text className={"font-semibold text-base"}>Dung lượng và dữ liệu</Text>
          <Text className={"text-gray-500 font-medium"}>Quản lý dữ liệu Zalo của bạn</Text>
        </View>
        <Ionicons name="arrow-forward" size={24} color="#cccccc" />
      </Pressable >

      {/* Tài khoản và bảo mật*/}
      <Pressable onPress={() => {navigation.navigate("AccountVsSecurity")}} className={"bg-white flex-row items-center h-1/6"}>
        <View className={"w-1/6 items-center"}>
          <Ionicons name="shield-checkmark" size={22} color="#0091FF" />
        </View>
        <View className={"w-4/6"}>
          <Text className={"font-semibold text-base"}>Tài khoản và bảo mật</Text>
        </View>
        <Ionicons name="arrow-forward" size={24} color="#cccccc" />
      </Pressable>

      {/* Quyền riêng tư*/}
      <Pressable onPress={() => {navigation.navigate("PersonalPrivacy")}} className={"bg-white flex-row items-center h-1/6"}>
        <View className={"w-1/6 items-center"}>
          <FontAwesomeIcons name="user-lock" size={22} color="#0091FF" />
        </View>
        <View className={"w-4/6"}>
          <Text className={"font-semibold text-base"}>Quyền riêng tư</Text>
        </View>
        <Ionicons name="arrow-forward" size={24} color="#cccccc" />
      </Pressable>
    </View >
  )
}

export default Info