import React, { useState } from "react";
import CountryDropdown from "./CountryDropdown";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import Toast from "react-native-toast-message";
import useRegister from "../../hooks/useRegister";


const RegisterName = ({ navigation }) => {
  const [textName, setTextName] = useState("");
  const [textPhone, setTextPhone] = useState("");
  const [textEmail, setTextEmail] = useState("");
  const { showToastError, checkMail } = useRegister();
  const [isLoading, setIsLoading] = useState(false);
  const [checkValid, setCheckValid]=useState(false);
  const handleEmailChange = (text) => {
    setTextEmail(text);
    check(textName, textPhone,text);
  };


  const handlePhoneChange = (input) => {
    setTextPhone(input);
    check(textName, input,textEmail);
  };

  const handleNameChange = (input) => {
    setTextName(input);
    check(input, textPhone,textEmail);
  };
  const handlePressablePress = () => {
    if (!/^([a-zA-Zá-ỹÁ-Ỹ\s]{2,40})$/.test(textName)) {
      showToastError("Vui lòng nhập tên là chữ và ít nhất 2 kí tự");
    }
    else if (!/^[0-9]{8,20}$/.test(textPhone)) {
      showToastError("Số điện thoại phải từ 8 đến 20 chữ số.");
    } else if (!textEmail.trim().toLowerCase().endsWith("@gmail.com")) {
      showToastError("Email phải có định dạng @gmail.com");
    } else if (textEmail.length < 15) {
      showToastError("Email phải có ít nhất 15 ký tự");
    } else {
      pressSendOTP();
    }
  };
  const check = (name,phone,email) => {
    if (!/^([a-zA-Zá-ỹÁ-Ỹ\s]{2,40})$/.test(name)) {
      setCheckValid(false)
    }
    else if (!/^[0-9]{8,20}$/.test(phone)) {
      setCheckValid(false)
    } else if (!email.trim().toLowerCase().endsWith("@gmail.com")) {
      setCheckValid(false)
    } else if (email.length < 15) {
      setCheckValid(false)
    } else {
      setCheckValid(true)
    }
  };

  const pressSendOTP = async (e) => {
    setIsLoading(true)
    const systemOTP = await checkMail(textEmail);
    if (systemOTP) {
      setIsLoading(false)
      navigation.navigate("RegisterInfo", { name: textName, textPhone: textPhone, textEmail: textEmail });
    }
    setIsLoading(false)


  };

  return (
    <View style={styles.container}>
      <View style={styles.toastContainer}>
        <Toast />
      </View>
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={handleNameChange}
            value={textName}
            placeholder="Tên"
            style={styles.input}
          ></TextInput>
        </View>
        <View style={styles.inputContainerPhone}>
          <CountryDropdown />
          <TextInput
            onChangeText={handlePhoneChange}
            value={textPhone}
            placeholder="Nhập số điện thoại"
            style={styles.input}
            keyboardType="numeric"
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
        <Text style={styles.note_title}>Lưu ý khi đặt tên:</Text>
        <Text style={styles.note}>
          Nên sử dụng tên thật để giúp bạn bè dễ nhận ra bạn
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, checkValid ? styles.validButton : styles.invalidButton]}
          disabled={!checkValid}
          onPress={handlePressablePress}
        >
          <View>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Image
                style={styles.buttonIcon}
                source={require("../../../assets/arrow.png")}
              ></Image>
            )}

          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#64D6EA",
  },
  inputContainerPhone: {
    flexDirection: "row",
    margin: 10,
    marginTop: -10,
    borderBottomWidth: 2,
    borderBottomColor: "#64D6EA",
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    marginVertical: 10,
  },
  note_title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
    paddingLeft: 20,
    marginVertical: 15,
  },
  note: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#000",
    marginVertical: 15,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 5,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  validButton: {
    backgroundColor: "#0091FF",
  },
  invalidButton: {
    backgroundColor: "#BFD3F8",
  },
  buttonIcon: {
    width: 50,
    height: 50,
  },
  toastContainer: {
    zIndex: 99,
  },
});

export default RegisterName;
