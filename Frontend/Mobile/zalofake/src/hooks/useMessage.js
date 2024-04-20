import React from 'react';
import { View, Text, Image } from 'react-native';
import { Video } from 'expo-av';
import Toast from "react-native-toast-message";
import moment from 'moment-timezone';
// import Pdf from 'react-native-pdf';
// import { openDocumentAsync } from 'expo-document-viewer';
// import { WebView } from 'react-native-webview';
// import PDFReader from 'rn-pdf-reader-js';

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
          {/* {console.log(content.data)} */}
          {/* {content.data!==null?(<PDFReader
          source={{ uri: content.data }}
           /> ):(<Text></Text>)

          }  */}
        </View>

      );
    } else {
      return null; // Loại nội dung không được hỗ trợ
    }
  }
  const renderMessageContentReply = (content) => {
    if (content.type === 'text') {
      return (
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={{ fontSize: 14 }}>{content.data}</Text>
        </View>
      );
    } else if (content.type === 'image') {
      return (
        <View style={{ paddingLeft: 10 }}>
          <Image
            source={{ uri: content.data }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
        </View>
      );
    } else if (content.type === 'video') {
      return (
        <View style={{ paddingLeft: 10 }}>
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
  const handleGetTimeInChat = (time) => {
    const currentTime = moment().tz('Asia/Ho_Chi_Minh'); // Lấy thời gian hiện tại ở múi giờ Việt Nam
    const vietnamDatetime = moment(time).tz('Asia/Ho_Chi_Minh'); // Chuyển đổi thời gian đã cho sang múi giờ Việt Nam
    const timeDifference = moment.duration(currentTime.diff(vietnamDatetime)); // Tính khoảng cách thời gian

    const days = Math.floor(timeDifference.asDays()); // Số ngày
    const hours = Math.abs(timeDifference.hours()); // Số giờ (dương)
    const minutes = Math.abs(timeDifference.minutes()); // Số phút (dương)
    const seconds = Math.abs(timeDifference.seconds()); // Số giây (dương)

    if (days >= 1) {
      return `${days} ngày`;
    }
    else if (hours >= 1) {
      return `${hours} giờ`;
    }
    else if (minutes >= 1) {
      return `${minutes} phút`;
    }
    else {
      return `${seconds} giây`;
    }
  }
  const handleGetTimeInMessage = (time) => {
    const vietnamDatetime = moment(time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    const dateObject = new Date(vietnamDatetime)
    return `${dateObject.getHours()}:${dateObject.getMinutes()}`
  };

  return {
    renderMessageContent,
    showToastError,
    showToastSuccess,
    renderMessageContentReply,
    handleGetTimeInChat,
    handleGetTimeInMessage
  };
};

export default useMessage;
