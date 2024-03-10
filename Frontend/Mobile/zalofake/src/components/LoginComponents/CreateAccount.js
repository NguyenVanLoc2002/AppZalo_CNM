
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import Toast from 'react-native-toast-message';

const showToastError = (notice) => {
  Toast.show({
    text1: notice,
    type:'error',
    topOffset: 0,
    position: 'top',
 
  });
}

const CreateAccount = ({ navigation }) => {
  const [textName, setTextName] = useState("");
 

  const handleTextChange = (input) => {

    setTextName(input);

  };
  const handlePressablePress = () => {
    if (/^([a-zA-Zá-ỹÁ-Ỹ\s]{2,40})$/.test(textName)) {
      navigation.navigate("CreateAccount1", { name: textName });
    }else{
      showToastError('Vui lòng nhập tên là chữ và ít nhất 2 kí tự');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.toastContainer}>
        <Toast
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên zalo</Text>
        <TextInput
          onChangeText={handleTextChange}
          value={textName}
          placeholder="Gồm 2-40 kí tự"
          style={styles.input}
        ></TextInput>
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
          style={[
            styles.button,styles.validButton
          ]}
         
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
    margin: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    fontSize: 16,
    borderColor: "#64D6EA",
    borderBottomWidth: 1,
    marginBottom: 20,
    height: 40,
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
  toastContainer:{
    zIndex:99
  }
});

export default CreateAccount;
