import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, TextInput, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ navigation }) => {

    const [textPhone, setTextPhone] = useState('');
    const [textPW, setTextPW] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleTextChange = (input) => {
        setTextPhone(input);
    };
    const handleTextPWChange = (input) => {
        setTextPW(input);
    };

    useEffect(() => {
        if (textPhone.length > 0 && textPW.length > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }

    }, [textPhone, textPW]);


    return (
        <View className={"flex-1 justify-between bg-white"}>
            <View>
                <View className={"bg-gray-200"}><Text className={"font-bold text-black-400 p-2 text-center"}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text></View>
                <View className={"flex flex-row m-5 "} >
                    <TextInput
                        id='phone'
                        onChangeText={handleTextChange}
                        value={textPhone}
                        placeholder="Số điện thoại" className={"w-[100%] pl-3 font-semibold placeholder-gray-400 text-base border-b-gray-300 focus:border-b-[#64D6EA] border-b-[2px] focus:outline-none"}></TextInput>
                </View>
                <View className={"flex flex-row justify-between ml-5 mr-5 border-b-[2px] " + `${!isFocused ? "border-b-gray-300" : " border-b-[#64D6EA]"}`}>
                    <TextInput
                        id='pw'
                        secureTextEntry={!showPassword}
                        onChangeText={handleTextPWChange}
                        value={textPW}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Mật khẩu" className={"pl-3  font-semibold placeholder-gray-400 text-base focus:outline-none "}></TextInput>
                    <View >
                        <Pressable className={"flex "}
                            onPress={toggleShowPassword}>
                            {showPassword ? (
                                <Text className={"font-semibold text-base text-gray-400"}>ẨN</Text>
                            ) : (
                                <Text className={"font-semibold text-base text-gray-400"}>HIỆN</Text>
                            )}
                        </Pressable>
                    </View>
                </View>
                <Pressable className={"m-5"}>
                    <Text className={"font-bold text-[#0091FF] text-base"}>Lấy lại mật khẩu </Text>
                </Pressable>
            </View>
            <View className="flex flex-row justify-between">
                <Text className={"font-bold text-gray-400 text-base mt-5"}>Câu hỏi thường gặp<Text className={"text-lg"}>{'\u003E'}</Text></Text>
                <View className={"mb-5"}>
                    <Pressable
                        className={
                            "w-[70px] h-[70px] btn rounded-full font-bold text-white items-center justify-center "
                            + `${isValid ? " bg-[#0091FF]" : " bg-[#BFD3F8]"}`
                        }
                        disabled={!isValid}
                    >
                        <View><Image className={
                            "w-[50px] h-[50px]"} source={require('/assets/arrow.png')} ></Image>
                        </View>
                    </Pressable>
                </View>

            </View>


        </View>
    )
};
export default Login;