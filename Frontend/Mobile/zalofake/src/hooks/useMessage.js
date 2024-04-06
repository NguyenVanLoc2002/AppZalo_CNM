import React from 'react';
import { View, Text, Image } from 'react-native';
// import VideoPlayer from 'react-native-video';
import { Video } from 'expo-av';

const useMessage = () => {
  const renderMessageContent = (message) => {
    if (message.contents[0].type === 'text') {
      return (
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5 }}>
          <Text style={{ fontSize: 18 }}>{message.contents[0].data}</Text>
        </View>
      );
    } else if (message.contents[0].type === 'image') {
      return (
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5 }}>
          <Image
            source={{ uri: message.contents[0].data }}
            style={{ width: 150, height: 150, borderRadius: 10 }}
          />
        </View>
      );
    } else if (message.contents[0].type === 'video') {
      return (
        <View style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 5 }}>
          <Video
            source={{ uri: message.contents[0].data }}

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
    renderMessageContent
  };
};

export default useMessage;
