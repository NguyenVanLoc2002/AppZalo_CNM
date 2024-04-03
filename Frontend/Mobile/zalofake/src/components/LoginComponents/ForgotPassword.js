import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import useForgot from "../../hooks/useForgot";
import OTPTextView from 'react-native-otp-textinput';



const ForgotPassword = ({ navigation }) => {
  const [textEmail, setTextEmail] = useState(null);
  const [modalXacNhan, setModalXacNhan] = useState(false);
  const [modalOTP, setModalOTP] = useState(false);
  const [modelSuccess, setModalSuccess] = useState(false)
  const [modalCreatePw, setModalCreatePw] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  const [newPassword, setNewPassword] = useState(null);
  const [newPassword2, setNewPassword2] = useState(null);
  const [buttonText, setButtonText] = useState('Hiện');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { getOTP, showToastError, resetPassword, check_mail, handleOTP } = useForgot();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setButtonText(showPassword ? 'Hiện' : 'Ẩn');
  };

  // tiến hành gửi mã otp, nếu đã gửi sẽ hiển thị modal xác thực email
  const pressSendOTP = async (e) => {
    const systemOTP = await getOTP(textEmail);
    if (systemOTP) {
      setModalXacNhan(!modalXacNhan)
      setModalOTP(!modalOTP)
      setIsLoading(false);
      handlesendAuthCode();
    }
  };
  // tiến hành gửi lại mã otp, nếu đã gửi sẽ hiển thị modal cho nhập email
  const pressPreSendOTP = async (e) => {
    const systemOTP = await getOTP(textEmail);
    if (systemOTP) {

      setIsLoading(false);
      setTimeLeft(60)
      SendTime();
    }
  };

  const handleNext = async () => {
    if (!textEmail) {
      showToastError("Vui lòng nhập gmail")
    } else {
      const sendEmail = await check_mail(textEmail);
      if (!sendEmail) {
        showToastError("Invalid email")
        return;
      }
      // setModalCreatePw(!modalCreatePw)

      setModalXacNhan(!modalXacNhan);
    }
  }

  const handleXacNhan = async () => {
    setIsLoading(true);
    pressSendOTP()
  };

  const handlesendAuthCode = async (e) => {
    setTimeLeft(60)
    SendTime();
  };

  const handleOTPChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };
  // kiểm tra otp có đầy đủ không
  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      handleSubmit()
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

  const handleSubmit = async (e) => {
    const response = await handleOTP(otp);
    if (response) {
      setModalOTP(!modalOTP)
      setModalSuccess(!modelSuccess)
    }

  };

  const handleResetPassword = async () => {
    if (!newPassword) {
      alert("Vui lòng nhập mật khẩu mới")
    }
    else if (!/^[A-Za-z\d@$!%*?&#]{6,}$/.test(newPassword)) {
      alert("Mật khẩu phải có ít nhất 6 ký tự,chứa ít nhất 1 chữ,1 số,1 ký tự đặc biệt");
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(
        newPassword
      )
    ) {
      alert("MK chứa ít nhất 1 chữ,1 số,1 ký tự đặc biệt");
    }
    else if (!(newPassword === newPassword2)) {
      alert("Vui lòng nhập lại mật khẩu trùng khớp");
    }
    else {
      const rs = await resetPassword(textEmail, newPassword);
      if (rs) {
        alert("Success")
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewText}>
        <Text style={{ fontSize: 16 }}>Nhập gmail để lấy lại mật khẩu</Text>
      </View>
      <View style={styles.viewTextInput}>
        <TextInput
          value={textEmail}
          onChangeText={setTextEmail}
          placeholder="Nhập gmail"
          style={[styles.styleText, { width: '90%' }]}
        >
        </TextInput>
        <Pressable style={styles.styleIcon} onPress={() => setTextEmail(null)}>
          <Ionicons name="close" size={22} color="gray" />
        </Pressable>
      </View>
      <Pressable style={styles.styleButton} onPress={handleNext}>
        <Text style={[styles.styleText, { color: 'white', fontWeight: 'bold' }]}>Tiếp tục</Text>
      </Pressable>

      <View>
        {/* Modal xác nhận gmail */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalXacNhan}
          onRequestClose={() => {
            setModalXacNhan(!modalXacNhan);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={[{ fontWeight: 'bold', textAlign: 'center' }, styles.styleText]}>Xác nhận {textEmail} gmail ?</Text>
              <Text style={{ textAlign: 'center' }}>Gmail này sẽ được sử dụng để nhận mã xác thực</Text>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                <Pressable style={[styles.pressCancel, { borderRightWidth: 2, borderRightColor: '#e0e3e5' }]} onPress={() => { setModalXacNhan(!modalXacNhan) }}>
                  <Text style={styles.textCancel}>Huỷ</Text>
                </Pressable>
                <Pressable style={styles.pressCancel} onPress={handleXacNhan} >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.textCancel}>Xác nhận</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {/* Modal nhập mã OTP */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalOTP}
        onRequestClose={() => { setModalOTP(!modalOTP) }}
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
                  Đang gửi mã xác thực đến email: {textEmail}
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
                  <Pressable style={{flexDirection: 'row', width: '45%', justifyContent: 'space-between', height: 30, alignItems: 'center' }}>
                    <Pressable onPress={pressPreSendOTP} style={{backgroundColor: '#8a57b6',borderRadius: 10, width: '65%', height: '90%', alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{  color: 'white', fontWeight: 'bold' }}>Gửi lại mã </Text>
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
                    onPress={() => (setModalOTP(!modalOTP))}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Trở về
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

      {/* Modal Success */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modelSuccess}
        onRequestClose={() => { setModalSuccess(!modelSuccess) }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <View style={{ backgroundColor: '#0091FF', width: '100%', height: 90, justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 16, padding: 10, color: 'white', fontWeight: 'bold' }}>Tạo mật khẩu mới</Text>
          </View>
          <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
            <View>
              <Ionicons name={"checkmark-circle-sharp"} size={80} color="#00ce3a" style={{ marginRight: 8 }} />
            </View>
            <Text style={styles.modalHeaderText}>Đăng nhập thành công!</Text>
            <Text style={styles.modalText}>
              Bây giờ bạn có thể tạo lại mật khẩu mới. Tài khoản và mật khẩu này dùng để đăng nhập trên bất kỳ thiết bị nào.
            </Text>

            <View style={styles.modalButtonContainer}>
              <Pressable style={styles.buttonCreatePass} onPress={() => { setModalSuccess(!modelSuccess); setModalCreatePw(!modalCreatePw) }}>
                <Text style={styles.modalButton}>Tạo mật khẩu</Text>
              </Pressable>
              <Pressable style={styles.buttonCreatePass} onPress={() => { setModalSuccess(!modelSuccess) }}>
                <Text style={styles.modalButton}>Back</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Create Password */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalCreatePw}
        onRequestClose={() => { setModalCreatePw(!modalCreatePw) }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          <View style={{ backgroundColor: '#0091FF', width: '100%', height: 90, justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 16, paddingHorizontal: 20, paddingVertical: 10, color: 'white', fontWeight: 'bold' }}>Tạo mật khẩu mới</Text>
          </View>
          <View style={{ alignItems: 'center', paddingHorizontal: 20, backgroundColor: 'white' }}>
            <View style={styles.viewTextPwNew}>
              <Text style={[styles.styleText, styles.textBlue]}>Mật khẩu mới
              </Text>
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <View>
                  <Text style={[styles.styleText, styles.textGray]}>{buttonText}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.styleViewGray}>
              <TextInput style={[styles.styleText, styles.styleColorGray, { width: '90%' }]}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Nhập mật khẩu mới"
                placeholderTextColor="gray"
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
                placeholderTextColor="gray"
                secureTextEntry={!showPassword}
              ></TextInput>
              {newPassword2 ? (
                <Pressable style={styles.styleIcon} onPress={() => setNewPassword2(null)}>
                  <Ionicons name="close" size={22} color="gray" />
                </Pressable>
              ) : null}
            </View>
            <Pressable style={[styles.styleButton, styles.styleCenter, { margin: 30 }]} onPress={handleResetPassword}>
              <Text style={[styles.styleText, { color: 'white', fontWeight: 'bold' }]}>Cập nhật</Text>
            </Pressable>

            <Pressable style={styles.buttonCreatePass} onPress={() => { setModalCreatePw(!modalCreatePw) }}>
              <Text style={styles.modalButton}>Back</Text>
            </Pressable>

          </View>
        </View>
      </Modal >

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center'
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#333333',
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 5,
  },
  styleText: {
    fontSize: 18
  },
  styleCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewText: {
    width: '90%',
    height: 45,
    justifyContent: 'center'
  },
  viewTextInput: {
    marginTop: 10,
    width: '90%',
    height: 60,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#26d0f5',
    flexDirection: 'row',
  },
  styleButton: {
    backgroundColor: '#0091FF',
    height: 45,
    width: '50%',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    width: 300,
    height: 180,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pressCancel: {
    width: '50%',
    height: 40,
    borderTopWidth: 2,
    borderTopColor: '#e0e3e5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCancel: {
    color: '#0091FF',
    fontWeight: '600',
    fontSize: 16
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
    paddingBottom: 45
  },
  modalHeaderText: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10
  },
  modalText: {
    marginVertical: 20,
    marginHorizontal: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtonContainer: {
    justifyContent: "flex-end",
    width: '80%',
    alignItems: 'center'
  },
  modalButton: {
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "white",
    fontSize: 16
  },
  buttonCreatePass: {
    width: '80%',
    height: 45,
    backgroundColor: '#0091FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  styleButtonCreatePw: {
    backgroundColor: '#c0d4e3',
    height: 45,
    width: '50%',
    borderRadius: 25
  },
  viewTextPwNew: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    height: 55,
    alignItems: 'center'
  },
  textBlue: {
    color: '#4185ca',
    fontWeight: 'bold'
  },
  textGray: {
    color: 'gray',
    fontWeight: 'bold'
  },
  styleViewGray: {
    width: '90%',
    height: 55,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e3e5',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleIcon: {
    height: '100%',
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  styleColorGray: {
    color: 'gray',
    fontWeight: '600',
    backgroundColor: 'white'
  },
});

export default ForgotPassword;
