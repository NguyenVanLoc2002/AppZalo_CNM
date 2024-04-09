import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FaSortDown } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

import useConversation from "../../../hooks/useConversation";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useSocketContext } from "../../../contexts/SocketContext";

function ListChatComponent({ language, showModal, userChat, friends }) {
  const [valueSearch, setValueSearch] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showUnread, setShowUnread] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [originalFriendList, setOriginalFriendList] = useState([]);
  const [listChatCurrent, setListChatCurrent] = useState([]);
  const [isChatSelected, setIsChatSelected] = useState("");
  const { conversations, getConversations } = useConversation();
  const { authUser } = useAuthContext();
  const { socket } = useSocketContext();

  useEffect(() => {
    getConversations();
    setOriginalFriendList(friends);
    setFriendList(friends);
  }, [friends]);

  useEffect(() => {
    const listChat = conversations.map((conversation) => {
      const friend = conversation.participants.find(
        (participant) => participant.phone !== authUser.phone
      );

      return {
        id: friend._id,
        name: friend.profile.name,
        avatar: friend.profile.avatar?.url || "/zalo.svg",
        unread: conversation.messages.some(
          (message) => message.receiver === authUser.phone && !message.isRead
        ),
        lastMessage: conversation.lastMessage,
      };
    });
    setListChatCurrent(listChat);

    if (socket) {
      socket.on("new_message", ({ message }) => {
        console.log("new_message form list", message);
        getConversations();
      });
    }
  }, [conversations || socket]);

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
                  userChat(friend);
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
                      {friend.name.length > 15
                        ? `${friend.name.slice(0, 15)}...`
                        : friend.name}
                    </p>
                    <p
                      className="text-gray-600 mt-auto "
                      style={{ fontSize: 14 }}
                    >
                      {friend.lastMessage?.senderId === authUser._id
                        ? "Bạn: "
                        : ""}
                      {friend.lastMessage?.contents[0].type === "text"
                        ? friend.lastMessage?.contents[0].data
                        : "File: "}

                      {friend.unread ? (
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
