import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { PiUserSwitchThin } from "react-icons/pi";
import ListChatComponent from "../ListChatComponent";
import PeopleChatComponent from "../PeopleChatComponent";

function ChatComponents({ language }) {
  const [isAddFriend, setIsAddFriend] = useState(false);
  const [phone, setPhone] = useState("");
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [showAllNewFriends, setShowAllNewFriends] = useState(false);

  const visibleFriends = showAllNewFriends
    ? friendList
    : friendList.slice(0, 3);
  console.log(showAllNewFriends);

  useEffect(() => {
    const newFriendList = [];
    for (let i = 0; i < 20; i++) {
      newFriendList.push({
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        avatar: faker.image.avatar(),
        unread: faker.datatype.boolean(),
      });
    }
    setFriendList(newFriendList);
  }, []);
  return (
    <>
      <div className="relative bg-gray-100 h-screen w-full flex">
        <div className="h-screen w-5/12 bg-white">
          <ListChatComponent language={language} isAddFriend={setIsAddFriend} />
        </div>
        <PeopleChatComponent language={language} />
        {isAddFriend && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/5 h-[550px] bg-white rounded-lg shadow-lg ">
            <div className=" flex items-center justify-between p-4 border-b text-lg font-semibold">
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
            <div className=" flex items-center justify-between p-4 ">
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
              className={`flex-col overflow-y-auto p-4 mb-3 ${
                showAllNewFriends ? "max-h-80" : ""
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
            <div className="flex items-center p-2 border-t">
              <div className="flex ml-auto">
                <button className="rounded-lg bg-gray-300 p-3 pl-6 pr-6 mr-3 hover:bg-gray-500">
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
