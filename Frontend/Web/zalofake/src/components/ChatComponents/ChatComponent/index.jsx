import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { PiUserSwitchThin } from "react-icons/pi";
import ListChatComponent from "../ListChatComponent";
import PeopleChatComponent from "../PeopleChatComponent";
import { MdCameraAlt } from "react-icons/md";
import { HiMagnifyingGlass } from "react-icons/hi2";
import useFriend from "../../../hooks/useFriend";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../../contexts/AuthContext";
import { FaBullseye } from "react-icons/fa6";
import axiosInstance from "../../../api/axiosInstance";

function ChatComponents({ language }) {
  const [userChat, setUserChat] = useState(null);
  const {
    friends,
    recommendedFriends,
    loading,
    getAllFriends,
    getFriendByPhone,
    getRecommendedFriends,
    addFriend,
    acceptFriend,
    unFriend,
    rejectFriend,
    cancelFriendRequest,
  } = useFriend();
  const { authUser, reloadAuthUser } = useAuthContext();

  const [phone, setPhone] = useState("");
  const [nameGroup, setNameGroup] = useState("");
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [isInputFocusGroup, setIsInputFocusGroup] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [showAllNewFriends, setShowAllNewFriends] = useState(false);
  const [activeButton, setActiveButton] = useState("Tất cả");
  const [recommentFriendList, setRecommentFriendList] = useState();
  const [friendToAdd, setFriendToAdd] = useState("");
  const [isShowModal, setIsShowModal] = useState("");
  const [shareMessage, setShareMessage] = useState();
  const [valueSearch, setValueSearch] = useState("");
  const [originalFriendList, setOriginalFriendList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  console.log("shareMessage", shareMessage);

  const sendMessage = async (data, receiverId) => {
    try {
      if (!data || data.trim === "") return;
      // console.log("data: ", data);
      if (receiverId) {
        const response = await axiosInstance.post(
          `chats/${receiverId}/${
            data.type.startsWith("video/") ? "sendVideo" : "sendMessage"
          }`,
          { data: data },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("response 1: ", response.data.data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const visibleFriends = showAllNewFriends
    ? recommentFriendList
    : recommentFriendList?.slice(0, 3);

  useEffect(() => {
    const fetchFriends = async () => {
      await getAllFriends();
      await getRecommendedFriends();
    };
    fetchFriends();
  }, [authUser]);

  useEffect(() => {
    setFriendList(friends);
    setOriginalFriendList(friends);
    setRecommentFriendList(recommendedFriends);
  }, [friends, recommendedFriends]);

  const handleRadioChange = (friendId) => {
    setFriendList((prevList) =>
      prevList.map((friend) =>
        friend.id === friendId
          ? { ...friend, isChecked: !friend.isChecked }
          : friend
      )
    );
  };

  const changeShowModal = (modal) => {
    setIsShowModal(modal);
  };

  const handleSearch = async () => {
    if (phone === "") {
      setRecommentFriendList(recommendedFriends);
      toast.error(
        language == "vi"
          ? "Vui lòng nhập số điện thoại để tìm kiếm"
          : "Please enter a phone number to search"
      );
      return;
    }
    const userSearch = await getFriendByPhone(phone);
    if (userSearch) {
      setRecommentFriendList([userSearch]);
      setShowAllNewFriends(true);
    }
    return;
  };

  const handleAddFriend = async (friend) => {
    setFriendToAdd(friend.phone);
    await addFriend(friend.phone);
    await reloadAuthUser();
  };

  const handleAcceptFriend = async (friend) => {
    await acceptFriend(friend.phone);
    await reloadAuthUser();
  };

  const handleUnFriend = async (friend) => {
    await unFriend(friend.phone);
    await reloadAuthUser();
  };

  const handleRejectFriend = async (friend) => {
    await rejectFriend(friend.phone);
    await reloadAuthUser();
  };

  const handleCancelFriendRequest = async (friend) => {
    await cancelFriendRequest(friend.phone);
    await reloadAuthUser();
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    console.log("searchTerm", searchTerm);
    console.log("originalFriendList", originalFriendList);
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

  const handleCheckboxChange = (friendId) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  console.log("selectedFriends: ", selectedFriends);

  const buttons = [
    "Tất cả",
    "Khách hàng",
    "Gia đình",
    "Công việc",
    "Bạn bè",
    "Trả lời sau",
    "Đồng nghiệp",
  ];

  const sendMessageToSelectedFriends = async (content) => {
    for (const receiverId of selectedFriends) {
      try {
        await sendMessage(content, receiverId);
        console.log(`Sent message to user ${receiverId} successfully.`);
      } catch (error) {
        console.error(`Error sending message to user ${receiverId}:`, error);
      }
    }
  };

  const handleSendButtonClick = () => {
    if (selectedFriends.length === 0) {
      console.log('Please select friends to send message to.');
      return;
    }
    console.log("Nội dung:",shareMessage.contents[0]);
    sendMessageToSelectedFriends(shareMessage.contents[0]);
    setIsShowModal(false);
  };

  return (
    <>
      <div className="relative bg-gray-100 h-screen w-full flex">
        <div className="h-screen w-full sm:w-96 bg-white">
          <ListChatComponent
            language={language}
            userChat={setUserChat}
            showModal={changeShowModal}
            friends={friendList}
          />
        </div>
        <PeopleChatComponent
          language={language}
          userChat={userChat}
          showModal={changeShowModal}
          shareMessage={setShareMessage}
        />
        {isShowModal === "addFriend" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-[90%] bg-white rounded-lg shadow-lg ">
            <div className=" flex items-center justify-between p-4 border-b text-lg font-semibold h-[10%]">
              <p>Thêm bạn </p>
              <button
                onClick={() => {
                  setIsShowModal("");
                  setShowAllNewFriends(false);
                  setRecommentFriendList(recommendedFriends);
                  setPhone("");
                }}
              >
                x
              </button>
            </div>
            <div className=" flex items-center justify-between p-4 h-[10%]">
              <button className="flex items-center border-b pb-1 w-40">
                <img
                  src="https://emojigraph.org/media/apple/flag-vietnam_1f1fb-1f1f3.png"
                  alt="flag"
                  className="w-8 h-8"
                />
                <p className="text-base font-semibold ml-2">(+84)</p>
                <FaCaretDown size={23} fill="gray" className="ml-2" />
              </button>

              <div
                className={`${
                  isInputFocus === true
                    ? "flex border-b mr-auto ml-6 w-full border-blue-500  "
                    : "flex  border-b mr-auto ml-6 w-full "
                }`}
              >
                <input
                  type="text"
                  className="h-9 w-full outline-none"
                  placeholder={
                    language == "vi"
                      ? "Nhập số điện thoại"
                      : "Enter your phone number"
                  }
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div
              className={`flex-col p-4 mb-3 h-[65%] ${
                showAllNewFriends ? "overflow-y-auto" : "overflow-y-hidden"
              }`}
            >
              <div className="flex items-center">
                <PiUserSwitchThin size={16} fill="gray" />
                <p className="text-sm text-gray-500 ml-2">Có thể bạn quen</p>
              </div>
              <div className="flex-col h-screen mt-2">
                {visibleFriends.map((friend) => {
                  const isFriend = friendList.some((f) => f.id === friend.id);
                  const isSent = authUser?.requestSent?.some(
                    (f) => f === friend.id
                  );

                  return (
                    <div
                      key={friend.id}
                      className="flex justify-between hover:bg-gray-200 transition-colors duration-300 ease-in-out p-2"
                    >
                      <div className="bg-blue w-10 ">
                        <img
                          className="rounded-full w-10 h-10"
                          src={friend.avatar || "/zalo.svg"}
                          alt="cloud"
                        />
                      </div>
                      <div className="flex mr-auto ml-2 p-1">
                        <p className="font-semibold ">
                          {friend.name || friend.profile.name}
                        </p>
                      </div>

                      {!isFriend && (
                        <>
                          {!isSent ? (
                            <button
                              className="bg-primary p-2 pl-4 pr-4 rounded-lg hover:bg-primaryHover"
                              onClick={() => handleAddFriend(friend)}
                            >
                              <p className="text-white">
                                {loading && friendToAdd === friend.phone ? (
                                  <span className="loading loading-spinner"></span>
                                ) : language == "vi" ? (
                                  "Kết bạn"
                                ) : (
                                  "Add friend"
                                )}
                              </p>
                            </button>
                          ) : (
                            <button className="bg-gray-200 p-2 pl-4 pr-4 rounded-lg hover:bg-slate-300">
                              <p className="text-md hover:font-semibold">
                                {language == "vi" ? "Đã gửi" : "Sent"}
                              </p>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
                {!showAllNewFriends && visibleFriends.length <= 3 && (
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => setShowAllNewFriends(true)}
                  >
                    Xem thêm
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center border-t h-[15%]">
              <div className="flex ml-auto mb-auto mt-3">
                <button
                  className="rounded-lg bg-gray-300 p-3 pl-6 pr-6 mr-3 hover:bg-gray-500"
                  onClick={() => setIsShowModal("")}
                >
                  <p className="text-lg font-semibold">
                    {language == "vi" ? "Hủy" : "Cancel"}
                  </p>
                </button>
                <button
                  className="rounded-lg bg-primary p-3 pl-6 pr-6 mr-3 hover:bg-primaryHover"
                  onClick={handleSearch}
                >
                  <p className="text-lg font-semibold text-white">
                    {language == "vi" ? "Tìm Kiếm" : "Search"}
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}
        {isShowModal === "addGroup" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-60 w-3/5 h-[90%] bg-white rounded-lg shadow-lg ">
            <div className=" flex items-center justify-between p-4 border-b text-lg font-semibold h-[10%]">
              <p>Tạo nhóm</p>
              <button
                onClick={() => {
                  setIsShowModal("");
                  setShowAllNewFriends(false);
                }}
              >
                x
              </button>
            </div>
            <div className=" flex items-center justify-between pl-4 pr-4 pt-2 h-[10%]">
              <button className="flex rounded-full border p-3">
                <MdCameraAlt size={25} fill="gray" />
              </button>
              <div
                className={`${
                  isInputFocusGroup === true
                    ? "flex border-b mr-auto ml-6 w-full border-blue-500  "
                    : "flex  border-b mr-auto ml-6 w-full "
                } `}
              >
                <input
                  type="text"
                  className="h-9 w-full outline-none "
                  placeholder="Tên nhóm"
                  value={nameGroup}
                  onChange={(e) => setNameGroup(e.target.nameGroup)}
                  onFocus={() => setIsInputFocusGroup(true)}
                  onBlur={() => setIsInputFocusGroup(false)}
                />
              </div>
            </div>
            <div
              className={` h-[8%] flex items-center rounded-full border  m-4 mt-2 mb-2 ${
                isInputFocusGroup === true ? " border-blue-500 " : ""
              } `}
            >
              <HiMagnifyingGlass size={18} className="ml-2" />
              <input
                type="text"
                className="h-[97%] w-[89%] outline-none ml-2 "
                placeholder="Nhập tên, số điện thoại hoặc danh sách số điện thoại"
                value={nameGroup}
                onChange={(e) => setNameGroup(e.target.nameGroup)}
                onFocus={() => setIsInputFocusGroup(true)}
                onBlur={() => setIsInputFocusGroup(false)}
              />
            </div>
            <div className=" h-[15%] flex items-center  pl-4 pr-4 pb-4 overflow-x-auto  w-full border-b">
              {buttons.map((label, index) => (
                <button
                  key={index}
                  className={`"flex rounded-2xl  p-1 pl-3 pr-3 mr-3 whitespace-nowrap ${
                    activeButton === label
                      ? "bg-blue-600  hover:bg-blue-800 text-white"
                      : "bg-gray-300  hover:bg-gray-400"
                  } "`}
                  onClick={() => setActiveButton(label)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className=" h-[42%] flex-col pt-2 p-4 items-center overflow-y-auto">
              <p className="font-semibold">Trò chuyện gần đây</p>
              <div className="flex-col max-h-44 mt-2">
                {friendList.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center  justify-between hover:bg-gray-200 transition-colors duration-300 ease-in-out p-2"
                  >
                    <input
                      type="radio"
                      className="mr-2"
                      checked={friend.isChecked}
                      onChange={() => handleRadioChange(friend.id)}
                    />
                    <div className="bg-blue w-10 ">
                      <img
                        className="rounded-full w-10 h-10"
                        src={friend.avatar}
                        alt="cloud"
                      />
                    </div>
                    <div className="flex mr-auto ml-2 p-1">
                      <p className="font-semibold ">{friend.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center border-t h-[15%]">
              <div className="flex ml-auto mb-auto mt-1">
                <button
                  className="rounded-lg bg-gray-300 p-3 pl-6 pr-6 mr-3 hover:bg-gray-500"
                  onClick={() => setIsShowModal("")}
                >
                  <p className="text-lg font-semibold">
                    {language == "vi" ? "Hủy" : "Cancel"}
                  </p>
                </button>
                <button
                  className="rounded-lg bg-blue-500 p-3 pl-6 pr-6 mr-3 hover:bg-blue-800"
                  onClick={handleSearch}
                >
                  <p className="text-lg font-semibold">
                    {language == "vi" ? "Tìm Kiếm" : "Search"}
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}
        {isShowModal === "share" && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-[90%] bg-white rounded-lg shadow-lg ">
            <div className=" flex items-center justify-between p-4 border-b text-lg font-semibold h-[10%]">
              <p>Chia sẻ</p>
              <button
                onClick={() => {
                  setIsShowModal("");
                  setShowAllNewFriends(false);
                }}
              >
                x
              </button>
            </div>

            <div className=" flex items-center justify-between p-4 h-[10%]">
              <div className="flex  border-b mr-auto ml-6 w-full justify-between items-center">
                <HiMagnifyingGlass size={18} className="mx-3" />
                <input
                  type="text"
                  className="h-9 w-full outline-none"
                  placeholder={
                    language == "vi" ? "Tìm Kiếm bạn bè" : "Search for friends"
                  }
                  value={valueSearch}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className=" h-[50%] flex-col pt-2 p-4 items-center overflow-y-auto">
              <p className="font-semibold">
                {language == "vi" ? "Danh sách bạn bè" : "List of friends"}
              </p>
              <div className="flex-col max-h-44 mt-2">
                {friendList.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center  justify-between hover:bg-gray-200 transition-colors duration-300 ease-in-out p-2"
                  >
                    <div className="bg-blue w-10 flex">
                      <input
                        className=""
                        type="checkbox"
                        checked={selectedFriends.includes(friend.id)}
                        onChange={() => handleCheckboxChange(friend.id)}
                      />
                      <img
                        className="rounded-full w-10 h-10 ml-2"
                        src={friend.avatar}
                        alt="cloud"
                      />
                    </div>
                    <div className="flex mr-auto ml-6 p-1">
                      <p className="font-semibold ">{friend.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col pl-4 pr-4 pb-4 overflow-x-auto h-[20%] border w-full rounded-lg">
              <h1 className="font-bold w-full border-b py-2">
                {language == "vi"
                  ? "Nội dung chia sẻ:"
                  : "Content to be shared :"}
              </h1>

              {shareMessage.contents[0].type === "text" && (
                <p className="text-base font-semibold">
                  {shareMessage.contents[0].data}
                </p>
              )}
              {shareMessage.contents[0].type === "image" && (
                <div className="p-3 flex justify-center items-center">
                  <img
                    src={shareMessage.contents[0].data}
                    alt="share"
                    className="w-full h-full rounded-sm object-cover"
                  />
                </div>
              )}

              {shareMessage.contents[0].type === "video" && (
                <div>
                  <video
                    controls
                    className="pr-2 pb-2"
                    style={{ width: "auto", height: "250px" }}
                  >
                    <source
                      src={shareMessage.contents[0].data}
                      type="video/mp4"
                    />
                    <source
                      src={shareMessage.contents[0].data}
                      type="video/webm"
                    />
                    <source
                      src={shareMessage.contents[0].data}
                      type="video/ogg"
                    />
                    <source
                      src={shareMessage.contents[0].data}
                      type="video/x-matroska"
                    />
                    <source
                      src={shareMessage.contents[0].data}
                      type="video/x-msvideo"
                    />
                    <source
                      src={shareMessage.contents[0].data}
                      type="video/quicktime"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>

            <div className="flex items-center h-[10%] ">
              <div className="flex ml-auto mb-auto mt-1">
                <button
                  className="rounded-lg bg-gray-300 p-2 pl-6 pr-6 mr-3 hover:bg-gray-500"
                  onClick={() => setIsShowModal("")}
                >
                  <p className="text-lg font-semibold">
                    {language == "vi" ? "Hủy" : "Cancel"}
                  </p>
                </button>
                <button
                  className="rounded-lg bg-primary  p-2 pl-6 pr-6 mr-3 hover:bg-primaryHover"
                  onClick={handleSendButtonClick}
                >
                  <p className="text-lg text-white font-semibold">
                    {language == "vi" ? "Chia sẻ" : "Share"}
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatComponents;
