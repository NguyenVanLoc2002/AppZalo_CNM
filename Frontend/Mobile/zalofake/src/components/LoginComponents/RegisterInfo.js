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
  Linking
} from "react-native";
import { CheckBox } from "react-native-elements";
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
  const [selectedGender, setSelectedGender] = useState("male");
  const [textPW, setTextPW] = useState("");
  const [textRetypePW, setTextRetypePW] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  const [otp, setOtp] = useState("");
  const { name, textPhone, textEmail } = route.params;


  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState((new Date()).getDate());
  const [selectedMonth, setSelectedMonth] = useState((new Date()).getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState((new Date()).getFullYear());
  const [dob, setDob] = useState(new Date());
  const [isPreSendCode, setIsPreSendCode] = useState(false);

  // date of birth
  const flatlistRefs = {
    day: useRef(null),
    month: useRef(null),
    year: useRef(null),
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 122 }, (_, i) => 2024 - i);
  const {showToastError, showToastSuccess, getOTP, verifyEmailAndRegister } =
    useRegister();

  // tiến hành gửi mã otp, nếu đã gửi sẽ hiển thị modal cho nhập email
  const pressSendOTP = async (e) => {
    const systemOTP = await getOTP(textEmail);
    if (systemOTP) {
      toggleModal();
      setIsLoading(false);
      handlesendAuthCode();
    }else{
      toggleModal();
      setIsLoading(false);
    }
    
  };
  // tiến hành gửi lại mã otp, nếu đã gửi sẽ hiển thị modal cho nhập email
  const pressPreSendOTP = async (e) => {
    setIsLoading(true);
    const systemOTP = await getOTP(textEmail);
    if (systemOTP) {
      setIsLoading(false);
      setTimeLeft(60);
      SendTime();
      setIsPreSendCode(false)
      setIsCounting(true)
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
      toggleModalAuthCode();
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
    setIsPreSendCode(false);
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
      setIsPreSendCode(true);
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


  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setIsLoading(false)
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


  const handlePressablePress = () => {
    if (!/^[A-Za-z\d@$!%*?&#]{6,}$/.test(textPW)) {
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


  const handleDateSelect = () => {
    setShowModal(false);
  };

  const getItemLayout = (data, index) => ({
    length: 40,
    offset: 40 * index,
    index,
  });

  const scrollToIndex = (flatListRef, index) => {
    if (flatListRef && flatListRef.current && index >= 0) {
      flatListRef.current.scrollToIndex({ animated: true, index: index });
    }
  };
  const scrollToFirstPosition = (ref, item) => {
    scrollToIndex(ref, item - 1);
  };
  const handleShowModalDate = () => {
    setShowModal(true)
  };
  useEffect(() => {
    // Kiểm tra xem modal đã được mở hay chưa
    if (showModal) {
      scrollToFirstPosition(flatlistRefs.day, days.indexOf(selectedDate));
      scrollToFirstPosition(flatlistRefs.month, months.indexOf(selectedMonth));
      scrollToFirstPosition(flatlistRefs.year, years.indexOf(selectedYear));
    }
  }, [showModal]);

  const renderDatePicker = () => {
    return (
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer1}>
          <View style={styles.modalContent1}>
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
                      // handleSetDate()
                      dob.setDate(item)
                      scrollToFirstPosition(flatlistRefs.day, item - 1);
                    }}
                  >
                    <Text style={styles.TextDateItem}>{item}</Text>
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
                      // handleSetDate()
                      dob.setMonth(item - 1)
                      scrollToFirstPosition(flatlistRefs.month, item - 1);
                    }}
                  >
                    <Text style={styles.TextDateItem}>{item}</Text>
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
                      // handleSetDate()
                      dob.setFullYear(item)
                      scrollToFirstPosition(flatlistRefs.year, years.indexOf(item));
                    }}
                  >
                    <Text style={styles.TextDateItem}>{item}</Text>
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
    // const currentDate = new Date();
    if (new Date().getFullYear() - dob.getFullYear() < 16) {
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
          onPress={() => handleShowModalDate()
          }
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
          <Text style={{ color: "#0091FF", margin: 20 }}>
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
              Xác nhận email: {textEmail}?
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
                  Đang gửi mã xác thực đến email: {textEmail}
                </Text>
                {isLoading ? (
                  <ActivityIndicator color="blue"/>
                ) : (
                  <Text></Text>
                )}
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
                  <Pressable
                    style={{ flexDirection: 'row', width: '45%', justifyContent: 'space-between', height: 40, alignItems: 'center' }}

                  >
                    <Pressable
                      style={{
                        backgroundColor: isPreSendCode ? '#8a57b6' : 'gray', // Đổi màu nút tùy thuộc vào giá trị của isPreSendCode
                        borderRadius: 10,
                        width: '65%',
                        height: '90%',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onPress={isPreSendCode ? pressPreSendOTP : null} // Kiểm tra isPreSendCode trước khi gọi hàm pressPreSendOTP
                      disabled={!isPreSendCode} // Vô hiệu hóa nút khi isPreSendCode là false
                    >

                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Gửi lại mã</Text>


                    </Pressable>
                    <Text style={{ color: "#0091FF", fontWeight: 'bold' }}>{timeLeft === 0 ? "0:0" : formatTime(timeLeft)}</Text>
                  </Pressable>
                </View>
                <View style={{ justifyContent: "space-evenly", alignItems: "center", flexDirection: 'row' }}>

                  <Pressable
                    style={{
                      backgroundColor: "#0091FF",
                      width: 120,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 25,
                    }}
                    onPress={() => { toggleModalAuthCode() }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Huỷ
                    </Text>
                  </Pressable>

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
    height: "35%",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    height: 120,
    width: '70%'
  },
  dateItem: {

    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  TextDateItem: {

    fontSize: 16,
    fontWeight: 'bold'
  },
  selectedItem: {
    backgroundColor: "lightblue", // Màu nền khi được chọn
  },
  confirmButton: {
    display: 'flex',
    width: 100,
    height: 40,
    backgroundColor: 'cyan',
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
    margin: 'auto'
  },
  confirmText: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default RegisterInfo;
