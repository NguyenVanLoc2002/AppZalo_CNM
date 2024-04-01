import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";
import { Switch, TextInput } from "react-native-paper";

// CSS styles

const ChangePassword = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                        Đổi mật khẩu
                    </Text>
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
    }, [navigation]);

    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [newPassword2, setNewPassword2] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [buttonText, setButtonText] = useState('Hiện');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setButtonText(showPassword ? 'Hiện' : 'Ẩn');
    };

    return (
        <View style={{ backgroundColor: 'white', height: '100%', alignItems: 'center' }}>
            <View style={{ width: '90%' }}>
                <View style={[{ height: 75 }, styles.styleCenter]}>
                    <Text style={{ fontSize: 16 }}>Mật khẩu phải gồm chữ, số hoặc ký tự đặc biệt; không được chứa năm sinh và tên Zalo của bạn.</Text>
                </View>
                <View style={styles.styleViewBlue}>
                    <Text style={[styles.styleText, styles.styleColorBlue]}>Mật khẩu hiện tại
                    </Text>
                    {/* <Text style={[styles.styleText]}>Hiện</Text> */}
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <View>
                            <Text style={[styles.styleText]}>{buttonText}</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.styleViewGray}>
                    <TextInput style={[styles.styleText, styles.styleColorGray, { width: '90%' }]}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        placeholder="Nhập mật khẩu hiện tại"
                        secureTextEntry={!showPassword}
                    ></TextInput>
                    {oldPassword ? (
                        <Pressable style={styles.styleIcon} onPress={() => setOldPassword(null)}>
                            <Ionicons name="close" size={22} color="gray" />
                        </Pressable>) : null}
                </View>
                <View style={styles.styleViewBlue}>
                    <Text style={[styles.styleText, styles.styleColorBlue]}>Mật khẩu mới</Text>
                </View>
                <View style={styles.styleViewGray}>
                    <TextInput style={[styles.styleText, styles.styleColorGray, { width: '90%' }]}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Nhập mật khẩu mới"
                        secureTextEntry={!showPassword}
                    ></TextInput>
                    {newPassword ? (
                        <Pressable style={styles.styleIcon} onPress={() => setNewPassword(null)}>
                            <Ionicons name="close" size={22} color="gray" />
                        </Pressable>
                    ) : null}
                </View>
                <View style={styles.styleViewGray}>
                    <TextInput style={[styles.styleText, styles.styleColorGray, { width: '90%' }]}
                        value={newPassword2}
                        onChangeText={setNewPassword2}
                        placeholder="Nhập lại mật khẩu mới"
                        secureTextEntry={!showPassword}
                    ></TextInput>
                    {newPassword2 ? (
                        <Pressable style={styles.styleIcon} onPress={() => setNewPassword2(null)}>
                            <Ionicons name="close" size={22} color="gray" />
                        </Pressable>
                    ) : null}
                </View>
            </View>
            <Pressable style={[styles.styleButton, styles.styleCenter, { margin: 30 }]}>
                <Text style={[styles.styleText, { color: 'white' }]}>Cập nhật</Text>
            </Pressable>
        </View>

    );
};

export default ChangePassword;

const styles = {
    styleText: {
        fontSize: 18
    },
    styleColorBlue: {
        color: '#4185ca',
        fontWeight: 'bold'
    },
    styleColorGray: {
        color: 'gray',
        fontWeight: '600',
        backgroundColor: 'white'
    },
    styleCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    styleViewBlue: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40
    },
    styleViewGray: {
        height: 55,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e3e5',
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    styleButton: {
        backgroundColor: '#c0d4e3',
        height: 45,
        width: '50%',
        borderRadius: 25
    },
    styleIcon: {
        height: '100%',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    }

};
