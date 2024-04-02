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
  TouchableOpacity,
  FlatList,
  Linking,
} from "react-native";
import { CheckBox } from "react-native-elements";
import CountryDropdown from "./CountryDropdown";
import Toast from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";
import OTPTextView from "react-native-otp-textinput";
import useRegister from "../../hooks/useRegister";
import apiConfig from "../../api/config";

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

  const [timeLeft, setTimeLeft] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  const [otp, setOtp] = useState("");
  const { name } = route.params;
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDay);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [dob, setDob] = useState(new Date());

  const { showToastError, showToastSuccess, getOTP, verifyEmailAndRegister } =
    useRegister();

  // tiến hành gửi mã otp, nếu đã gửi sẽ hiển thị modal cho nhập email
  const pressSendOTP = async (e) => {
    const systemOTP = await getOTP(textEmail);
    if (systemOTP) {
      toggleModal();
      setIsLoading(false);
      handlesendAuthCode();
    }
  };
  // tiến hành gửi lại mã otp, nếu đã gửi sẽ hiển thị modal cho nhập email
  const pressPreSendOTP = async (e) => {
    const systemOTP = await getOTP(textEmail);
    if (systemOTP) {
      setIsLoading(false);
      setTimeLeft(60);
      SendTime();
    }
  };
  // xác thực email và tiến hành đăng ký
  const handleSubmitEmail = async (e) => {
    const response = await verifyEmailAndRegister(
      textEmail,
      otp,
      textPhone,
      name,
      dob,
      selectedGender,
      textPW
    );
    if (response) {
      toggleModalLogin();
    }
  };
  // button khi nhấn vào xác nhận emai để gửi email
  const handleXacNhan = async () => {
    setIsLoading(true);
    pressSendOTP();
  };

  const handlesendAuthCode = async (e) => {
    toggleModalAuthCode();
    setTimeLeft(60);
    SendTime();
  };

  const handleOTPChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  // kiểm tra otp có đầy đủ không
  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      handleSubmitEmail();
    } else {
      showToastError("Hãy nhập đủ mã xác thực");
    }
  };

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
    } else if (!textEmail.trim().toLowerCase().endsWith("@gmail.com")) {
      showToastError("Email phải có định dạng @gmail.com");
    } else if (textEmail.length < 15) {
      showToastError("Email phải có ít nhất 15 ký tự");
    } else if (!/^[A-Za-z\d@$!%*?&#]{6,}$/.test(textPW)) {
      showToastError("Mật khẩu phải có ít nhất 6 ký tự");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(
        textPW
      )
    ) {
      showToastError("MK chứa ít nhất 1 chữ,1 số,1 ký tự đặc biệt");
    } else if (!checkDOB(dob)) {
      showToastError("Bạn phải trên 16 tuổi để đăng ký tài khoản");
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

  // date of birth
  const flatlistRefs = {
    day: useRef(null),
    month: useRef(null),
    year: useRef(null),
  };

  const handleDateSelect = () => {
    const temp = new Date();
    temp.setDate(selectedDate);
    temp.setMonth(selectedMonth - 1);
    temp.setFullYear(selectedYear);
    console.log(temp);
    setDob(temp);
    setShowModal(false);
  };

  const getItemLayout = (data, index) => ({
    length: 40,
    offset: 40 * index,
    index,
  });

  const scrollToIndex = (ref, index) => {
    if (index >= 0 && index < ref.current.props.data.length) {
      ref.current.scrollToIndex({ animated: true, index: index });
    }
  };

  const renderDatePicker = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 122 }, (_, i) => 2024 - i); // Cần điều chỉnh năm tối thiểu tùy theo nhu cầu

    return (
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
            <View style={styles.dateContainer}>
              <FlatList
                ref={flatlistRefs.day}
                data={days}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dateItem,
                      item === selectedDate && styles.selectedItem,
                    ]}
                    onPress={() => {
                      setSelectedDate(item);
                      scrollToIndex(flatlistRefs.day, item - 1);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.toString()}
                numColumns={1} // Chỉ hiển thị một cột
                contentContainerStyle={styles.flatlistContainer}
                getItemLayout={getItemLayout}
              />
              <FlatList
                ref={flatlistRefs.month}
                data={months}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dateItem,
                      item === selectedMonth && styles.selectedItem,
                    ]}
                    onPress={() => {
                      setSelectedMonth(item);
                      scrollToIndex(flatlistRefs.month, item - 1);
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.toString()}
                numColumns={1} // Chỉ hiển thị một cột
                contentContainerStyle={styles.flatlistContainer}
                getItemLayout={getItemLayout}
              />
              <FlatList
                ref={flatlistRefs.year}
                data={years}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dateItem,
                      item === selectedYear && styles.selectedItem,
                    ]}
                    onPress={() => {
                      setSelectedYear(item);
                      scrollToIndex(flatlistRefs.year, years.indexOf(item));
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.toString()}
                numColumns={1} // Chỉ hiển thị một cột
                contentContainerStyle={styles.flatlistContainer}
                getItemLayout={getItemLayout}
              />
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleDateSelect}
            >
              <Text style={styles.confirmText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const checkDOB = (dob) => {
    const currentDate = new Date();
    if (currentDate.getFullYear() - dob.getFullYear() < 16) {
      return false;
    }
    return true;
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
      <View style={styles.inputContainer}>
        <Text style={styles.textGender}>Ngày sinh:</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowModal(true)}
        >
          <Text>
            {selectedDate}/{selectedMonth}/{selectedYear}
          </Text>
        </TouchableOpacity>
        {renderDatePicker()}
      </View>

      <View style={styles.radioRow}>
        <Text style={styles.textGender}>Giới tính:</Text>
        <Pressable
          onPress={() => handleGenderSelect("male")}
          style={[styles.radioButton, selectedGender === "male"]}
        >
          <FontAwesome5
            name={selectedGender === "male" ? "dot-circle" : "circle"}
            size={20}
            color="black"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.textGenderOption}>Nam</Text>
        </Pressable>
        <Pressable
          onPress={() => handleGenderSelect("female")}
          style={[styles.radioButton, selectedGender === "female"]}
        >
          <FontAwesome5
            name={selectedGender === "female" ? "dot-circle" : "circle"}
            size={20}
            color="black"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.textGenderOption}>Nữ</Text>
        </Pressable>
        <Pressable
          onPress={() => handleGenderSelect("other")}
          style={[styles.radioButton, selectedGender === "other"]}
        >
          <FontAwesome5
            name={selectedGender === "other" ? "dot-circle" : "circle"}
            size={20}
            color="black"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.textGenderOption}>Khác</Text>
        </Pressable>
      </View>

      <View style={styles.checkBoxContainer}>
        <CheckBox
          checked={isCheckedUse}
          onPress={handleCheckUse}
          title="Tôi đồng ý với các điều khoản sử dụng Zola"
          containerStyle={styles.checkBox}
          textStyle={styles.checkBoxText}
        />
        <CheckBox
          checked={isCheckedInter}
          onPress={handleCheckInter}
          title="Tôi đồng ý với các điều khoản Mạng xã hội của Zola"
          containerStyle={styles.checkBox}
          textStyle={styles.checkBoxText}
        />

        <Pressable onPress={() => Linking.openURL(apiConfig.baseURL + "/terms_of_service")}>
          <Text style={{ color: "#0091FF", margin:20 }}>
            Điều khoản sử dụng Zola ?
          </Text>
        </Pressable>
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
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.modalButton}>XÁC NHẬN</Text>
                )}
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
                <FontAwesome5
                  name={"envelope"}
                  size={80}
                  color="black"
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={{ fontWeight: "bold", color: "#000", marginTop: 10 }}
                >
                  Đang gửi mã xác thực đến email: {maskedEmail}
                </Text>
              </View>
              <View style={{ flex: 1, padding: 10 }}>
                <View style={styles.otpContainer}>
                  <OTPTextView
                    handleTextChange={handleOTPChange}
                    inputCount={6}
                    keyboardType="numeric"
                    tintColor="#00FF66"
                    offTintColor="#00FFFF"
                    containerStyle={styles.otpContainer}
                    textInputStyle={styles.otpInput}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Pressable onPress={pressPreSendOTP}>
                    <Text style={{ fontWeight: "bold", color: "#888" }}>
                      Gửi lại mã{" "}
                      <Text style={{ color: "#0091FF" }}>
                        {timeLeft === 0 ? "0:0" : formatTime(timeLeft)}
                      </Text>
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Pressable
                    style={{
                      backgroundColor: "#0091FF",
                      width: 120,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 25,
                    }}
                    onPress={handleVerifyOTP}
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
    paddingLeft: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    // marginVertical: 8,
    paddingRight: 20,
  },

  textGender: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 8,
    paddingRight: 20,
  },
  textGenderOption: {
    fontSize: 15,
    fontWeight: "400",
    marginVertical: 8,
    paddingRight: 20,
  },
  modalContainerAuthCode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalAuthCode: {
    backgroundColor: "#fff",
    width: "80%",
    height: "70%",
    padding: 10,
    borderRadius: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#333333",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
  },
  dateButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  modalContainer1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ
  },
  modalContent1: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    height: "40%",
  },
  closeButton: {
    padding: 20,
    alignItems: "flex-end",
  },
  closeButtonText: {
    color: "blue",
    fontSize: 16,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: "40%",
  },
  dateItem: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginHorizontal: 5,
  },
  selectedItem: {
    backgroundColor: "lightblue", // Màu nền khi được chọn
  },
});

export default RegisterInfo;
