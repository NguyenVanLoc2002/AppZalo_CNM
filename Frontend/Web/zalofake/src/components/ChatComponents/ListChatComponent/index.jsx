import { useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FaSortDown } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import toast from "react-hot-toast";

import useConversation from "../../../hooks/useConversation";
import useGroup from "../../../hooks/useGroup";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useSocketContext } from "../../../contexts/SocketContext";

function ListChatComponent({
  language,
  showModal,
  userChat,
  changeUserChat,
  friends,
  conversations,
}) {
  const [valueSearch, setValueSearch] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showUnread, setShowUnread] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [originalFriendList, setOriginalFriendList] = useState([]);
  const [listChatCurrent, setListChatCurrent] = useState([]);
  const [isChatSelected, setIsChatSelected] = useState("");
  const { groups, getGroups } = useGroup();
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();
  const { getConversationByID, getConversationByParticipants, conversation } =
    useConversation();

  useEffect(() => {
    getGroups();
    setOriginalFriendList(friends);
    setFriendList(friends);
  }, [friends]);

  useEffect(() => {
    const listChat = conversations.map((conversation) => {
      const friend = conversation.participants.find(
        (participant) => participant.phone !== authUser.phone
      );

      return {
        id: friend?._id,
        conversationId: conversation.id,
        name: friend?.profile.name,
        avatar: friend?.profile.avatar?.url || "/zalo.svg",
        background: friend?.profile.background?.url || "/zalo.svg",
        unread: conversation.messages.some(
          (message) => message.receiver === authUser.phone && !message.isRead
        ),
        lastMessage: conversation.lastMessage,
        tag: conversation.tag,
      };
    });

    const listGroup = groups.map((group) => {
      return {
        id: group._id,
        conversationId: group.conversation._id,
        name: group.groupName,
        avatar: group.avatar.url,
        background: group.avatar.url,
        lastMessage: group.lastMessage,
        tag: group.conversation.tag,
        admin: group.createBy,
      };
    });

    listChat.push(...listGroup);
    setListChatCurrent(listChat);
    console.log("listChatCurrent", listChatCurrent);

    if (socket) {
      socket.on("new_message", ({ message }) => {
        console.log(
          "new_message on list chat",
          message,
          "listChatCurrent",
          listChatCurrent
        );

        const isExist = listChatCurrent.some(
          (chat) => chat.conversationId === message.conversationId
        );
        if (
          isExist
        ) {
          console.log("reload list chat");
          setListChatCurrent((prev) => {
            const newList = [...prev];
            const index = newList.findIndex(
              (chat) => chat.conversationId === message.conversationId
            );
            newList[index].lastMessage = message.retrunMessage;
            console.log("newList", newList);
            return newList;
          });
        } else {
          getConversationByID(message.conversationId);
        }
      });

      socket.on(
        "delete_message",
        ({ chatRemove, conversationId, isDeleted }) => {
          if (isDeleted === true) {
            console.log("delete_conversation");
            setListChatCurrent((prev) => {
              const newList = [...prev];
              const index = newList.findIndex(
                (conversation) => conversation._id === conversationId
              );
              if (index !== -1) {
                newList.splice(index, 1);
              }
              return newList;
            });
          } else {
            setListChatCurrent((prev) => {
              const newList = [...prev];
              const index = newList.findIndex(
                (conversation) => conversation._id === conversationId
              );
              if (index !== -1) {
                newList[index].lastMessage = chatRemove;
              }
              return newList;
            });
          }
        }
      );

      socket.on("add-to-group", ({ data }) => {
        const group = data.group;

        if (data?.addMembers?.includes(authUser._id)) {
          toast.success(
            language === "vi"
              ? `Bạn đã tham gia nhóm ${group.name}`
              : `You have joined the group ${group.name}`
          );
        }

        setListChatCurrent((prev) => {
          const newList = [...prev];
          const newGroup = {
            id: group._id,
            conversationId: group.conversation._id,
            name: group.groupName,
            avatar: group.avatar.url,
            background: group.avatar.url,
            lastMessage: group.lastMessage,
            tag: group.conversation.tag,
            admin: group.createBy,
          };
          const index = newList.findIndex((chat) => chat.id === newGroup.id);
          if (index !== -1) {
            newList.splice(index, 1);
          }
          newList.unshift(newGroup);
          return newList;
        });
      });

      socket.on("remove-from-group", ({ group }) => {
        if (group.removeMember?.includes(authUser._id)) {
          if (authUser._id === group.createBy) {
            toast.error(
              language === "vi"
                ? `Bạn đã rời khỏi nhóm ${group.name}`
                : `You have left the group ${group.name}`
            );
          } else {
            toast.error(
              language === "vi"
                ? `Bạn đã bị loại khỏi nhóm ${group.name}`
                : `You have been removed from the group ${group.name}`
            );
          }
        }

        setListChatCurrent((prev) => {
          const newList = [...prev];
          const index = newList.findIndex((chat) => chat.id === group._id);
          if (index !== -1) {
            newList.splice(index, 1);
          }
          return newList;
        });
      });

      socket.on("delete-group", ({ group }) => {
        toast.success(
          language === "vi"
            ? `Nhóm ${group.name} đã bị xóa`
            : `Group ${group.name} has been deleted`
        );
        setListChatCurrent((prev) => {
          const newList = [...prev];
          const index = newList.findIndex((chat) => chat.id === group.id);
          if (index !== -1) {
            newList.splice(index, 1);
          }
          return newList;
        });

        changeUserChat(null);
      });
      return () => {
        socket.off("new_message");
        socket.off("add-to-group");
        socket.off("remove-from-group");
        socket.off("delete-group");
      };
    }
  }, [conversations, groups, socket]);

  useEffect(() => {
    if (conversation) {
      const friend = conversation.participants.find(
        (participant) => participant._id !== authUser._id
      );
      setListChatCurrent((prev) => {
        const newList = [...prev];
        const newChat = {
          id: friend._id,
          conversationId: conversation._id,
          name: friend.profile.name,
          avatar: friend.profile.avatar.url,
          background: friend.profile.background.url,
          lastMessage: conversation.lastMessage,
          tag: conversation.tag,
        };
        const index = newList.findIndex((chat) => chat.id === newChat.id);
        if (index !== -1) {
          newList.splice(index, 1);
        }
        newList.unshift(newChat);
        return newList;
      });
    }
  }, [conversation]);

  const changeTab = (tab) => {
    setActiveTab(tab);
    if (tab === "all") {
      setFriendList(friends);
      setShowUnread(true);
    } else if (tab === "unread") {
      const listFriendUnread = friendList.filter((friend) => friend.unread);
      setFriendList(listFriendUnread);
      setShowUnread(false);
    }
  };

  //Lọc dữ liệu tên bạn bè
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setValueSearch(searchTerm);

    if (searchTerm.trim() === "") {
      setFriendList(originalFriendList);
    } else {
      const filteredFriends = originalFriendList.filter((friend) =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFriendList(filteredFriends);
    }
  };

  const selectedFriendToChat = (friend) => {
    const conversation = conversations.find((conversation) =>
      conversation.participants.some(
        (participant) => participant._id === friend.id
      )
    );
    if (conversation) {
      friend.conversationId = conversation.id;
    } else {
      getConversationByParticipants([friend.id]).then((conversation) => {
        friend.conversationId = conversation._id;
      });
    }
    userChat(friend);
  };

  return (
    <>
      <div className="border-r">
        <div className="h-[70px] bg-white flex justify-between items-center">
          <div className="bg-gray-200 rounded-lg ml-5 w-8/12">
            <div
              className={`${
                isInputFocused === true
                  ? "flex items-center justify-center px-3 border border-blue-500 bg-white rounded-lg"
                  : "flex items-center justify-center px-3 "
              }`}
            >
              <CiSearch size={20} />
              <input
                type="text"
                className="h-9 w-full bg-transparent outline-none px-3"
                placeholder="Search"
                value={valueSearch}
                onChange={handleInputChange}
                onFocus={() => setIsInputFocused(true)}
              />
            </div>
          </div>
          <div className="px-3 w-1/4 flex items-center justify-around">
            {isInputFocused ? (
              <button onClick={() => setIsInputFocused(false)}>Đóng</button>
            ) : (
              <>
                <button
                  className="p-2 rounded-lg hover:bg-gray-300"
                  onClick={() => showModal("addFriend")}
                >
                  <AiOutlineUserAdd size={18} opacity={0.8} />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-gray-300"
                  onClick={() => showModal("addGroup")}
                >
                  <AiOutlineUsergroupAdd size={20} opacity={0.8} />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex h-[35px] items-center px-5 mt-1 pb-2 text-sm">
          {isInputFocused ? (
            <div>
              <p className="font-semibold">Tìm gần đây</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-evenly">
                <button
                  className={`focus:outline-none ${
                    activeTab === "all"
                      ? "text-blue-500 font-semibold underline underline-offset-8"
                      : "font-semibold text-gray-500"
                  }`}
                  onClick={() => changeTab("all")}
                >
                  <p>Tất cả</p>
                </button>
                <button
                  className={`focus:outline-none ${
                    activeTab === "unread"
                      ? "text-blue-500 font-semibold underline underline-offset-8"
                      : "font-semibold text-gray-500"
                  }`}
                  onClick={() => changeTab("unread")}
                >
                  <p className="ml-10">Chưa đọc</p>
                </button>
              </div>
              <div className="flex items-center justify-evenly ml-auto">
                <div className="flex items-center ">
                  <button className="flex mr-1">
                    Phân loại
                    <FaSortDown className="pb-1" size={20} />
                  </button>
                </div>
                <button>
                  <IoIosMore size={20} opacity={1.8} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="h-[calc(100%-110px)] bg-white border overflow-y-auto">
        {isInputFocused ? (
          <>
            {friendList.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between hover:bg-gray-200 transition-colors duration-300 ease-in-out p-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                  selectedFriendToChat(friend);
                  setListChatCurrent((prev) => {
                    const newList = [...prev];
                    const index = newList.findIndex(
                      (item) => item.id === friend.id
                    );
                    if (index !== -1) {
                      newList.splice(index, 1);
                    }
                    newList.unshift(friend);
                    return newList;
                  });
                  setIsInputFocused(false);
                  setIsChatSelected(friend.id);
                }}
              >
                <div className="bg-blue w-14 ">
                  <img
                    className="rounded-full w-14 h-14"
                    src={friend.avatar}
                    alt="cloud"
                  />
                </div>
                <div className="flex mr-auto ml-2 p-1">
                  <p className="font-semibold ">{friend.name}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="h-full w-full max-h-full">
              {activeTab === "all" ? (
                <>
                  <div
                    className="flex justify-between p-2 hover:bg-gray-200 transition-colors duration-300 ease-in-out"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div className="bg-blue w-14 ">
                      <img
                        className="rounded-full"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Circle-icons-cloud.svg/768px-Circle-icons-cloud.svg.png"
                        alt="cloud"
                      />
                    </div>
                    <div className="flex-col mr-auto ml-2 p-1">
                      <p className="font-semibold">Cloud của tôi</p>
                      <p
                        className="text-gray-600 mt-auto"
                        style={{ fontSize: 14 }}
                      >
                        Bạn: Giáo trình
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-sm hover:text-gray-600"
                        style={{ fontSize: 12 }}
                      >
                        {isHovered ? (
                          <button>
                            <IoIosMore size={20} opacity={1.8} />
                          </button>
                        ) : (
                          "Hôm qua"
                        )}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {listChatCurrent.map((friend) => (
                <div
                  key={friend.id}
                  className={`flex justify-between hover:bg-gray-200 transition-colors duration-300 ease-in-out p-2 ${
                    isChatSelected === friend.id ? "bg-gray-200" : ""
                  }`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => {
                    userChat(friend);
                    setIsChatSelected(friend.id);
                  }}
                >
                  <div className="bg-blue w-14 ">
                    <img
                      className="rounded-full w-14 h-14"
                      src={friend.avatar}
                      alt="cloud"
                    />
                  </div>
                  <div className="flex-col mr-auto ml-2 p-1">
                    <p className="font-semibold ">
                      {friend?.name?.length > 15
                        ? `${friend?.name.slice(0, 15)}...`
                        : friend?.name}
                    </p>
                    <p
                      className="text-gray-600 mt-auto "
                      style={{ fontSize: 14 }}
                    >
                      {friend?.lastMessage?.senderId === authUser._id
                        ? "Bạn: "
                        : ""}
                      {friend?.lastMessage?.contents
                        ? friend.lastMessage.contents[0]?.type === "text"
                          ? friend?.lastMessage?.contents.length > 15
                            ? `${friend?.lastMessage?.contents[0].data.slice(
                                0,
                                15
                              )}...`
                            : friend?.lastMessage?.contents[0].data
                          : friend?.lastMessage?.contents[0]?.type === "image"
                          ? "Hình ảnh"
                          : "Tệp đính kèm"
                        : language === "vi"
                        ? "Chưa có tin nhắn"
                        : "No message yet"}

                      {friend?.unread ? (
                        <span className="text-blue-500"> (1)</span>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-sm hover:text-gray-600"
                      style={{ fontSize: 12 }}
                    >
                      {isHovered ? (
                        <button>
                          <IoIosMore size={20} opacity={1.8} />
                        </button>
                      ) : !showUnread ? (
                        friend.unread ? (
                          "Chưa đọc"
                        ) : (
                          "Hôm qua"
                        )
                      ) : friend.unread ? (
                        "Chưa đọc"
                      ) : (
                        "Hôm qua"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ListChatComponent;
