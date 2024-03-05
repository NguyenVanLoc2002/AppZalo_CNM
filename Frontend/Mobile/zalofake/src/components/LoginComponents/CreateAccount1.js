import React, { useState } from 'react';
import { View, Text, Pressable, Image, TextInput, Modal } from "react-native";
import { CheckBox } from 'react-native-elements';
import CountryDropdown from './CountryDropdown'


const CreateAccount1 = ({ navigation }) => {
    const [isCheckedUse, setIsCheckedUse] = useState(false);
    const [isCheckedInter, setIsCheckedInter] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [textPhone, setTextPhone] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const handleCheckUse = () => {
        setIsCheckedUse(!isCheckedUse);
    };
    const handleCheckInter = () => {
        setIsCheckedInter(!isCheckedInter);
    };

    const handleTextChange = (input) => {

        const isValidInput = /^[0-9]{8,20}$/.test(input);

        setTextPhone(input);
        if (isValidInput) {
            setIsValidPhone(true);
        } else {
            setIsValidPhone(false);
        }
    };
    const handlePressablePress = () => {
        if (isValidPhone && isCheckedInter && isCheckedUse) {
            toggleModal()
        }
    };
    const handleXacNhan = () => {

        toggleModal();
        navigation.navigate("EnterAuthCode");
    };


    return (
        <View className={"flex-1  bg-white"}>
            <View className={"bg-gray-200"}><Text className={"font-bold text-black-400 p-2 text-center"}>Nhập số điện thoại của bạn để tạo tài khoản mới</Text></View>
            <View className={"flex flex-row m-5 border-b-[#64D6EA] border-b-[2px]"} >
                <CountryDropdown />
                <TextInput
                    onChangeText={handleTextChange}
                    value={textPhone}
                    placeholder="Nhập số điện thoại" className={"pl-3 font-semibold placeholder-gray-400 text-lg focus:outline-none "}></TextInput>

            </View>
            <View className={"flex flex-col"}>
                <CheckBox
                    checked={isCheckedUse}
                    onPress={handleCheckUse}
                    title={
                        <View className={'flex-row'}>
                            <Text className={"font-medium text-black "}>
                                Tôi đồng ý với các <Text className={"font-medium text-sky-400 "}>
                                    điều khoản sử dụng Zalo
                                </Text></Text>
                        </View>
                    }
                />
                <CheckBox
                    checked={isCheckedInter}
                    onPress={handleCheckInter}
                    title={
                        <View className={'flex-row'}>
                            <Text className={"font-medium text-black "}>
                                Tôi đồng ý với các <Text className={"font-medium text-sky-400 "}>
                                    điều khoản Mạng xã hội của Zalo
                                </Text></Text>
                        </View>
                    }
                />

            </View>
            <View className={"flex-1 justify-end items-end m-5"}>
                <Pressable
                    className={
                        "w-[70px] h-[70px] btn rounded-full font-bold text-white items-center justify-center " +
                        `${!isValidPhone || !isCheckedInter || !isCheckedUse ? " bg-[#BFD3F8]" : " bg-[#0091FF]"}`}
                    disabled={!isValidPhone || !isCheckedInter || !isCheckedUse} onPress={handlePressablePress}
                >
                    <View><Image className={"w-[50px] h-[50px]"} source={require('/assets/arrow.png')} ></Image>
                    </View></Pressable>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}>
                <View className={'flex-1 justify-center items-center bg-black bg-opacity-50'}>
                    <View className={"bg-white w-60"}>
                        <View className={"border-b-gray-400 border-b-[1px]"}>
                            <Text className={"font-bold text-black-400 text-left m-3"}>Xác nhận số điện thoại (+84){textPhone} ?</Text>
                        </View>
                        <View>
                            <Text className={"font-normal text-black-400 text-left m-3"}>Số điện thoại này sẽ được sử dụng để nhận mã xác thực</Text>
                        </View>
                        <View className={"flex-end flex-row justify-end"} >
                            <Pressable onPress={toggleModal} ><Text className={"font-bold text-black-400 text-center m-2"} >HỦY</Text></Pressable>
                            <Pressable
                                onPress={handleXacNhan}
                            ><Text className={"font-bold text-sky-400 text-center m-2"}>XÁC NHẬN</Text></Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
};
export default CreateAccount1;