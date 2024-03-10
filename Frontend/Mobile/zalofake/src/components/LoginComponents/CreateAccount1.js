
import React, { useState ,useRef} from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  Modal,
  StyleSheet,
  TouchableOpacity 
} from "react-native";
import { CheckBox } from "react-native-elements";
import CountryDropdown from "./CountryDropdown";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const notify = (notice) => toast.error(notice, {
  style: {
    borderRadius: '8px',
    background: '#fff', 
    color: 'black', 
    fontWeight:500
  },
  iconTheme: {
    primary: 'red', 
    secondary: '#fff', 
  }
});

const notifySuccess = (notice) => toast.success(notice, {
  style: {
    borderRadius: '8px',
    background: '#fff', 
    color: 'black', 
    fontWeight:500
  },
  iconTheme: {
    primary: 'green', 
    secondary: '#fff', 
  }
});

const CreateAccount1 = ({ navigation, route }) => {
  const textInputRef = useRef(null);
  const [isCheckedUse, setIsCheckedUse] = useState(false);
  const [isCheckedInter, setIsCheckedInter] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [textPhone, setTextPhone] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [textPW, setTextPW] = useState("");
  const [textRetypePW, setTextRetypePW] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isCheckedPW, setIsCheckedPW] = useState(false);
  const { name } = route.params;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCheckUse = () => {
    setIsCheckedUse(!isCheckedUse);
    checkPW()
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleCheckInter = () => {
    setIsCheckedInter(!isCheckedInter);
    checkPW()
  };

  const handleTextChange = (input) => {
    setTextPhone(input);
  };
  const handleOnblurPhone = () => {
    const isValidInput = /^[0-9]{8,20}$/.test(textPhone);
    if(!isValidInput){
      notify('Số điện thoại phải từ 8 đến 20 chữ số.')
    }
    setIsValidPhone(isValidInput);
  };

  const handlePressablePress = () => {
    if (isValidPhone && isCheckedInter && isCheckedUse && isCheckedPW) {
      toggleModal();
    }
  };

  const handleXacNhan = () => {
    toggleModal();
    handleSubmit();
   
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
  const handleOutsidePress = () => {
    textInputRef.current.blur();
  };

  const handleOnblurPW = () => {
    setIsFocused(false);
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(textPW)) {
      notify('Mật khẩu phải có ít nhất 6 ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt');
    } else {
      checkPW()
    }
  };
  const handleOnblurRTPW = () => {
    setIsFocused(false);
    checkPW()
  };
  const checkPW = () => {
    if (!(textPW===textRetypePW)) {
      notify('Vui lòng nhập mật khẩu trùng khớp')
      setIsCheckedPW(false);
    } else {   
      setIsCheckedPW(true);
    }
  };


  const handleSubmit = async (e) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        phone: textPhone,
        password: textPW,
        name: name
      });
      // console.log(response.data);
      notifySuccess('Success')
    } catch (error) {
      notify('Error')
    }
  };

  return (
    <TouchableOpacity onPress={handleOutsidePress} activeOpacity={1} style={{flex:1}}>
    <Toaster />
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Nhập số điện thoại của bạn để tạo tài khoản mới
        </Text>
      </View>
     
      <View style={styles.inputContainer}>
        <CountryDropdown />
        <TextInput
          onChangeText={handleTextChange}
          onBlur={handleOnblurPhone}
          value={textPhone}
          placeholder="Nhập số điện thoại"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>

        <TextInput
          id="pw"
          ref={textInputRef}
          secureTextEntry={!showPassword}
          onChangeText={handleTextPWChange}
          value={textPW}
          placeholder="Mật khẩu"
          placeholderTextColor={"gray"}
          style={styles.input}
          onBlur={handleOnblurPW}
          onFocus={handleFocus}
        />
        <Pressable onPress={toggleShowPassword} style={styles.showHideButton}>
          <Text style={styles.showHide}>{showPassword ? "Ẩn" : "Hiện"}</Text>
        </Pressable>

      </View>
      <View style={styles.inputContainer}>
        <TextInput
          id="rtpw"
          ref={textInputRef}
          secureTextEntry={!showRetypePassword}
          onChangeText={handleTextRetypePWChange}
          value={textRetypePW}
          placeholder="Nhập lại mật khẩu"
          placeholderTextColor={"gray"}
          style={styles.input}
          onBlur={handleOnblurRTPW}
          onFocus={handleFocus}
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
            backgroundColor:
              !isValidPhone || !isCheckedInter || !isCheckedUse || !isCheckedPW || isFocused
                ? "#BFD3F8"
                : "#0091FF",
          },
        ]}
        disabled={!isValidPhone || !isCheckedInter || !isCheckedUse || !isCheckedPW || isFocused }
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
              Số điện thoại này sẽ được sử dụng để nhận mã xác thực
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
    </View>
    </TouchableOpacity >
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
});

export default CreateAccount1;
