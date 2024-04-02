import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  Modal,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { CheckBox, Input } from "react-native-elements";
import CountryDropdown from "./CountryDropdown";
import Toast from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";

const showToastSuccess = (notice) => {
  Toast.show({
    text1: notice,
    type: "success",
    topOffset: 0,
    position: "top",
  });
};
const showToastError = (notice) => {
  Toast.show({
    text1: notice,
    type: "error",
    topOffset: 0,
    position: "top",
  });
};

const RegisterInfo = ({ navigation, route }) => {
  const [isCheckedUse, setIsCheckedUse] = useState(false);
  const [isCheckedInter, setIsCheckedInter] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalLoginVisible, setModalLoginVisible] = useState(false);
  const [isModalAuthCode, setModalAuthCode] = useState(false);
  const [textPhone, setTextPhone] = useState("");
  const [textEmail, setTextEmail] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [selectedGender, setSelectedGender] = useState("male");
  const [textPW, setTextPW] = useState("");
  const [textRetypePW, setTextRetypePW] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCounting, setIsCounting] = useState(false);

  const inputRefs = useRef([]);


  const { name } = route.params;

  // đếm thời gian giảm dần
  useEffect(() => {
    let timer;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      setIsCounting(false);
    }

    // Xóa interval khi component bị unmount
    return () => clearInterval(timer);
  }, [isCounting, timeLeft]); 


  const SendTime = () => {
    setIsCounting(true);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      return;
    }
  }, [timeLeft]);


  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const maskEmail = (email) => {
    if (email.length <= 2) return email;
    const firstPart = email.substring(0, 2);
    const lastPart = email.substring(email.length - 12);
    const maskedMiddle = "*".repeat(email.length - 14);
    return firstPart + maskedMiddle + lastPart;
  };
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };
  const handleEmailChange = (text) => {
    setTextEmail(text);

  };
  const handleInputChange = (text, index) => {
    const newInputs = [...inputs];
    newInputs[index] = text;
    if (text && index < inputs.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    setInputs(newInputs);
  };


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalAuthCode = () => {
    setModalAuthCode(!isModalAuthCode);
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
      showToastError("Số điện thoại phải từ 8 đến 20 chữ số.");
    }
    else if (!textEmail.trim().toLowerCase().endsWith("@gmail.com")) {
      showToastError("Email phải có định dạng @gmail.com");
    }
    else if (textEmail.length < 15) {
      showToastError("Email phải có ít nhất 15 ký tự");

    }
    else if (!/^[A-Za-z\d@$!%*?&#]{6,}$/.test(textPW)) {
      showToastError("Mật khẩu phải có ít nhất 6 ký tự");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(
        textPW
      )
    ) {
      showToastError("MK chứa ít nhất 1 chữ,1 số,1 ký tự đặc biệt");
    } else if (!(textPW === textRetypePW)) {
      showToastError("Vui lòng nhập xác nhận mật khẩu trùng khớp");
    } else if (!isCheckedInter || !isCheckedUse) {
      showToastError("Vui lòng chấp nhận các điều khoản");
    } else {
      const masked = maskEmail(textEmail);
      setMaskedEmail(masked);
      toggleModal();
    }
  };

  const handleXacNhan = async () => {
    toggleModal();
    setIsLoading(true);
    handlesendAuthCode();
    setIsLoading(false);
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

  const handleCheckAuth = () => {
    if (inputs.some((value) => value === "")) {
      showToastError("Vui lòng nhập đủ mã xác thực");
    }
    else {
      showToastSuccess("Xác thực thành công");
      toggleModalAuthCode();
    }
  }

  const handleSubmit = async (e) => {
    handleCheckAuth()
    // await axiosInstance
    //   .post("/auth/register", {
    //     phone: textPhone,
    //     email:textEmail,
    //     password: textPW,
    //     name: name,
    //     gender: selectedGender
    //   })
    //   .then((response) => {
    //     setIsLoading(true);
    //     toggleModalLogin();
    //   })
    //   .catch((error) => {
    //     if (
    //       error.response &&
    //       (error.response.status === 400 ||
    //         error.response.status === 409 ||
    //         error.response.status === 500)
    //     ) {
    //       showToastError(error.response.data.message);
    //       setIsLoading(false);
    //     } else {
    //       setIsLoading(false);
    //       showToastError("Lỗi");
    //     }
    //   });

  };

  const handlesendAuthCode = async (e) => {
    toggleModalAuthCode();
    SendTime();

  };

  return (
    <View style={styles.container}>
      <View style={styles.toastContainer}>
        <Toast />
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
          id="email"
          value={textEmail}
          placeholder="Email"
          placeholderTextColor={"gray"}
          style={styles.input}
          onChangeText={handleEmailChange}
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
        <Pressable
          onPress={toggleShowRetypePassword}
          style={styles.showHideButton}
        >
          <Text style={styles.showHide}>
            {showRetypePassword ? "Ẩn" : "Hiện"}
          </Text>
        </Pressable>
      </View>


      <View style={styles.radioRow}>
        <Text style={styles.textGender}>Giới tính:</Text>
        <Pressable onPress={() => handleGenderSelect("male")} style={[styles.radioButton, selectedGender === "male"]}>
          <FontAwesome5 name={selectedGender === "male" ? "dot-circle" : "circle"} size={20} color="black" style={{ marginRight: 8 }} />
          <Text style={styles.textGenderOption}>Nam</Text>
        </Pressable>
        <Pressable onPress={() => handleGenderSelect("female")} style={[styles.radioButton, selectedGender === "female"]}>
          <FontAwesome5 name={selectedGender === "female" ? "dot-circle" : "circle"} size={20} color="black" style={{ marginRight: 8 }} />
          <Text style={styles.textGenderOption}>Nữ</Text>
        </Pressable>
        <Pressable onPress={() => handleGenderSelect("other")} style={[styles.radioButton, selectedGender === "other"]}>
          <FontAwesome5 name={selectedGender === "other" ? "dot-circle" : "circle"} size={20} color="black" style={{ marginRight: 8 }} />
          <Text style={styles.textGenderOption}>Khác</Text>
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
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Image
            style={styles.buttonImage}
            source={require("../../../assets/arrow.png")}
          />
        )}
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
              Xác nhận email: {maskedEmail}?
            </Text>
            <Text style={styles.modalText}>
              Email này sẽ được sử dụng để gửi mã xác thực
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
        visible={isModalAuthCode}
        onRequestClose={toggleModalAuthCode}
      >
        <View style={styles.modalContainerAuthCode}>
          <View style={styles.modalAuthCode}>
            <View style={{ backgroundColor: "#E5E7EB", padding: 10 }}>
              <Text style={{ textAlign: "center", color: "#000" }}>
                Vui lòng không chia sẻ mã xác thực để tránh mất tài khoản
              </Text>
            </View>
            <View style={{ flexDirection: "column", flex: 1 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <FontAwesome5 name={"envelope"} size={80} color="black" style={{ marginRight: 8 }} />
                <Text style={{ fontWeight: "bold", color: "#000", marginTop: 10 }}>
                  Đang gửi mã xác thực đến email: {maskedEmail}
                </Text>
              </View>
              <View style={{ flex: 1, padding: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  {inputs.map((value, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                      style={{
                        borderBottomWidth: 2,
                        borderColor: "#ccc",
                        width: 40,
                        marginRight: 5,
                        textAlign: "center",
                      }}
                      keyboardType="numeric"
                      maxLength={1}
                      value={value}
                      onChangeText={(text) => handleInputChange(text, index)}
                    />
                  ))}
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "#888" }}>
                    Gửi lại mã <Text style={{ color: "#0091FF" }}>{timeLeft === 0 ? "0:0" : formatTime(timeLeft)}</Text>
                  </Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Pressable
                    style={{
                      backgroundColor: "#0091FF",
                      width: 120,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 25,
                    }}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Tiếp tục
                    </Text>
                  </Pressable>
                </View>
              </View>
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
            <Text style={styles.modalHeaderText}>Đăng ký thành công!</Text>
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
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#64D6EA",
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
  },
  error: {
    color: "red",
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
    zIndex: 99,
  },
  radioRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 20
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 8,
    paddingRight: 20
  },

  textGender: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 8,
    paddingRight: 20
  },
  textGenderOption: {
    fontSize: 15,
    fontWeight: "400",
    marginVertical: 8,
    paddingRight: 20
  },
  modalContainerAuthCode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalAuthCode: {
    backgroundColor: "#fff",
    width: '80%',
    height: '70%',
    padding: 10,
    borderRadius: 10,
  },
});

export default RegisterInfo;
