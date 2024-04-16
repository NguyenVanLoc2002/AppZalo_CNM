import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView, ActivityIndicator, Modal,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../../api/axiosInstance";
import moment from 'moment-timezone';
import useMessage from '../../../hooks/useMessage'
import Toast from "react-native-toast-message";
import useSendMessage from "../../../hooks/useSendMessage";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSocketContext } from "../../../contexts/SocketContext"
import useCreateGroup from "../../../hooks/useCreateGroup";
import { useAuthContext } from "../../../contexts/AuthContext";
import * as DocumentPicker from 'expo-document-picker';

const Message = ({ navigation, route }) => {
  const { conver } = route.params;
  const { getUserById, getAllGroup } = useCreateGroup()
  const { authUser } = useAuthContext();
  //nhi  
  const [textMessage, setTextMessage] = useState(null)
  const [isColorSend, setIsColorSend] = useState(false)
  const { sendMessage, sendImage, sendVideo, sendFiles } = useSendMessage();
  const { socket } = useSocketContext()

  //truc
  const [chats, setChats] = useState([]);
  const scrollViewRef = useRef();
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { renderMessageContent, renderMessageContentReply, showToastSuccess, showToastError } = useMessage();
  const [isModalVisible, setModalVisible] = useState(false);
  const [messageSelected, setMessageSelected] = useState("");
  const [isModalFriendVisible, setIsModalFriendVisible] = useState(false);
  const [friends, setFriends] = useState([]);
  const [isLoadMess, setIsLoadMess] = useState(false)
  const [isLoadChuyenTiep, setIsLoadChuyenTiep] = useState(false)
  const [isLoadThuHoi, setIsLoadThuHoi] = useState(false)
  const [isLoadXoa, setIsLoadXoa] = useState(false)
  const [replyChat, setReplyChat] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const pickFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync();
      if (file.canceled === false) {
        setSelectedFile(file);

        setIsLoadMess(true)
        let isGroup = false
        if (conver.tag === "group") {
          isGroup = true
        }
        let replyId = null;
        if (replyChat !== null) {
          replyId = replyChat.chat._id
        }
        for (const asset of file.assets) {

          const formData = new FormData();
          const fileName = asset.uri.split('/').pop();
          formData.append('data[]', {
            uri: asset.uri,
            name: fileName,
            type: 'file/pdf', // Sử dụng 'application/pdf' cho loại tệp PDF
          });

          formData.append('isGroup', isGroup);
          formData.append('replyMessageId', replyId);
          
          try {
            const response = await sendFiles(conver._id, formData)
            if (response.status === 201) {
              setIsLoadMess(false)
              setIsLoad(false)
              fetchChats();
              scrollToEnd();
              setReplyChat(null);
              console.log("send file success");
            }
            else if (response.status === 500) {
              console.log("send file fail");
            }
          } catch (error) {
            console.log(error);
            setIsLoadMess(false)
          }

        }

      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalFriend = () => {
    setIsModalFriendVisible(!isModalFriendVisible);
  };
  const fetchFriends = async () => {
    let data = []
    try {
      const response = await axiosInstance.get('/users/get/friends');
      const newFriend = await Promise.all(response.data.friends.map(async (friend) => {
        return {
          _id: friend.userId,
          name: friend.profile.name,
          avatar: friend.profile.avatar.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
          tag: 'friend'
        }
      }))
      data.push(...newFriend)
    } catch (error) {
      console.log("FetchGroupError: ", error);
    }
    try {
      const allGr = await getAllGroup();
      const newGroup = await Promise.all(allGr.map(async (group) => {
        return {
          _id: group._id,
          name: group.groupName,
          avatar: group.avatar.url || "https://fptshop.com.vn/Uploads/Originals/2021/6/23/637600835869525914_thumb_750x500.png",
          tag: group.conversation.tag
        }
      }))
      data.push(...newGroup)
    } catch (error) {
      console.log("FetchGroupError: ", error);
    }
    setFriends(data)

  };
  const fetchChats = async () => {
    try {
      if (conver.conversation._id === null || conver.conversation._id === undefined) {
      } else {
        const response = await axiosInstance.get(`/conversations/get/messages/${conver.conversation._id}`);
        const reversedChats = response.data;

        let data = [];
        let int = reversedChats.length;
        for (let index = 0; index < int; index++) {
          const chat = reversedChats[index];
          const getUser = await getUserById(chat.senderId)
          if (chat.replyMessageId === null) {
            const chatNew = {
              chat: chat,
              sender: getUser.user.profile,
              nameReply: null
            }
            data.push(chatNew);
          } else {
            const getUserReply = await getUserById(chat.replyMessageId.senderId)
            const chatNew = {
              chat: chat,
              sender: getUser.user.profile,
              nameReply: getUserReply.user.profile.name,
            }
            data.push(chatNew);
          }


        }
        setChats(data);
        fetchFriends();
        // const lastElement = reversedChats[0]
        // setLastTimestamp(lastElement.timestamp)
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const scrollToEnd = () => {
    fetchChats()
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
      console.log("scrollToEnd");
    }
  }
  useEffect(() => {
    fetchChats();

    if (socket) {
      socket.on("new_message", async ({ message }) => {
        if (message.conversationId === conver.conversation._id) {
          const getUser = await getUserById(message.retrunMessage.senderId)
          setChats(prevChats => [
            ...prevChats,
            {
              chat: message.retrunMessage,
              sender: getUser.user.profile,
              nameReply: null
            }
          ]);
          scrollToEnd()
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("new_message");
      }
    };
  }, [socket, chats]);



  const handleGetTime = (time) => {
    const vietnamDatetime = moment(time).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    const dateObject = new Date(vietnamDatetime)
    return `${dateObject.getHours()}:${dateObject.getMinutes()}`
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => console.log("Pressed call")}>
            <Ionicons
              name="call-outline"
              size={27}
              color="white"
              style={{ padding: 5, paddingStart: 15, marginRight: 10 }}
            />
          </Pressable>
          <Ionicons
            name="videocam-outline"
            size={27}
            color="white"
            style={{ padding: 5, marginRight: 10 }}
          />
          <Pressable
            onPress={() => navigation.navigate("MessageSettings", { conver })}
          >
            <Ionicons
              name="list-outline"
              size={27}
              color="white"
              style={{ padding: 5 }}
            />
          </Pressable>
        </View>
      ),
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center", width: '55%', marginRight: 100 }}>
          <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold' }}>{conver.name}</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#0091FF",
        shadowColor: "#fff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 20,
      },
    });
  }, [navigation]);

  useEffect(() => {
    if (scrollViewRef.current && contentHeight > scrollViewHeight && !isLoad) {
      const offset = contentHeight - scrollViewHeight;
      setIsLoad(true)
      scrollViewRef.current.scrollTo({ x: 0, y: offset, animated: true });
    }
  }, [contentHeight, scrollViewHeight]);


  // Khôi phục vị trí cuộn của ScrollView
  const restoreScrollPosition = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current.scrollTo({ x: 0, y: height + scrollViewHeight, animated: false });

      });
    }
  };
  const handleScrollToTop = () => {
    setIsLoading(true)
    const fetchChats = async () => {
      try {
        // const response = await axiosInstance.get(`/chats/getHistoryMessage/${user._id}?lastTimestamp=${lastTimestamp}`);
        const response = await axiosInstance.get(`/conversations/get/messages/${conver.conversation._id}`);
        const reversedChats = response.data;//.reverse();

        // if (reversedChats && reversedChats.length > 0) {
        //   setChats(prevChats => [...reversedChats, ...prevChats]);
        //   restoreScrollPosition();
        //   const lastElement = reversedChats[0]
        //   setLastTimestamp(lastElement.timestamp)
        // }
        setIsLoading(false)

      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();

  };
  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    if (y === 0) {
      handleScrollToTop();
    }
  };
  const handlePressIn = (message) => {
    setMessageSelected(message)
    setModalVisible(true)
  };
  const removeItemById = (array, idToRemove) => {
    const indexToRemove = array.findIndex(item => item._id === idToRemove);
    if (indexToRemove !== -1) {
      array.splice(indexToRemove, 1);
    }
    return array;
  };
  const handleDeleteMess = () => {
    setIsLoadThuHoi(true)
    const thuHoi = async () => {
      try {
        const response = await axiosInstance.post(`/chats/${messageSelected.chat._id}/delete`);
        // console.log(response)
        if (response.status === 200) {
          fetchChats();
          showToastSuccess("Thu hồi thành công")
          toggleModal()
          setIsLoadThuHoi(false)
        }
      } catch (error) {
        console.log(error);
        setIsLoadThuHoi(false)
        toggleModal()
      }
    };
    thuHoi();
  };
  const handleDeleteMessByStatus = () => {
    setIsLoadXoa(true)
    const deleteChat = async () => {
      try {
        const response = await axiosInstance.post(`conversations/deleteOnMySelf/${conver.conversation._id}/${messageSelected.chat._id}`);
        if (response.status === 200) {
          fetchChats();
          showToastSuccess("Xóa thành công")
          toggleModal()
          setIsLoadXoa(false)
        }
      } catch (error) {
        console.log(error);
        setIsLoadXoa(false)
        toggleModal()
      }
    };
    deleteChat();
  };
  const handleGetModalFriend = () => {
    toggleModal();
    toggleModalFriend();
  };

  const chuyenTiepChat = (friend) => {
    setIsLoadChuyenTiep(true)
    const handleSendMessage = async () => {
      try {
        let isGroup;
        if (friend.tag === 'group') {
          isGroup = true;
        } else {
          isGroup = false;
        }
        const send = await sendMessage(friend._id, messageSelected.chat.contents[0], isGroup)
        if (send) {
          showToastSuccess("Chuyển tiếp thành công")
          setIsLoadChuyenTiep(false)
        } else {
          showToastError("Chuyển tiếp thất bại")
        }
      } catch (error) {
        console.log("error1:", error)
        setIsLoadChuyenTiep(false)
        return false;
      }
      toggleModalFriend();
    }
    handleSendMessage();
  };

  //nhi
  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      console.log("Permission to access camera roll is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 20,
      videoExportPreset: ImagePicker.VideoExportPreset.Passthrough,
      videoMaxDuration: 10
    });
    if (!pickerResult.canceled) {
      setIsLoadMess(true)
      let isGroup = false
      if (conver.tag === "group") {
        isGroup = true
      }
      let replyId = null;
      if (replyChat !== null) {
        replyId = replyChat.chat._id
      }
      for (const asset of pickerResult.assets) {
        if (asset.type === 'image') {
          const formData = new FormData();
          const fileName = asset.uri.split('/').pop();
          formData.append('data[]', {
            uri: asset.uri,
            name: fileName,
            type: 'image/jpeg',

          });
          formData.append('isGroup', isGroup);
          formData.append('replyMessageId', replyId);
          try {
            const response = await sendImage(conver._id, formData)
            if (response.status === 201) {
              setIsLoadMess(false)
              setIsLoad(false)
              fetchChats();
              scrollToEnd();
              setReplyChat(null);
              console.log("send image success");
            }
            else if (response.status === 500) {
              console.log("send image fail");
            }
          } catch (error) {
            console.log(error);
            setIsLoadMess(false)
          }
        } else if (asset.type === 'video') {
          const formData = new FormData();
          const fileName = asset.uri.split('/').pop();
          formData.append('data[]', {
            uri: asset.uri,
            name: fileName,
            type: 'video/mp4',

          });
          formData.append('isGroup', isGroup);
          formData.append('replyMessageId', replyId);
          try {
            const response = await sendVideo(conver._id, formData)
            if (response.status === 201) {
              setIsLoadMess(false)
              setIsLoad(false)
              fetchChats();
              scrollToEnd();
              setReplyChat(null);
              console.log("send video success");
            }
            else if (response.status === 500) {
              console.log("send video fail");
            }
          } catch (error) {
            console.log(error);
            setIsLoadMess(false)
          }
        }
      }
    }
  }

  useEffect(() => {
    // Update send button color based on textMessage
    if (!textMessage) {
      setIsColorSend("black");
    } else {
      setIsColorSend("#0091FF");
    }
  }, [textMessage]);

  const handleSendMessage = async () => {
    if (!textMessage) {
      console.log("message rỗng");
    }
    else {
      setIsLoadMess(true)
      let isGroup = false
      if (conver.tag === "group") {
        isGroup = true
      }
      let replyId = null;
      if (replyChat !== null) {
        replyId = replyChat.chat._id
      }

      try {
        const response = await sendMessage(conver._id,
          { type: 'text', data: textMessage }, replyId, isGroup)
        if (response.status === 201) {
          setIsLoadMess(false)
          setIsLoad(false)
          fetchChats()
          scrollToEnd()
          console.log("send text success");
          setTextMessage(null);
          setReplyChat(null);
        }
        else if (response.status === 500) {
          showToastError("Gửi tin nhắn thất bại")
          console.log("send text fail");
        }

      } catch (error) {
        console.log(error);
        setIsLoadMess(false)
      }
    }
  }

  const handleCheckIsSend = (message) => {
    // const getUser = await getUserById(message.senderId)
    if (authUser.profile.name === message.sender.name) {
      return true;
    } else {
      return false;
    }
  };
  const handleReplyChat = () => {
    setReplyChat(messageSelected);
    toggleModal();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E9EB" }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {isLoading ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <View></View>
        )}
        <Toast />
        <ScrollView ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onLayout={(event) => {
            setScrollViewHeight(event.nativeEvent.layout.height);
          }}
          onContentSizeChange={(width, height) => {
            setContentHeight(height);
          }}
        >
          <View style={{ flex: 1 }}>
            {chats.length > 0 ?
              (chats.map((message, index) => (
                <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: handleCheckIsSend(message) ? "flex-end" : "flex-start" }} >
                  {handleCheckIsSend(message) ?
                    (<View></View>) :
                    (<View
                      style={{ width: 35, height: 35, justifyContent: "center", alignItems: "center", marginLeft: 10, marginRight: 10 }} >
                      <Image
                        source={{ uri: message.sender.avatar?.url }}
                        style={{ width: 35, height: 35, borderRadius: 25 }} />
                    </View>)}
                  <View style={[
                    handleCheckIsSend(message) ? styles.styleSender : styles.styleRecive
                  ]}>
                    <Text style={{ paddingHorizontal: 10, fontSize: 12, color: 'gray', fontWeight: '700' }}>
                      {message.sender.name}
                    </Text>
                    {message.chat.replyMessageId === null ? (<View></View>) :
                      (<View style={{ backgroundColor: '#89D5FB', display: 'flex', marginLeft: 10, borderLeftWidth: 2, borderColor: '#0072AB' }}>

                        {message.chat.replyMessageId.contents.map((content, i) => (
                          <View key={i} style={{ display: 'flex', paddingVertical: 10, alignItems: 'center', paddingRight: 5 }}>
                            {content.type === 'text' ? (
                              <View>
                                <Text style={{ fontSize: 13, fontWeight: 'bold', paddingLeft: 15 }}>
                                  {message.nameReply}
                                </Text>
                                {renderMessageContentReply(content)}
                              </View>
                            ) : (
                              <View style={{ display: 'flex', paddingVertical: 5, alignItems: 'center', paddingRight: 5, flexDirection: 'row' }}>
                                {renderMessageContentReply(content)}
                                <View>
                                  <Text style={{ paddingLeft: 10, fontSize: 13, fontWeight: 'bold' }}>
                                    {message.nameReply}
                                  </Text>
                                  <Text style={{ paddingLeft: 10, fontSize: 13, color: '#000' }}>
                                    [{content.type}]
                                  </Text>
                                </View>
                              </View>
                            )}
                          </View>
                        ))}

                      </View>)
                    }
                    {message.chat.contents.map((content, i) => (
                      <Pressable key={i}
                        onPress={() => handlePressIn(message)}>
                        <View>
                          {renderMessageContent(content)}
                          {/* {console.log(content)} */}
                          <View style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 5 }}><Text style={{ fontSize: 14 }}>{handleGetTime(message.timestamp)}</Text></View>
                        </View>
                      </Pressable>
                    ))}
                  </View>

                </View>
              ))) : (<View><Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', paddingVertical: 10 }}>Chưa có tin nhắn nào!</Text></View>)}

          </View>
        </ScrollView>
      </View >
      <View>
        {replyChat === null ?
          (<Text></Text>) :
          (
            <View style={{ backgroundColor: '#f5c4f2', marginLeft: 50, marginTop: 10 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ paddingLeft: 15, fontSize: 13, color: '#000' }}>
                  Trả lời: <Text style={{ paddingLeft: 15, fontSize: 12, color: 'gray' }}>{replyChat.sender.name} </Text>
                </Text>
                <Pressable onPress={() => { setReplyChat(null) }} style={{ marginRight: 20 }}><Text>Hủy</Text></Pressable>
              </View>
              <View
              >{replyChat.chat.contents.map((content, i) => (
                <View key={i} >
                  {renderMessageContentReply(content)}
                </View>
              ))}</View>
            </View>
          )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 10,
          backgroundColor: "white",
        }}
      >
        <Pressable onPress={() => console.log("Pressed smiley")}>
          <Ionicons name="happy-outline" size={30} color="black" />
        </Pressable>

        <View style={{ width: '54%' }}>
          <TextInput
            value={textMessage}
            onChangeText={setTextMessage}
            style={{
              flex: 1,
              height: 40,
              borderColor: "gray",
              borderRadius: 5,
              fontSize: 17
            }}
            placeholder="Tin nhắn"
          />
        </View>

        <View style={{ flexDirection: 'row', width: '35%', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={pickFile}>
            <Ionicons
              name="ellipsis-horizontal-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Pressed microphone")}>
            <Ionicons
              name="mic-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={openImagePicker}>
            <Ionicons name="image-outline" size={30} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSendMessage}>
            {isLoadMess ? (
              <ActivityIndicator color="black" size="large" />
            ) : (
              <Ionicons name="paper-plane" size={30} color={isColorSend} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>
              Choose
            </Text>
            <View style={styles.modalButtonContainer1}>
              <Pressable style={styles.pressCol} onPress={handleGetModalFriend}>
                <FontAwesome5
                  name="share"
                  size={20}
                  color="black"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.modalButton}>Chuyển tiếp</Text>
              </Pressable>
              <Pressable style={styles.pressCol} onPress={handleDeleteMessByStatus}>
                {isLoadXoa ? (
                  <ActivityIndicator color="black" size="large" />
                ) : (
                  <FontAwesome5
                    name="trash"
                    size={20}
                    color="black"
                    style={{ marginRight: 8 }}
                  />
                )}
                <Text style={styles.modalButton} >Xóa</Text>
              </Pressable>
              {
                messageSelected.sender?.name === authUser.profile.name
                  ? (
                    <Pressable style={styles.pressCol} onPress={handleDeleteMess}>
                      {isLoadThuHoi ? (
                        <ActivityIndicator color="black" size="large" />
                      ) : (
                        <FontAwesome5
                          name="comment-slash"
                          size={20}
                          color="black"
                          style={{ marginRight: 8 }}
                        />
                      )}
                      <Text style={styles.modalButton}>Thu hồi</Text>
                    </Pressable>

                  ) : (
                    <Text></Text>
                  )}
            </View>
            <View style={styles.modalButtonContainer1}>
              <Pressable style={styles.pressCol} >
                <FontAwesome5
                  name="list"
                  size={20}
                  color="black"
                  style={{ margin: 'auto' }}
                />
                <Text style={styles.modalButton}>Chọn nhiều</Text>
              </Pressable>
              <Pressable style={styles.pressCol} onPress={handleReplyChat}>
                <FontAwesome5
                  name="reply"
                  size={20}
                  color="black"
                  style={{ margin: 'auto' }}
                />
                <Text style={styles.modalButton}>Trả lời</Text>
              </Pressable>
            </View>

            <View style={styles.modalButtonContainer}>
              <Pressable onPress={toggleModal}>
                <Text style={styles.modalButton}>HỦY</Text>
              </Pressable>
              <Pressable >
                <Text style={styles.modalButton}>XÁC NHẬN</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalFriendVisible}
        onRequestClose={toggleModalFriend}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeaderText}>
              Choose
            </Text>
            <View style={styles.modalButtonContainer}>
              <ScrollView>
                <View style={styles.friendList}>
                  <View style={styles.friendListHeader}>
                    <Text style={styles.sectionTitle}>#</Text>
                    {isLoadChuyenTiep ? (
                      <ActivityIndicator color="black" size="large" />
                    ) : (
                      <View></View>
                    )}
                  </View>
                  {friends.map((friend, index) => (
                    <View key={index} style={styles.friendRow}>
                      <Pressable style={styles.friendItem} >
                        <View style={styles.friendInfo}>
                          <Image
                            source={{
                              uri: friend.avatar
                            }}
                            style={styles.friendAvatar}
                          />
                          <Text style={styles.friendName}>{friend.name}</Text>
                        </View>
                        <View style={styles.friendActions}>
                          <Pressable onPress={() => chuyenTiepChat(friend)} style={styles.pressCol}>
                            <FontAwesome5
                              name="arrow-right"
                              size={30}
                              color="black"
                              style={{ alignContent: "center", alignItems: "center" }}
                            />
                          </Pressable>
                        </View>
                      </Pressable>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.modalButtonContainer}>
              <Pressable onPress={toggleModalFriend}>
                <Text style={styles.modalButton}>HỦY</Text>
              </Pressable>
              <Pressable >
                <Text style={styles.modalButton}>XÁC NHẬN</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View >
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e2e8f1",
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
    marginTop: 20
  },
  modalButton: {
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#0091FF",
  },
  friendRow: {
    paddingVertical: 10,
  },
  friendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  friendInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendName: {
    fontSize: 16,
  },
  friendActions: {
    flexDirection: "row",
  },
  actionIcon: {
    marginRight: 20,
  },
  friendList: {
    backgroundColor: "white",
    padding: 10,
    borderTopColor: "#e5e5e5",
    borderTopWidth: 0.5,
  },
  friendListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressCol: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 20
  },
  styleSender: {
    marginTop: 10,
    justifyContent: 'space-around',
    borderRadius: 10,
    backgroundColor: "#cff0fe",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    paddingTop: 5,
  },
  styleRecive: {
    marginTop: 10,
    backgroundColor: "white",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    justifyContent: 'space-around',
    borderRadius: 10,
    paddingTop: 5
  },

});
export default Message;