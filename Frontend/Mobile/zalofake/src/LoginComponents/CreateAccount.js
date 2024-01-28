import React, { useState } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";


const CreateAccount = ({ navigation }) => {
    const [textName, setTextName] = useState('');
    const [isValidName, setIsValidName] = useState(false);

    const handleTextChange = (input) => {
        // Kiểm tra nếu input chỉ chứa chữ cái và có độ dài từ 2 đến 40 ký tự bao gồm tiếng việt
        const isValidInput = /^[a-zA-ZđĐàÀáÁâÂấẤầẦẩẨẫẪậẬắẮằẰẳẲẵẴặẶèÈéÉêÊếẾềỂễỆìÌíÍĩĨịỊòÒóÓôÔốỐồỒổỔỗỖộỘùÙúÚũŨụỤủỦưỨỨừỪửỬữỮựỰỳỲýÝỵỴỷỶỹỸ\s]{2,40}$/.test(input);
        setTextName(input);
        if (isValidInput) {
            setIsValidName(true);
        } else {
            setIsValidName(false);
        }
    };
    const handlePressablePress = () => {
        if (isValidName) {
            navigation.navigate("CreateAccount1")
        }
    };

    return (
        <View className={"flex-1  bg-white"}>
            <View className={"m-5"}>
                <Text className={"font-bold text-black text-xl"}>Tên zalo</Text>
                <TextInput
                    onChangeText={handleTextChange}
                    value={textName}
                    placeholder="Gồm 2-40 kí tự" className={"font-semibold placeholder-gray-400 text-lg focus:outline-none mt-5 border-b-[#64D6EA] border-b-[2px]"}></TextInput>
                <Text className={"font-semibold text-blac mt-5"}>Lưu ý khi đặt tên:</Text>
                <Text className={"font-semibold text-black mt-5"}>Không vi phạm <Pressable><Text className={"font-semibold text-blue-500 p-2"}>Quy định đặt tên trên Zalo</Text></Pressable></Text>
                <Text className={"font-semibold text-black "}>Nên sử dụng tên thật để giúp bạn bè dễ nhận ra bạn</Text>
            </View>
            <View className={"flex-1 justify-end items-end m-5"}>
                <Pressable   
                className={
                  "w-[70px] h-[70px] btn rounded-full font-bold text-white items-center justify-center " +
                  `${isValidName ? " bg-[#0091FF]" : " bg-[#BFD3F8]"}`
                }
                disabled={!isValidName} 
                onPress={handlePressablePress}>
                    <View><Image  className={
                  "w-[50px] h-[50px]" } source={require('/assets/arrow.png')} ></Image> 
                    </View>
                    </Pressable>
            </View>

        </View>
    )
};
export default CreateAccount;