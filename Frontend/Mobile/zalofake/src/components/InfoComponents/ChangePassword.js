import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";
import { TextInput } from "react-native-paper";
import { useAuthContext } from "../../contexts/AuthContext";
import useChangePw from "../../hooks/useChangePw";
import Toast from "react-native-toast-message";

const ChangePassword = ({ navigation, route }) => {
    const { authUser } = useAuthContext();
    const { showToastSuccess, showToastError, changePassword } = useChangePw();

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

    const handleUpdatePassword = async () => {
        if (!oldPassword) {
            showToastError("Vui lòng nhập mật khẩu hiện tại")
        }
        else if (!newPassword) {
            showToastError("Vui lòng nhập mật khẩu mới")
        }
        else if (!/^[A-Za-z\d@$!%*?&#]{6,}$/.test(newPassword)) {
            showToastError("Mật khẩu không hợp lệ");
        } else if (
            !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(
                newPassword
            )
        ) {
            showToastError("MK chứa ít nhất 1 chữ,1 số,1 ký tự đặc biệt");
        }
        else if (!(newPassword === newPassword2)) {
            showToastError("Vui lòng nhập lại mật khẩu trùng khớp");
        }
        else {
            const rs = await changePassword(oldPassword, newPassword);
            if (rs) {
                showToastSuccess("Success")
            }

        }
    }


    return (
        <View style={{ backgroundColor: 'white', height: '100%', alignItems: 'center' }}>
            <View style={styles.toastContainer}>
                <Toast />
            </View>
            <View style={{ width: '90%' }}>
                <View style={[{ height: 75 }, styles.styleCenter]}>
                    <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center' }}>Mật khẩu phải gồm 6 kí tự bao gồm chữ, số hoặc ký tự đặc biệt.</Text>
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
            <Pressable style={[styles.styleButton, styles.styleCenter, { margin: 30 }]} onPress={handleUpdatePassword}>
                <Text style={[styles.styleText, { color: 'white', fontWeight: 'bold' }]}>Cập nhật</Text>
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
        fontWeight: '500',
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
        backgroundColor: '#0091FF',
        height: 45,
        width: '50%',
        borderRadius: 25
    },
    styleIcon: {
        height: '100%',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    toastContainer: {
        zIndex: 99,
    },

};
