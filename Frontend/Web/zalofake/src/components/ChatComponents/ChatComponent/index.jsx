import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { PiUserSwitchThin } from "react-icons/pi";
import ListChatComponent from "../ListChatComponent";
import PeopleChatComponent from "../PeopleChatComponent";
import { MdCameraAlt } from "react-icons/md";
import { HiMagnifyingGlass } from "react-icons/hi2";

function ChatComponents({ language }) {
  const [isAddFriend, setIsAddFriend] = useState(false);
  const [isAddGroup, setIsAddGroup] = useState(false);

  const [phone, setPhone] = useState("");
  const [nameGroup, setNameGroup] = useState("");
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [isInputFocusGroup, setIsInputFocusGroup] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [showAllNewFriends, setShowAllNewFriends] = useState(false);
  const [activeButton, setActiveButton] = useState("Tất cả");

  const visibleFriends = showAllNewFriends
    ? friendList
    : friendList.slice(0, 3);

  useEffect(() => {
    const newFriendList = [];
    for (let i = 0; i < 20; i++) {
      newFriendList.push({
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        avatar: faker.image.avatar(),
        unread: faker.datatype.boolean(),
        isChecked: false,
      });
    }
    setFriendList(newFriendList);
  }, []);

  console.log(friendList.slice(0, 3));
  const handleRadioChange = (friendId) => {
    setFriendList((prevList) =>
      prevList.map((friend) =>
        friend.id === friendId
          ? { ...friend, isChecked: !friend.isChecked }
          : friend
      )
    );
  };

  const buttons = [
    "Tất cả",
    "Khách hàng",
    "Gia đình",
    "Công việc",
    "Bạn bè",
    "Trả lời sau",
    "Đồng nghiệp",
  ];
  return (
    <>
      <div className="relative bg-gray-100 h-screen w-full flex">
        <div className="h-screen w-full sm:w-96 bg-white">
          <ListChatComponent
            language={language}
            isAddFriend={setIsAddFriend}
            isAddGroup={setIsAddGroup}
          />
        </div>
        <PeopleChatComponent language={language} />
        {isAddFriend && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-[90%] bg-white rounded-lg shadow-lg ">
            <div className=" flex items-center justify-between p-4 border-b text-lg font-semibold h-[10%]">
              <p>Thêm bạn </p>
              <button
                onClick={() => {
                  setIsAddFriend(false);
                  setShowAllNewFriends(false);
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
                    ? " w-full flex items-center border-b mr-auto ml-6 border-blue-500 "
                    : "w-full flex items-center border-b mr-auto ml-6 "
                }`}
              >
                <input
                  type="text"
                  className="h-9 w-full outline-none"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.phone)}
                  onFocus={() => setIsInputFocus(true)}
                  onBlur={() => setIsInputFocus(false)}
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
                {visibleFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex justify-between hover:bg-gray-200 transition-colors duration-300 ease-in-out p-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div className="bg-blue w-10 ">
                      <img
                        className="rounded-full"
                        src={friend.avatar}
                        alt="cloud"
                      />
                    </div>
                    <div className="flex mr-auto ml-2 p-1">
                      <p className="font-semibold ">{friend.name}</p>
                    </div>
                  </div>
                ))}
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
              <div className="flex ml-auto mb-auto mt-1">
                <button
                  className="rounded-lg bg-gray-300 p-3 pl-6 pr-6 mr-3 hover:bg-gray-500"
                  onClick={() => setIsAddFriend(false)}
                >
                  <p className="text-lg font-semibold">Hủy</p>
                </button>
                <button className="rounded-lg bg-blue-500 p-3 pl-6 pr-6 mr-3 hover:bg-blue-800">
                  <p className="text-lg font-semibold">Tìm kiếm</p>
                </button>
              </div>
            </div>
          </div>
        )}
        {isAddGroup && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-[90%] bg-white rounded-lg shadow-lg ">
            <div className=" flex items-center justify-between p-4 border-b text-lg font-semibold h-[10%]">
              <p>Tạo nhóm</p>
              <button
                onClick={() => {
                  setIsAddGroup(false);
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
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <input
                      type="radio"
                      className="mr-2"
                      checked={friend.isChecked}
                      onChange={() => handleRadioChange(friend.id)}
                    />
                    <div className="bg-blue w-10 ">
                      <img
                        className="rounded-full"
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
                  onClick={() => setIsAddGroup(false)}
                >
                  <p className="text-lg font-semibold">Hủy</p>
                </button>
                <button className="rounded-lg bg-blue-500 p-3 pl-6 pr-6 mr-3 hover:bg-blue-800">
                  <p className="text-lg font-semibold">Tìm kiếm</p>
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
