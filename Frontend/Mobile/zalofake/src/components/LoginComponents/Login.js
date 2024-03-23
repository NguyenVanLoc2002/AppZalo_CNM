import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import useLogin from "../../hooks/useLogin";
import { useAuthContext } from "../../contexts/AuthContext";

const Login = ({ navigation }) => {
  const { login } = useLogin();
  const [textPhone, setTextPhone] = useState("");
  const [textPW, setTextPW] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTextChange = (input) => {
    setTextPhone(input);
  };

  const handleTextPWChange = (input) => {
    setTextPW(input);
  };

  useEffect(() => {
    if (textPhone.length > 0 && textPW.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [textPhone, textPW]);

  const handleLogin = async () => {
    await login(textPhone, textPW);
    navigation.navigate("ChatComponent");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Vui lòng nhập số điện thoại và mật khẩu để đăng nhập
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          id="phone"
          onChangeText={handleTextChange}
          value={textPhone}
          placeholder="Số điện thoại"
          placeholderTextColor={"gray"}
          style={styles.input}
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          { borderBottomColor: isFocused ? "#64D6EA" : "gray" },
        ]}
      >
        <TextInput
          id="pw"
          secureTextEntry={!showPassword}
          onChangeText={handleTextPWChange}
          value={textPW}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Mật khẩu"
          placeholderTextColor={"gray"}
          style={styles.input}
        />
        <Pressable onPress={toggleShowPassword} style={styles.showHideButton}>
          <Text style={styles.showHide}>{showPassword ? "Ẩn" : "Hiện"}</Text>
        </Pressable>
      </View>
      <Pressable style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Lấy lại mật khẩu</Text>
      </Pressable>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.faqButton}>
          <Text style={styles.faq}>Câu hỏi thường gặp</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: isValid ? "#0091FF" : "#BFD3F8" },
          ]}
          disabled={!isValid}
          // onPress={() => navigation.navigate("ChatComponent")}
          onPress={handleLogin}
        >
          <Image
            style={styles.buttonImage}
            source={require("../../../assets/arrow.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 10,
    marginBottom: 10,
    opacity: 0.5,
  },
  headerText: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: 10,
    outlineStyle: "none",
  },
  input: {
    padding: 10,
    fontWeight: "500",
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  showHideButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  showHide: {
    fontWeight: "bold",
    fontSize: 16,
    color: "gray",
  },
  forgotPassword: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  forgotPasswordText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0091FF",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  faqButton: {
    flex: 1,
  },
  faq: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 16,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
});

export default Login;
