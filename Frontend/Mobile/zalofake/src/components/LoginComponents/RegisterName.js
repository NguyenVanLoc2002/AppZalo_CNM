import React, { useState } from "react";
import CountryDropdown from "./CountryDropdown";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";

const showToastError = (notice) => {
  Toast.show({
    text1: notice,
    type: "error",
    topOffset: 0,
    position: "top",
  });
};

const RegisterName = ({ navigation }) => {
  const [textName, setTextName] = useState("");
  const [textPhone, setTextPhone] = useState("");
  const [textEmail, setTextEmail] = useState("");
  const handleEmailChange = (text) => {
    setTextEmail(text);
  };

  const handlePhoneChange = (input) => {
    setTextPhone(input);
  };

  const handleNameChange = (input) => {
    setTextName(input);
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
      navigation.navigate("RegisterInfo", { name: textName, textPhone:textPhone, textEmail:textEmail });
    }
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
          Không vi phạm Quy định đặt tên trên Zalo
        </Text>
        <Text style={styles.note}>
          Nên sử dụng tên thật để giúp bạn bè dễ nhận ra bạn
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.validButton]}
          onPress={handlePressablePress}
        >
          <View>
            <Image
              style={styles.buttonIcon}
              source={require("../../../assets/arrow.png")}
            ></Image>
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
  },
  note_title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
  },
  note: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#000",
    marginVertical: 10,
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
