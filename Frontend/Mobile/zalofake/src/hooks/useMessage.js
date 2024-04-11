import React from 'react';
import { View, Text, Image } from 'react-native';
import { Video } from 'expo-av';
import Toast from "react-native-toast-message";

const useMessage = () => {

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
  const renderMessageContent = (content) => {
    if (content.type === 'text') {
      return (
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5 }}>
          <Text style={{ fontSize: 18 }}>{content.data}</Text>
        </View>
      );
    } else if (content.type === 'image') {
      return (
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5 }}>
          <Image
            source={{ uri: content.data }}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        </View>
      );
    } else if (content.type === 'video') {
      return (
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5 }}>
          <Video
            source={{ uri: content.data }}

            useNativeControls
            resizeMode="contain"

            style={{ width: 150, height: 150, borderRadius: 10 }}

          />
        </View>
      );
    } else {
      return null; // Loại nội dung không được hỗ trợ
    }
  }
  

  return {
    renderMessageContent,
    showToastError, showToastSuccess,
  };
};

export default useMessage;
