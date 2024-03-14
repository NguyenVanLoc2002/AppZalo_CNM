
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

const CreateAccount1 = ({ navigation }) => {
  const [isCheckedUse, setIsCheckedUse] = useState(false);
  const [isCheckedInter, setIsCheckedInter] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [textPhone, setTextPhone] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCheckUse = () => {
    setIsCheckedUse(!isCheckedUse);
  };

  const handleCheckInter = () => {
    setIsCheckedInter(!isCheckedInter);
  };

  const handleTextChange = (input) => {
    const isValidInput = /^[0-9]{8,20}$/.test(input);

    setTextPhone(input);
    setIsValidPhone(isValidInput);
  };

  const handlePressablePress = () => {
    if (isValidPhone && isCheckedInter && isCheckedUse) {
      toggleModal();
    }
  };

  const handleXacNhan = () => {
    toggleModal();
    navigation.navigate("EnterAuthCode");
  };

  return (
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
          value={textPhone}
          placeholder="Nhập số điện thoại"
          style={styles.input}
        />
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
              !isValidPhone || !isCheckedInter || !isCheckedUse
                ? "#BFD3F8"
                : "#0091FF",
          },
        ]}
        disabled={!isValidPhone || !isCheckedInter || !isCheckedUse}
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
