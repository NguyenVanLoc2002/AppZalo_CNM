import React from 'react';
import { View, Text, Image } from 'react-native';
import { Video } from 'expo-av';
import Toast from "react-native-toast-message";
// import Pdf from 'react-native-pdf';
// import { openDocumentAsync } from 'expo-document-viewer';
// import { WebView } from 'react-native-webview';
import PDFReader from 'rn-pdf-reader-js';
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
        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          <Video
            source={{ uri: content.data }}

            useNativeControls
            resizeMode="contain"

            style={{ width: 200, height: 200, borderRadius: 10 }}

          />
        </View>
      );
    } else if (content.type === 'file') {
      return (

        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          {console.log(content.data)}
          {/* {content.data!==null?(<PDFReader
          source={{ uri: content.data }}
           /> ):(<Text></Text>)

          } */}
          {/*  */}
        </View>

      );
    } else {
      return null; // Loại nội dung không được hỗ trợ
    }
  }
  const renderMessageContentReply = (content) => {
    if (content.type === 'text') {
      return (
        <View style={{ paddingLeft: 25, paddingRight: 15, paddingTop: 5 }}>
          <Text style={{ fontSize: 14 }}>{content.data}</Text>
        </View>
      );
    } else if (content.type === 'image') {
      return (
        <View style={{ paddingLeft: 30, paddingTop: 5 }}>
          <Image
            source={{ uri: content.data }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
        </View>
      );
    } else if (content.type === 'video') {
      return (
        <View style={{ paddingLeft: 30, marginBottom: -15, marginTop: -10 }}>
          <Video
            source={{ uri: content.data }}

            useNativeControls
            resizeMode="contain"

            style={{ width: 120, height: 120, borderRadius: 10 }}

          />
        </View>
      );
    }
    else if (content.type === 'file') {
      return (
        <WebView
          source={{ uri: content.data }}
          style={{ flex: 1 }}
        />
        // <Video
        // source={{ uri: content.data  }}
        // resizeMode="contain"
        // useNativeControls
        // style={{ flex: 1 }}
        // />
      );
    }
    else {
      return null; // Loại nội dung không được hỗ trợ
    }
  }


  return {
    renderMessageContent,
    showToastError, showToastSuccess, renderMessageContentReply
  };
};

export default useMessage;
