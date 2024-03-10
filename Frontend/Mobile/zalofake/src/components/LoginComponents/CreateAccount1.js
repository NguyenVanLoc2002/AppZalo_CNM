
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { CheckBox } from "react-native-elements";
import CountryDropdown from "./CountryDropdown";
import Toast from 'react-native-toast-message';
import axiosInstance from '../configs/axiosInstance'

const showToastSuccess = (notice) => {
  Toast.show({
    text1: notice,
    type: 'success',
    topOffset: 0,
    position: 'top',
  });
}
const showToastError = (notice) => {
  Toast.show({
    text1: notice,
    type: 'error',
    topOffset: 0,
    position: 'top',

  });
}

const CreateAccount1 = ({ navigation, route }) => {

  const [isCheckedUse, setIsCheckedUse] = useState(false);
  const [isCheckedInter, setIsCheckedInter] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalLoginVisible, setModalLoginVisible] = useState(false);
  const [textPhone, setTextPhone] = useState("");
  const [textPW, setTextPW] = useState("");
  const [textRetypePW, setTextRetypePW] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const { name } = route.params;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalLogin = () => {
    setModalLoginVisible(!isModalLoginVisible);
  };


  const handleCheckUse = () => {
    setIsCheckedUse(!isCheckedUse);
  };


  const handleCheckInter = () => {
    setIsCheckedInter(!isCheckedInter);
  };

  const handleTextChange = (input) => {
    setTextPhone(input);
  };


  const handlePressablePress = () => {
    if (!/^[0-9]{8,20}$/.test(textPhone)) {
      showToastError('Số điện thoại phải từ 8 đến 20 chữ số.')
    } else if (!/^[A-Za-z\d@$!%*?&#]{6,}$/.test(textPW)) {
      showToastError('Mật khẩu phải có ít nhất 6 ký tự');
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(textPW)) {
      showToastError('MK chứa ít nhất 1 chữ,1 số,1 ký tự đặc biệt');
    } else if (!(textPW === textRetypePW)) {
      showToastError('Vui lòng nhập xác nhận mật khẩu trùng khớp')
    } else if (!isCheckedInter || !isCheckedUse) {
      showToastError('Vui lòng chấp nhận các điều khoản')
    }
    else {
      toggleModal();
    }
  };

  const handleXacNhan = () => {
    toggleModal();
    handleSubmit();
  };

  const handleXacNhanLogin = () => {
    toggleModalLogin();
    navigation.navigate("Login");
  };
  const handleXacNhanLoginMain = () => {
    toggleModalLogin();
    navigation.navigate("LoginMain");
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowRetypePassword = () => {
    setShowRetypePassword(!showRetypePassword);
  };
  const handleTextPWChange = (input) => {
    setTextPW(input);
  };
  const handleTextRetypePWChange = (input) => {
    setTextRetypePW(input);

  };

  const handleSubmit = async (e) => {

      axiosInstance.post('/auth/register', {
        phone: textPhone,
        password: textPW,
        name: name
      }).then(response => {
        console.log(response.data);
        toggleModalLogin()
         // showToastSuccess('Success')
      }).catch (error=> {
      if (error.response && (error.response.status === 400 || error.response.status === 409 || error.response.status === 500)) {
        // Nếu lỗi là 400,409,500 (Conflict), lấy thông điệp từ phản hồi
        showToastError(error.response.data.message);
      } else {
        // Xử lý các lỗi khác
        showToastError('Lỗi');
      }
    })

  };

  return (

    <View style={styles.container}>
      <View style={styles.toastContainer}>
        <Toast
        />
      </View>
      <View style={styles.header}>

        <Text style={styles.headerText}>
          Nhập số điện thoại của bạn để tạo tài khoản mới
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <CountryDropdown />
        <TextInput
          onChangeText={handleTextChange}
          value={textPhone}
          placeholder="Nhập số điện thoại"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>

        <TextInput
          id="pw"
          secureTextEntry={!showPassword}
          onChangeText={handleTextPWChange}
          value={textPW}
          placeholder="Mật khẩu"
          placeholderTextColor={"gray"}
          style={styles.input}
        />
        <Pressable onPress={toggleShowPassword} style={styles.showHideButton}>
          <Text style={styles.showHide}>{showPassword ? "Ẩn" : "Hiện"}</Text>
        </Pressable>

      </View>
      <View style={styles.inputContainer}>
        <TextInput
          id="rtpw"
          secureTextEntry={!showRetypePassword}
          onChangeText={handleTextRetypePWChange}
          value={textRetypePW}
          placeholder="Nhập lại mật khẩu"
          placeholderTextColor={"gray"}
          style={styles.input}
        />
        <Pressable onPress={toggleShowRetypePassword} style={styles.showHideButton}>
          <Text style={styles.showHide}>{showRetypePassword ? "Ẩn" : "Hiện"}</Text>
        </Pressable>
      </View>

      <View style={styles.checkBoxContainer}>
        <CheckBox
          checked={isCheckedUse}
          onPress={handleCheckUse}
          title="Tôi đồng ý với các điều khoản sử dụng Zalo"
          containerStyle={styles.checkBox}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          checked={isCheckedInter}
          onPress={handleCheckInter}
          title="Tôi đồng ý với các điều khoản Mạng xã hội của Zalo"
          containerStyle={styles.checkBox}
          textStyle={styles.checkBoxText}
        />
      </View>
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: "#0091FF",
          },
        ]}
        onPress={handlePressablePress}
      >
        <Image
          style={styles.buttonIcon}
          source={require("../../../assets/arrow.png")}
        />
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>
              Xác nhận số điện thoại (+84){textPhone} ?
            </Text>
            <Text style={styles.modalText}>
              Số điện thoại này sẽ được sử dụng để đăng ký tài khoản
            </Text>
            <View style={styles.modalButtonContainer}>
              <Pressable onPress={toggleModal}>
                <Text style={styles.modalButton}>HỦY</Text>
              </Pressable>
              <Pressable onPress={handleXacNhan}>
                <Text style={styles.modalButton}>XÁC NHẬN</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalLoginVisible}
        onRequestClose={toggleModalLogin}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>
              Đăng ký thành công!

            </Text>
            <Text style={styles.modalText}>
              Bạn muốn về trang chủ hay trang đăng nhập?
            </Text>

            <View style={styles.modalButtonContainer}>
              <Pressable onPress={handleXacNhanLoginMain}>
                <Text style={styles.modalButton}>Trang chủ</Text>
              </Pressable>
              <Pressable onPress={handleXacNhanLogin}>
                <Text style={styles.modalButton}>Đăng nhập</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#ddd",
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    margin: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#64D6EA",
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    paddingLeft: 20,
    fontSize: 16,
  },
  checkBoxContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  checkBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  checkBoxText: {
    fontWeight: "normal",
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#BFD3F8",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonIcon: {
    width: 40,
    height: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: 300,
    padding: 20,
    borderRadius: 10,
  },
  modalHeaderText: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalButton: {
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#0091FF",
  },
  toastContainer: {
    zIndex: 99
  }
});

export default CreateAccount1;
