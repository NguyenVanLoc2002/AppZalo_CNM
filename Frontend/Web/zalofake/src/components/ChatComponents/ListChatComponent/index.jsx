import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FaCaretDown, FaSortDown } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { PiDotsNine, PiDotsThree } from "react-icons/pi";

function ListChatComponent({ language }) {
  const [valueSearch, setValueSearch] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [friendList, setFriendList] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showUnread, setShowUnread] = useState(false);

  var newFriendList = [];

  useEffect(() => {
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

  const changeTab = (tab) => {
    setActiveTab(tab);
    if (tab === "all") {
      setFriendList(friendList);
      setShowUnread(false);
     
    } else if (tab === "unread") {
      const listFriendUnread = friendList.filter((friend) => friend.unread);
      setFriendList(listFriendUnread);
      setShowUnread(true);
     
    }
  };

  return (
    <>
      <div className="border-r">
        <div className="h-[70px] bg-white flex justify-between items-center">
          <div className="bg-gray-200 rounded-lg ml-5 w-3/4">
            <div className="flex items-center justify-center px-3">
              <CiSearch size={20} />
              <input
                type="text"
                className="h-9 w-full bg-transparent outline-none px-3"
                placeholder="Search"
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.valueSearch)}
              />
            </div>
          </div>
          <div className="px-3 w-1/4 flex items-center justify-evenly">
            <AiOutlineUserAdd size={18} opacity={0.8} />
            <AiOutlineUsergroupAdd size={20} opacity={0.8} />
          </div>
        </div>
        <div className="flex items-center px-5 mt-1 pb-2 text-sm">
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
        </div>
      </div>
      <div className="h-[calc(100%-102px)] bg-white border overflow-y-auto">
        <div className="h-full w-full max-h-full">
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
              <p className="text-gray-600 mt-auto" style={{ fontSize: 14 }}>
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

          {friendList.map((friend) => (
            // eslint-disable-next-line react/jsx-key
            <div
              key={friend.id}
              className="flex justify-between hover:bg-gray-200 transition-colors duration-300 ease-in-out p-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="bg-blue w-14 ">
                <img className="rounded-full" src={friend.avatar} alt="cloud" />
              </div>
              <div className="flex-col mr-auto ml-2 p-1">
                <p className="font-semibold ">{friend.name}</p>
                <p className="text-gray-600 mt-auto " style={{ fontSize: 14 }}>
                  {friend.name}
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
                    friend.unread ? 'Chưa đọc' : 'Hôm qua'
                  ) : (
                    friend.unread ? 'Chưa đọc' : ''
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListChatComponent;
