import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



const LoginMain = ({navigation}) => {
    return (
        <View className={"flex-1 flex-col justify-evenly bg-white "}>
            <View>
                <Text className={"font-bold text-2xl text-blue-400 text-center"}>Zalo</Text>
                <View><Image style={{ width: '100%', height: 200, aspectRatio: 1 }} resizeMode='contain' source={require('/assets/bgLogin.png')} ></Image></View>
            </View>
             <View className={"mx-10"}>
                <Text className={"font-bold text-black-400 text-center"}>Gọi video ổn định</Text>
                <Text className={"font-400 text-gray-400 text-center"}>Trò chuyện thật đã với chất lượng video ổn định mọi lúc mọi nơi</Text>
            </View>
          <View className={'flex flex-row justify-center items-center'}>
                <Pressable className={"btn rounded-full p-1 bg-blue-500"  }></Pressable>
                <Pressable className={"btn rounded-full p-1 bg-gray-300 ml-1" }></Pressable>
                <Pressable className={"btn rounded-full p-1 bg-gray-300 ml-1" }></Pressable>
                <Pressable className={"btn rounded-full p-1 bg-gray-300 ml-1" }></Pressable>
                <Pressable className={"btn rounded-full p-1 bg-gray-300 ml-1" }></Pressable>
            </View>
            <View className={'justify-center items-center'}>
                <Pressable className={"btn rounded-full p-2 w-1/2  bg-blue-500 font-bold text-white"}
                onPress={() => navigation.navigate("Login") }
                >
                    <Text className={"font-bold text-white text-center"}>ĐĂNG NHẬP</Text>
                </Pressable>
                <Pressable className={"btn rounded-full p-2 w-1/2 bg-gray-300 mt-3 font-bold text-black"}
                onPress={() => navigation.navigate("CreateAccount") }
                >
                    <Text className={"font-bold text-center"}>ĐĂNG KÝ</Text>
                </Pressable>
            </View>
              <View className={'flex flex-row justify-center items-center'}>
                <Pressable className={"btn p-2"}
                ><Text className={"font-semibold text-black border-b-black border-b-[1px]"}>Tiếng Việt</Text>
                </Pressable>
                <Pressable className={"btn p-2"}
                > 
                <Text className={"font-semibold text-gray-500"}>English</Text>
                </Pressable>
            </View>
        </View>
    )
};
export default LoginMain;