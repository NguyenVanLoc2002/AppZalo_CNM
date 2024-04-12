import { useEffect, useRef, useState } from "react";
import { AiFillLike, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiLockOpen, BiScreenshot, BiSmile } from "react-icons/bi";
import { BsLayoutSidebarReverse, BsThreeDots, BsTrash3 } from "react-icons/bs";
import { CiCircleQuestion } from "react-icons/ci";
import {
  FaAddressCard,
  FaCaretDown,
  FaRegEyeSlash,
  FaUserFriends,
  FaVideo,
} from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import {
  IoImageOutline,
  IoTrashOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { LuPencilLine, LuSticker } from "react-icons/lu";
import { MdFormatColorText, MdPhone } from "react-icons/md";
import {
  PiAlarmThin,
  PiBellRingingThin,
  PiMagnifyingGlass,
  PiTagSimpleLight,
} from "react-icons/pi";
import {
  RiAlarmLine,
  RiBatteryChargeLine,
  RiDoubleQuotesR,
} from "react-icons/ri";
import { TfiAlarmClock } from "react-icons/tfi";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { TiPinOutline } from "react-icons/ti";
import axiosInstance from "../../../api/axiosInstance";
import { format, previousMonday } from "date-fns";
import { useSocketContext } from "../../../contexts/SocketContext";
import EmojiPicker from "emoji-picker-react";
import useConversation from "../../../hooks/useConversation";

function PeopleChatComponent({ language, userChat, showModal, shareMessage }) {
  const [content, setContent] = useState("");
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const scrollRef = useRef(null);
  const { socket } = useSocketContext();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isAddingMessages, setIsAddingMessages] = useState(false); //Flag để scroll bottom
  const [showPicker, setShowPicker] = useState(false);
  const { getConversations } = useConversation();

 
  // Đảo ngược mảng tin nhắn và lưu vào biến mới
  // const reversedMessages = [...messages].reverse();

  useEffect(() => {
    const fetchMessageHistory = async (converId) => {
      if (!converId) return; // Kiểm tra userId trước khi gọi API

      setLoading(true);
      try {
        const response = await axiosInstance.get(`conversations/get/messages/${converId}`);
       
       
        if (response.statusText==="OK") {
          setMessages(response.data);
        } else {
          throw new Error(response.data || "Failed to fetch message history");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userChat && userChat.conversationId) {
      fetchMessageHistory(userChat?.conversationId);
    }

    if (socket) {
      socket.on("new_message", ({ message }) => {
        console.log("new_message: ", message);
        getConversations();
        if (message.senderId !== userChat?.id) {
          console.log("message.sender: ", message.senderId);
          return;
        }
        setMessages((prevMessages) => [...prevMessages,message]);
      });
      socket.on("delete_message", ({ chatId }) => {
        fetchMessageHistory(userChat.conversationId);
      });
      return () => {
        socket.off("new_message");
        socket.off("delete_message");
      };
    }
  }, [userChat || socket]);

  const handleScroll = async (event) => {
    const container = event.target;

    const lastScrollPosition = container.scrollHeight - container.clientHeight;
    if (container.scrollTop === 0 && !isFetchingMore) {
      setIsFetchingMore(true);
      try {
        const lastMessage = messages[messages.length - 1];
        const firstMessageInChat = await axiosInstance(
          `chats/${userChat.id}/getFirstMessage`
        );

        if (lastMessage.timestamp !== firstMessageInChat.data.data.timestamp) {
          setIsAddingMessages(true);
          const response = await axiosInstance(
            `chats/${userChat.id}?lastTimestamp=${lastMessage.timestamp}`
          );
          const { data } = response;
          if (data.success) {
            setMessages((prevMessages) => [...prevMessages, ...data.data]);
            container.scrollTop = lastScrollPosition;
          } else {
            throw new Error(
              data.data || "Failed to fetch more message history"
            );
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchingMore(false);
      }
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };
  useEffect(scrollToBottom, []);
  useEffect(() => {
    if (!isAddingMessages) {
      scrollToBottom();
    }
  }, [messages, isAddingMessages]);

  const sendMessage = async (data, receiverId) => {
    setLoadingMedia(true);
    try {
      if (!data || data.trim === "") return;
      let messageType;
      console.log("data: ", data);
    

      if (receiverId) {
        if ( data.type === "text") {
          messageType = "sendText";
        } else if (data[0].type.startsWith("image/")) {
          messageType = "sendImages";
        } else if (data[0].type.startsWith("video/")){
          messageType = "sendVideo";
        }else{
          messageType = "sendFiles";
        }

        const response = await axiosInstance.post(
          `chats/${receiverId}/${messageType}`,
          { data: data },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setMessages((prevMessages) => [...prevMessages,response.data.data ]);
        setContent("");
        setIsAddingMessages(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage({ type: "text", data: content }, userChat?.id);
    }
  };

  const isoStringToTime = (isoString) => {
    const date = new Date(isoString);
    return format(date, "HH:mm");
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  //Giới hạn 3 ảnh trong 1 phần chat-bubble
  const calcImageSizeInChatBubble = (contents, maxImagePerRow) => {
    const imagesCount = contents.filter(
      (content) => content.type === "image"
    ).length;
    const imagesPerRow = Math.min(imagesCount, maxImagePerRow);
    const imageWidth = `calc(100%/${imagesPerRow})`;
    const imageHeight = "auto";
    return { imageWidth, imageHeight };
  };

  const handleSelectImageClick = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const handleUpload = async (event) => {
    const files = event.target.files;
    console.log("file1: ", files);
    // Xử lý tệp ảnh và video ở đây
    try {
      await sendMessage(files, userChat?.id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Thêm state để lưu vị trí của context menu
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [contextMenuStates, setContextMenuStates] = useState({});

  const handleContextMenu = (e, chatId) => {
    e.preventDefault(); // Ngăn chặn hiển thị context menu mặc định của trình duyệt
    const newPosition = { x: e.pageX, y: e.pageY };

    // Cập nhật state để hiển thị context menu cho tin nhắn được click chuột phải
    setContextMenuStates((prevState) => ({
      ...prevState,
      [chatId]: true, // chatId là khóa của tin nhắn trong state contextMenuStates
    }));

    // Cập nhật vị trí của context menu
    setContextMenuPosition(newPosition);
  };

  // Hàm xử lý ẩn context menu khi click bất kỳ đâu ngoài context menu
  const handleHideContextMenu = () => {
    setContextMenuStates({}); // Ẩn context menu cho tất cả các tin nhắn
  };

  const deleteChat = async (chatId) => {
    try {
      const converId = userChat?.conversationId;
      const response = await axiosInstance.post(`conversations/deletedMess/${converId}/${chatId}`);
      if (response.status === 200) {
        const updatedMessagesResponse = await axiosInstance.get(
          `conversations/get/messages/${converId}`
        );
        const dataUpdate = updatedMessagesResponse.data;
        setMessages(dataUpdate);
      }
    } catch (error) {
      console.error("Lỗi khi xóa tin nhắn:", error);
      if (error.status === 403) {
        toast.error(
          language === "vi"
            ? "Bạn không được phép xóa tin nhắn này"
            : "You are not authorized to delete this message"
        );
      }

      throw error;
    }
  };

  // Hàm xử lý chức năng xóa chỉ phía tôi
  const handleDeleteOnlyMySide = async (chatId) => {
    console.log("chatId: ", chatId);
    console.log("dang delete");
    try {
      console.log(userChat?.conversationId);
      const response = await axiosInstance.post(`conversations/deleteOnMySelf/${userChat?.conversationId}/${chatId}`);
      console.log("Xoa chi phia toi",response);
      const updatedMessages = messages.filter(
        (message) => message._id !== chatId
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.error(error);
    }
  };

  const togglePicker = () => {
    setShowPicker((prevState) => !prevState);
  };

  const onEmojiClick = (e, emojiObject) => {
    console.log("emojiObject.emoji: ", emojiObject.emoji); // Log emojiObject để kiểm tra
    setContent((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
  return (
    <>
      {userChat && (
        <div
          className=" bg-white h-screen sm:w-[calc(100%-24rem)] w-0 border-r overflow-auto"
          onClick={handleHideContextMenu}
        >
          <div className="h-[10vh] bg-white flex justify-between items-center border-b">
            <div className="flex items-center w-14 h-14 mr-3 ">
              <img
                src={userChat?.avatar}
                alt="avatar"
                className="w-full h-[80%] object-cover rounded-full border mr-3"
              />
            </div>
            <div className="flex-col items-center mr-auto ml-2">
              <p className="text-lg font-semibold">{userChat?.name}</p>
              <button className="">
                <PiTagSimpleLight size={18} className="hover:fill-blue-700" />
              </button>
            </div>
            <div className="flex items-center mr-3">
              <button className="hover:bg-gray-300 p-2 rounded">
                <PiMagnifyingGlass size={18} />
              </button>
              <button className="hover:bg-gray-300 p-2 rounded">
                <MdPhone size={20} />
              </button>
              <button className="hover:bg-gray-300 p-2 rounded">
                <FaVideo size={18} />
              </button>
              <button
                className="hover:bg-gray-300 p-2 rounded"
                onClick={toggleSidebar}
              >
                <BsLayoutSidebarReverse size={18} />
              </button>
            </div>
          </div>

          {/*Content Chat */}
          {messages.length === 0 ? (
            <div className="flex flex-col justify-center items-center  h-[75vh] bg-slate-50 overflow-y-auto">
              <p className="text-lg text-center">
                {language === "vi" ? (
                  <span>
                    Chưa có tin nhắn nào với <strong>{userChat?.name}</strong>
                  </span>
                ) : (
                  <soan>No message yet</soan>
                )}
              </p>

              <div className="flex flex-col items-center border rounded-xl shadow-md w-96 h-[65%] mt-5 ">
                <img
                  src={userChat?.background}
                  alt="background's friend"
                  className="object-cover w-full px-3 h-2/3 rounded-lg mt-3"
                />
                <div className="flex p-3 mt-5 rounded-lg border shadow-lg w-full h-full">
                  <img
                    src={userChat?.avatar}
                    alt="avatar"
                    className="w-16 h-16 object-cover rounded-full border mr-3"
                  />
                  <h2 className="text-2xl font-semibold text-primary mt-3 mr-5">
                    {userChat?.name}
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex flex-col p-2 h-[75vh] bg-slate-50 overflow-y-auto"
              ref={scrollRef}
              // onScroll={handleScroll}
            >
              {messages.map((message, index) => {
                if (message.senderId !== userChat.id) {
                  // Lấy những tin nhắn có status là 0 hoặc 2
                  if (message.status === 0 || message.status === 2) {
                    return (
                      <div
                        key={index}
                        className={
                          userChat.id === message.senderId
                            ? "chat chat-start w-fit  max-w-[50%]"
                            : "chat chat-end "
                        }
                        onContextMenu={(e) => handleContextMenu(e, message._id)}
                      >
                        {userChat.id === message.senderId && (
                          <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                              <img alt="avatar" src={userChat.avatar} />
                            </div>
                          </div>
                        )}

                        <div
                          className={`flex chat-bubble ${
                            userChat.id === message.senderId
                              ? "bg-white"
                              : "bg-[#e5efff]"
                          }`}
                        >
                          {message.contents.map((content, contentIndex) => {
                            const maxImagesPerRow = 3;
                            const imagesCount = message.contents.filter(
                              (c) => c.type === "image"
                            ).length;
                            const imagesPerRow = Math.min(
                              imagesCount,
                              maxImagesPerRow
                            );
                            const imageWidth = `calc(100% / ${imagesPerRow})`;
                            const imageHeight = "auto";

                            return (
                              <div
                                key={contentIndex}
                                className="message-container"
                              >
                                {/* Render nội dung của message */}
                                {content.type === "text" ? (
                                  <div className="flex flex-col">
                                    <span className="text-base text-black">
                                      {content.data}
                                    </span>
                                    <time className="text-xs opacity-50 text-stone-500">
                                      {isoStringToTime(message.timestamp)}
                                    </time>
                                  </div>
                                ) : content.type === "image" ? (
                                  <img
                                    src={content.data}
                                    alt="image"
                                    className="pr-2 pb-2"
                                    style={{
                                      width:
                                        imagesCount === 1
                                          ? "300px"
                                          : imageWidth,
                                      height: imageHeight,
                                    }}
                                  />
                                ) : (
                                  <div>
                                    <video
                                      controls
                                      className="pr-2 pb-2"
                                      style={{ width: "auto", height: "250px" }}
                                    >
                                      <source
                                        src={content.data}
                                        type="video/mp4"
                                      />
                                      <source
                                        src={content.data}
                                        type="video/webm"
                                      />
                                      <source
                                        src={content.data}
                                        type="video/ogg"
                                      />
                                      <source
                                        src={content.data}
                                        type="video/x-matroska"
                                      />
                                      <source
                                        src={content.data}
                                        type="video/x-msvideo"
                                      />
                                      <source
                                        src={content.data}
                                        type="video/quicktime"
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                    <time className="text-xs opacity-50 text-stone-500">
                                      {isoStringToTime(message.timestamp)}
                                    </time>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {contextMenuStates[message._id] && (
                          <div
                            className="flex flex-col z-10 fixed top-1/2 transform -translate-x-40 -translate-y-30 w-52  bg-white rounded-2xl shadow shadow-gray-300 "
                            style={{
                              top: contextMenuPosition.y,
                              left: contextMenuPosition.x,
                            }}
                            key={index}
                            onClick={handleHideContextMenu} // Ẩn context menu khi click ra ngoài
                          >
                            <div
                              className="flex p-2 text-black items-center rounded-xl border-b border-gray-100 hover:bg-gray-100"
                              onClick={() => {
                                shareMessage(message);
                                showModal("share");
                              }}
                            >
                              <RiDoubleQuotesR
                                className="mr-3"
                                size={14}
                                color="black"
                              />
                              <p>
                                {language === "vi" ? "Chuyển tiếp" : "Forward"}
                              </p>
                            </div>
                            {message.senderId !== userChat.id && (
                              <div
                                className="flex p-2 text-red-400 items-center rounded-xl border-b border-gray-100 hover:bg-gray-100"
                                onClick={() => deleteChat(message._id)}
                              >
                                <FaArrowRotateLeft
                                  className="mr-3"
                                  size={14}
                                  color="red"
                                />
                                <p>
                                  {language === "vi" ? "Thu hồi" : "Recall"}
                                </p>
                              </div>
                            )}

                            <div
                              className="flex p-2 text-red-400 items-center rounded-xl border-b border-gray-100 hover:bg-gray-100"
                              onClick={() =>{
                                console.log("message: ", message);
                                handleDeleteOnlyMySide(message._id)}
                              }
                            >
                              <BsTrash3
                                className="mr-3"
                                size={16}
                                color="red"
                              />
                              <p>
                                {language === "vi"
                                  ? "Xóa chỉ phía tôi"
                                  : "Delete only my side"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                } else {
                  // Lấy những tin nhắn có status là 0 hoặc 1
                  if (message.status === 0 || message.status === 1) {
                    return (
                      <div
                        key={index}
                        className={
                          userChat.id === message.senderId
                            ? "chat chat-start w-fit  max-w-[50%]"
                            : "chat chat-end "
                        }
                        onContextMenu={(e) => handleContextMenu(e, message._id)}
                      >
                        {userChat.id === message.senderId && (
                          <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                              <img alt="avatar" src={userChat.avatar} />
                            </div>
                          </div>
                        )}

                        <div
                          className={`flex chat-bubble ${
                            userChat.id === message.senderId
                              ? "bg-white"
                              : "bg-[#e5efff]"
                          }`}
                        >
                          {message.contents.map((content, contentIndex) => {
                            const maxImagesPerRow = 3;
                            const imagesCount = message.contents.filter(
                              (c) => c.type === "image"
                            ).length;
                            const imagesPerRow = Math.min(
                              imagesCount,
                              maxImagesPerRow
                            );
                            const imageWidth = `calc(100% / ${imagesPerRow})`;
                            const imageHeight = "auto";

                            return (
                              <div
                                key={contentIndex}
                                className="message-container"
                              >
                                {/* Render nội dung của message */}
                                {content.type === "text" ? (
                                  <div className="flex flex-col">
                                    <span className="text-base text-black">
                                      {content.data}
                                    </span>
                                    <time className="text-xs opacity-50 text-stone-500">
                                      {isoStringToTime(message.timestamp)}
                                    </time>
                                  </div>
                                ) : content.type === "image" ? (
                                  <img
                                    src={content.data}
                                    alt="image"
                                    className="pr-2 pb-2"
                                    style={{
                                      width:
                                        imagesCount === 1
                                          ? "300px"
                                          : imageWidth,
                                      height: imageHeight,
                                    }}
                                  />
                                ) : (
                                  <div>
                                    <video
                                      controls
                                      className="pr-2 pb-2"
                                      style={{ width: "auto", height: "250px" }}
                                    >
                                      <source
                                        src={content.data}
                                        type="video/mp4"
                                      />
                                      <source
                                        src={content.data}
                                        type="video/webm"
                                      />
                                      <source
                                        src={content.data}
                                        type="video/ogg"
                                      />
                                      <source
                                        src={content.data}
                                        type="video/x-matroska"
                                      />
                                      <source
                                        src={content.data}
                                        type="video/x-msvideo"
                                      />
                                      <source
                                        src={content.data}
                                        type="video/quicktime"
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                    <time className="text-xs opacity-50 text-stone-500">
                                      {isoStringToTime(message.timestamp)}
                                    </time>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {contextMenuStates[message._id] && (
                          <div
                            className="flex flex-col z-10 fixed top-1/2 transform -translate-x-40 -translate-y-30 w-52  bg-white rounded-2xl shadow shadow-gray-300 "
                            style={{
                              top: contextMenuPosition.y,
                              left: contextMenuPosition.x,
                            }}
                            key={index}
                            onClick={handleHideContextMenu} // Ẩn context menu khi click ra ngoài
                          >
                            <div
                              className="flex p-2 text-black items-center rounded-xl border-b border-gray-100 hover:bg-gray-100"
                              onClick={() => {
                                shareMessage(message);
                                showModal("share");
                              }}
                            >
                              <RiDoubleQuotesR
                                className="mr-3"
                                size={14}
                                color="black"
                              />
                              <p>
                                {language === "vi" ? "Chuyển tiếp" : "Forward"}
                              </p>
                            </div>
                            {message.senderId !== userChat.id && (
                              <div
                                className="flex p-2 text-red-400 items-center rounded-xl border-b border-gray-100 hover:bg-gray-100"
                                onClick={() => deleteChat(message._id)}
                              >
                                <FaArrowRotateLeft
                                  className="mr-3"
                                  size={14}
                                  color="red"
                                />
                                <p>
                                  {language === "vi" ? "Thu hồi" : "Recall"}
                                </p>
                              </div>
                            )}

                            <div
                              className="flex p-2 text-red-400 items-center rounded-xl border-b border-gray-100 hover:bg-gray-100"
                              onClick={() =>
                                handleDeleteOnlyMySide(message._id)
                              }
                            >
                              <BsTrash3
                                className="mr-3"
                                size={16}
                                color="red"
                              />
                              <p>
                                {language === "vi"
                                  ? "Xóa chỉ phía tôi"
                                  : "Delete only my side"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                }
              })}
              {isFetchingMore && <div>Loading...</div>}
              {loadingMedia && (
                <p className="flex flex-col justify-end mr-2 mb-2">
                  Loading....
                </p>
              )}
            </div>
          )}

          <div className="h-[15vh] bg-white flex-col border-t">
            <div className="h-[40%] bg-white flex justify-between items-center border-b p-1">
              <button
                className="hover:bg-gray-300 p-2 rounded"
                onClick={togglePicker}
              >
                <LuSticker size={20} />
              </button>

              {showPicker && (
                <EmojiPicker
                  className="-translate-y-60"
                  style={{ width: "100%" }}
                  onEmojiClick={(e) => {
                    console.log("e.emoji: ", e.emoji);
                    setContent((prevInput) => prevInput + e.emoji);
                    setShowPicker(false);
                  }}
                />
              )}

              <button
                className="hover:bg-gray-300 p-2 rounded"
                onClick={handleSelectImageClick}
              >
                <IoImageOutline size={20} />
              </button>
              <button className="hover:bg-gray-300 p-2 rounded">
                <IoIosLink size={20} />
              </button>
              <button className="hover:bg-gray-300 p-2 rounded flex">
                <BiScreenshot size={20} />
                <FaCaretDown size={18} />
              </button>
              <button className="hover:bg-gray-300 p-2 rounded flex">
                <FaAddressCard size={20} />
              </button>
              <button className="hover:bg-gray-300 p-2 rounded flex">
                <TfiAlarmClock size={20} />
              </button>
              <button className="hover:bg-gray-300 p-2 rounded flex">
                <FiCheckSquare size={20} />
              </button>
              <button className="hover:bg-gray-300 p-2 rounded flex">
                <MdFormatColorText size={20} />
              </button>
              <button className="hover:bg-gray-300 pr-2 pl-2 rounded flex text-2xl">
                !
              </button>
              <button className="hover:bg-gray-300 p-2 rounded flex text-2xl">
                <BsThreeDots size={20} />
              </button>
            </div>
            <div className="h-[60%] flex items-center justify-between">
              <input
                type="text"
                placeholder="Nhập @, tin nhắn tới"
                className="w-full outline-none p-3"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className="flex items-center mr-2">
                <button className="hover:bg-gray-300 p-2 rounded">
                  <RiBatteryChargeLine size={20} />
                </button>
                <button className="hover:bg-gray-300 p-2 rounded">
                  <BiSmile size={20} />
                </button>
                <button className="hover:bg-gray-300 p-2 rounded text-2xl mb-1">
                  @
                </button>
                <button className="hover:bg-gray-300 p-2 rounded">
                  <AiFillLike size={20} color="rgb(252 186 3)" />
                </button>
              </div>
            </div>
            <input
              type="file"
              id="fileInput"
              multiple
              style={{ display: "none" }}
              onChange={handleUpload}
            />
          </div>
        </div>
      )}

      {!userChat && (
        <div className=" bg-white h-screen sm:w-[calc(100%-24rem)] w-0 border-r relative z-0 flex flex-col justify-center items-center">
          <div className="text-lg text-center">
            {language === "vi" ? (
              <>
                <p className="text-[#0184e0] text-2xl">
                  Chào mừng đến với <strong>Zola 💕</strong>{" "}
                </p>
                <p>
                  <i>cùng nhau trò chuyện thỏa thích</i>
                </p>
                <p>
                  <i>Chọn một hội thoại để bắt đầu trò chuyện</i>
                </p>
              </>
            ) : (
              <>
                <p className="text-[#0184e0] text-2xl">
                  Hi there ! Wellcome to <strong>Zola 💕</strong>
                </p>
                <p>
                  <i>Let's start chatting with your friends or family</i>
                </p>
                <p>
                  <i>
                    Choose a chat to start chatting with your friends or family
                  </i>
                </p>
              </>
            )}
          </div>

          <div className="flex items-center justify-center w-full mt-5">
            <img
              src="https://chat.zalo.me/assets/inapp-welcome-screen-0.19afb7ab96c7506bb92b41134c4e334c.jpg"
              alt="zalo"
              className="w-1/2"
            />
          </div>
        </div>
      )}

      {isSidebarVisible && (
        <div className="fixed top-0 right-0 h-screen bg-gray w-4/12 z-10 bg-gray-300 border-l  drop-shadow-2xl">
          <div className="h-[70px] bg-white flex justify-center items-center border-b">
            <p className="flex text-lg font-medium">Thông tin hội thoại</p>
            <button
              className="flex top-0 right-2 fixed text-lg font-medium"
              onClick={toggleSidebar}
            >
              x
            </button>
          </div>
          <div className="h-[calc(100%-70px)] items-center  overflow-y-auto">
            <div className="h-[200px] bg-white items-center flex-col">
              <div className="flex justify-center pt-2">
                <img src="zalo.svg" alt="avatar" />
              </div>
              <div className="flex justify-center pt-2">
                <p className="text-lg font-semibold">{userChat?.name}</p>
                <div className="flex items-center ml-2 rounded-full bg-gray-200 p-1 hover:bg-gray-400">
                  <button>
                    <LuPencilLine size={20} />
                  </button>
                </div>
              </div>
              <div className="flex justify-around pt-2">
                <div className="flex flex-col items-center">
                  <button className="flex items-center  rounded-full bg-gray-200 p-1 hover:bg-gray-400">
                    <PiBellRingingThin size={22} />
                  </button>
                  <p className="flex text-center">
                    Tắt thông <br /> báo
                  </p>
                </div>
                <div className="flex flex-col items-center ">
                  <button className="flex items-center rounded-full bg-gray-200 p-1 hover:bg-gray-400">
                    <TiPinOutline size={22} />
                  </button>
                  <p className="flex text-center">
                    Ghim hội <br />
                    thoại{" "}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <button className="flex items-center  rounded-full bg-gray-200 p-1 hover:bg-gray-400">
                    <AiOutlineUsergroupAdd size={22} />
                  </button>
                  <p className="flex text-center ">
                    Tạo nhóm <br />
                    trò truyện
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex flex-col justify-around mt-2  bg-white">
              <button className="flex items-center p-2 hover:bg-gray-200">
                <RiAlarmLine size={25} />
                <p className="ml-2">Danh sách nhắc hẹn</p>
              </button>

              <button className="flex items-center  p-2 hover:bg-gray-200">
                <FaUserFriends size={25} stroke="blue" />
                <p className="ml-2">Nhóm chung</p>
              </button>
            </div>
            <div className=" flex flex-col mt-2 p-2 bg-white">
              <button className="flex items-center justify-between p-2">
                <p className="font-medium text-lg ">Ảnh/Video</p>
                <FaCaretDown size={20} />
              </button>
              <div>
                <p className="text-center font-normal text-gray-400">
                  Chưa có ảnh và video được chia sẻ
                </p>
              </div>
            </div>
            <div className=" flex flex-col mt-2 p-2 bg-white">
              <button className="flex items-center justify-between p-2">
                <p className="font-medium text-lg ">File</p>
                <FaCaretDown size={20} />
              </button>
              <div>
                <p className="text-center font-normal text-gray-400">
                  Chưa có file được chia sẻ
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-2 p-2 bg-white">
              <button className="flex items-center justify-between p-2">
                <p className="font-medium text-lg ">Link</p>
                <FaCaretDown size={20} />
              </button>
              <div>
                <p className="text-center font-normal text-gray-400">
                  Chưa có link được chia sẻ
                </p>
              </div>
            </div>
            <div className=" flex flex-col mt-2 bg-white">
              <button className="flex items-center justify-between mt-2 p-2 ml-2">
                <p className="font-medium text-lg ">Thiết lập bảo mật</p>
                <FaCaretDown size={20} />
              </button>
              <div className="flex flex-col">
                <div className="flex items-center pt-2 pb-2 hover:bg-gray-200">
                  <button className="ml-4">
                    <BiLockOpen size={25} stroke="blue" />
                  </button>
                  <button className="flex flex-col ml-2">
                    <p className="flex items-center">
                      Mã hóa đầu cuối{" "}
                      <CiCircleQuestion size={20} className="ml-2" />
                    </p>
                    <p className="font-normal text-sm text-gray-400">
                      Chưa nâng cấp
                    </p>
                  </button>
                </div>
                <div className="flex items-center pt-2 pb-2 hover:bg-gray-200">
                  <button className="ml-4">
                    <PiAlarmThin size={25} stroke="blue" />
                  </button>

                  <button className="flex flex-col ml-2 ">
                    <p className="flex items-center">
                      Tin nhắn tự động xóa{" "}
                      <CiCircleQuestion size={20} className="ml-2" />
                    </p>
                    <p className="font-normal text-sm text-gray-400">
                      Không bao giờ
                    </p>
                  </button>
                </div>
                <div className="flex items-center justify-between pt-4 pb-4 hover:bg-gray-200">
                  <button className="ml-4">
                    <FaRegEyeSlash size={25} stroke="blue" />
                  </button>

                  <button className="flex items-center mr-auto ml-2 ">
                    <p>Ẩn trò chuyện</p>
                  </button>
                  <input type="checkbox" className="toggle" />
                </div>
                <div className="flex items-center justify-between pt-4 pb-4 hover:bg-gray-200">
                  <button className="ml-4">
                    <IoWarningOutline size={25} />
                  </button>
                  <button className="flex items-center mr-auto ml-2 ">
                    <p>Báo xấu</p>
                  </button>
                </div>
                <div className="flex items-center justify-between pt-4 pb-4 hover:bg-gray-200">
                  <button className="ml-4">
                    <IoTrashOutline size={25} stroke="red" />
                  </button>
                  <button className="flex items-center mr-auto ml-2 text-red-600">
                    <p>Xóa lịch sử trò chuyện</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PeopleChatComponent;
