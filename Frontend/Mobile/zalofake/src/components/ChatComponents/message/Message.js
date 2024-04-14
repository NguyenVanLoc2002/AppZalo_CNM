import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axiosInstance from "../../../api/axiosInstance";
import moment from "moment-timezone";
import useMessage from "../../../hooks/useMessage";
import Toast from "react-native-toast-message";
import useSendMessage from "../../../hooks/useSendMessage";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { useSocketContext } from "../../../contexts/SocketContext";

const Message = ({ navigation, route }) => {
  const { group, user } = route.params;
  // const {user} = group.user;
  //nhi
  const [textMessage, setTextMessage] = useState(null);
  const [isColorSend, setIsColorSend] = useState(false);
  const { sendMessage, sendImage, sendVideo } = useSendMessage();
  const { socket } = useSocketContext();

  //truc
  const [chats, setChats] = useState([]);
  const scrollViewRef = useRef();
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const [lastTimestamp, setLastTimestamp] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { renderMessageContent, showToastSuccess, showToastError } =
    useMessage();
  const [isModalVisible, setModalVisible] = useState(false);
  const [messageSelected, setMessageSelected] = useState("");
  const [isModalFriendVisible, setIsModalFriendVisible] = useState(false);
  const [friends, setFriends] = useState([]);
  const [isLoadMess, setIsLoadMess] = useState(false);
  const [isLoadChuyenTiep, setIsLoadChuyenTiep] = useState(false);
  const [isLoadThuHoi, setIsLoadThuHoi] = useState(false);
  const [isLoadXoa, setIsLoadXoa] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalFriend = () => {
    setIsModalFriendVisible(!isModalFriendVisible);
  };
  const fetchFriends = async () => {
    try {
      const response = await axiosInstance.get("/users/get/friends");
      setFriends(response.data.friends);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchChats = async () => {
    try {
      const response = await axiosInstance.get(
        `/conversations/get/messages/${group.conversation?._id}`
      );
      const reversedChats = response.data; //.reverse();
      setChats(reversedChats);
      fetchFriends();
      const lastElement = reversedChats[0];
      setLastTimestamp(lastElement?.timestamp);
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const scrollToEnd = () => {
    fetchChats();
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
      console.log("scrollToEnd");
    }
  };
  useEffect(() => {
    fetchChats();

    if (socket) {
      socket.on("new_message", ({ message }) => {
        setChats((prevMessages) => [message, ...prevMessages]);
        console.log("new_message: ", message);
        scrollToEnd();
      });
      socket.on("delete_message", ({ chatId }) => {
        scrollToEnd();
      });
      return () => {
        socket.off("new_message");
        socket.off("delete_message");
      };
    }
  }, [socket]);

  const handleCheckIsSend = (message) => {
    if (message.senderId === user?._id) {
      return false;
    } else {
      return true;
    }
  };
  const handleGetTime = (time) => {
    const vietnamDatetime = moment(time)
      .tz("Asia/Ho_Chi_Minh")
      .format("YYYY-MM-DD HH:mm:ss");
    const dateObject = new Date(vietnamDatetime);
    return `${dateObject.getHours()}:${dateObject.getMinutes()}`;
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          {group && (
            <Pressable
              onPress={() => {
                navigation.navigate("MessageSettings", { group });
              }}
            >
              <Ionicons
                name="list-outline"
                size={27}
                color="white"
                style={{ padding: 5 }}
              />
            </Pressable>
          )}
        </View>
      ),
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
            {user?.profile?.name || group?.nameGroup}
          </Text>
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
      setIsLoad(true);
      scrollViewRef.current.scrollTo({ x: 0, y: offset, animated: true });
    }
  }, [contentHeight, scrollViewHeight]);

  // Khôi phục vị trí cuộn của ScrollView
  const restoreScrollPosition = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: height + scrollViewHeight,
          animated: false,
        });
      });
    }
  };
  const handleScrollToTop = () => {
    setIsLoading(true);
    const fetchChats = async () => {
      try {
        // const response = await axiosInstance.get(`/chats/getHistoryMessage/${user._id}?lastTimestamp=${lastTimestamp}`);
        const response = await axiosInstance.get(
          `/conversations/get/messages/${group.conversation?._id}`
        );
        const reversedChats = response.data; //.reverse();
        // if (reversedChats && reversedChats.length > 0) {
        //   setChats(prevChats => [...reversedChats, ...prevChats]);
        //   restoreScrollPosition();
        //   const lastElement = reversedChats[0]
        //   setLastTimestamp(lastElement.timestamp)
        // }
        setIsLoading(false);
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
    setMessageSelected(message);
    setModalVisible(true);
  };
  const removeItemById = (array, idToRemove) => {
    const indexToRemove = array.findIndex((item) => item._id === idToRemove);
    if (indexToRemove !== -1) {
      array.splice(indexToRemove, 1);
    }
    return array;
  };
  const handleDeleteMess = () => {
    setIsLoadThuHoi(true);
    const thuHoi = async () => {
      try {
        const response = await axiosInstance.post(
          `chats/${messageSelected._id}/delete`
        );
        if (response.status === 200) {
          const newArray = removeItemById(chats, messageSelected._id);
          setChats(newArray);
          showToastSuccess("Thu hồi thành công");
          toggleModal();
          setIsLoadThuHoi(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoadThuHoi(false);
        toggleModal();
      }
    };
    thuHoi();
    // setModalVisible(false)
  };

  const handleDeleteMessByStatus = () => {
    setIsLoadXoa(true);
    const deleteChat = async () => {
      try {
        const response = await axiosInstance.post(
          `chats/updateStatus/${messageSelected._id}`
        );
        if (response.status === 200) {
          const newArray = removeItemById(chats, messageSelected._id);
          setChats(newArray);
          showToastSuccess("Xóa thành công");
          toggleModal();
          setIsLoadXoa(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoadXoa(false);
        toggleModal();
      }
    };
    deleteChat();
    // setModalVisible(false)
  };
  const handleGetModalFriend = () => {
    toggleModal();
    toggleModalFriend();
  };

  const chuyenTiepChat = (friend) => {
    setIsLoadChuyenTiep(true);
    const handleSendMessage = async () => {
      try {
        const send = await sendMessage(friend, messageSelected.contents[0]);
        if (send) {
          showToastSuccess("Chuyển tiếp thành công");
          setIsLoadChuyenTiep(false);
        } else {
          showToastError("Chuyển tiếp thất bại");
        }
      } catch (error) {
        console.log("error1:", error);
        setIsLoadChuyenTiep(false);
        return false;
      }
      toggleModalFriend();
    };
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
      videoMaxDuration: 10,
    });
    console.log("picker", pickerResult.assets[0]);
    if (!pickerResult.canceled) {
      setIsLoadMess(true);

      for (const asset of pickerResult.assets) {
        if (asset.type === "image") {
          const formData = new FormData();
          const fileName = asset.uri.split("/").pop();
          formData.append("data[]", {
            uri: asset.uri,
            name: fileName,
            type: "image/jpeg",
          });
          try {
            const response = await sendImage(user, formData);
            if (response.status === 201) {
              setIsLoadMess(false);
              setIsLoad(false);
              setChats(chats.concat(response.data.data));
              scrollToEnd();
              console.log("success");
            } else if (response.status === 500) {
              console.log("fail");
            }
          } catch (error) {
            console.log(error);
            setIsLoadMess(false);
          }
        } else if (asset.type === "video") {
          const formData = new FormData();
          const fileName = asset.uri.split("/").pop();
          formData.append("data[]", {
            uri: asset.uri,
            name: fileName,
            type: "video/mp4",
          });
          try {
            const response = await sendVideo(user, formData);
            if (response.status === 201) {
              setIsLoadMess(false);
              setIsLoad(false);
              setChats(chats.concat(response.data.data));
              scrollToEnd();
              console.log("success");
            } else if (response.status === 500) {
              console.log("fail");
            }
          } catch (error) {
            console.log(error);
            setIsLoadMess(false);
          }
        }
      }
    }
  };

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
    } else {
      setIsLoadMess(true);
      try {
        const response = await sendMessage(user, {
          type: "text",
          data: textMessage,
        });
        if (response.status === 201) {
          setIsLoadMess(false);
          setIsLoad(false);
          setChats(chats.concat(response.data.data));
          scrollToEnd();
          console.log("success");
          setTextMessage(null);
        } else if (response.status === 500) {
          showToastError("Gửi tin nhắn thất bại");
          console.log("fail");
        }
      } catch (error) {
        console.log(error);
        setIsLoadMess(false);
      }
    }
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
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onLayout={(event) => {
            setScrollViewHeight(event.nativeEvent.layout.height);
          }}
          onContentSizeChange={(width, height) => {
            setContentHeight(height);
          }}
        >
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            {chats.map((message, index) => (
              <View
                key={index}
                style={{
                  justifyContent: "space-around",
                  borderRadius: 10,
                  backgroundColor: handleCheckIsSend(message)
                    ? "#7debf5"
                    : "#d9d9d9",
                  margin: 5,
                  alignItems: handleCheckIsSend(message)
                    ? "flex-end"
                    : "flex-start",
                  alignSelf: handleCheckIsSend(message)
                    ? "flex-end"
                    : "flex-start",
                }}
              >
                {message.contents.map((content, i) => (
                  <Pressable key={i} onPress={() => handlePressIn(message)}>
                    <View>
                      {renderMessageContent(content)}
                      <View
                        style={{
                          paddingLeft: 15,
                          paddingRight: 15,
                          paddingBottom: 5,
                        }}
                      >
                        <Text style={{ fontSize: 14 }}>
                          {handleGetTime(message?.timestamp)}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
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

        <View style={{ width: "54%" }}>
          <TextInput
            value={textMessage}
            onChangeText={setTextMessage}
            style={{
              flex: 1,
              height: 40,
              borderColor: "gray",
              borderRadius: 5,
              fontSize: 17,
            }}
            placeholder="Tin nhắn"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "35%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => console.log("Pressed menu")}>
            <Ionicons
              name="ellipsis-horizontal-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Pressed microphone")}>
            <Ionicons name="mic-outline" size={30} color="black" />
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
            <Text style={styles.modalHeaderText}>Choose</Text>
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
              <Pressable
                style={styles.pressCol}
                onPress={handleDeleteMessByStatus}
              >
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
                <Text style={styles.modalButton}>Xóa</Text>
              </Pressable>
              {messageSelected.senderId === user?._id ? (
                <Text></Text>
              ) : (
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
              )}
            </View>
            <View style={styles.modalButtonContainer1}>
              <Pressable style={styles.pressCol}>
                <FontAwesome5
                  name="list"
                  size={20}
                  color="black"
                  style={{ margin: "auto" }}
                />
                <Text style={styles.modalButton}>Chọn nhiều</Text>
              </Pressable>
            </View>
            <View style={styles.modalButtonContainer}>
              <Pressable onPress={toggleModal}>
                <Text style={styles.modalButton}>HỦY</Text>
              </Pressable>
              <Pressable>
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
            <Text style={styles.modalHeaderText}>Choose</Text>
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
                      <Pressable style={styles.friendItem}>
                        <View style={styles.friendInfo}>
                          <Image
                            source={{
                              uri: friend?.profile?.avatar?.url,
                            }}
                            style={styles.friendAvatar}
                          />
                          <Text style={styles.friendName}>
                            {friend?.profile?.name}
                          </Text>
                        </View>
                        <View style={styles.friendActions}>
                          <Pressable
                            onPress={() => chuyenTiepChat(friend)}
                            style={styles.pressCol}
                          >
                            <FontAwesome5
                              name="arrow-right"
                              size={30}
                              color="black"
                              style={{
                                alignContent: "center",
                                alignItems: "center",
                              }}
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
              <Pressable>
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
    marginTop: 20,
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
});
export default Message;
