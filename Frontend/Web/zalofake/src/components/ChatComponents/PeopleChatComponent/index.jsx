import { useState } from "react";
import { AiFillLike, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiScreenshot, BiSmile } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaAddressCard, FaCaretDown, FaVideo } from "react-icons/fa";
import { FiCheckSquare } from "react-icons/fi";
import { IoIosLink } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";
import { LuPencilLine, LuSticker } from "react-icons/lu";
import { MdFormatColorText, MdPhone } from "react-icons/md";
import {
  PiBellRingingThin,
  PiDesktopDuotone,
  PiMagnifyingGlass,
  PiTagSimpleLight,
} from "react-icons/pi";
import { RiBatteryChargeLine } from "react-icons/ri";
import { TfiAlarmClock } from "react-icons/tfi";
import { TiPinOutline } from "react-icons/ti";

function PeopleChatComponent({ language }) {
  const [content, setContent] = useState("");
  const chats = [];

  for (let i = 0; i < 10; i++) {
    chats.push(
      <div
        key={i}
        className={`chat ${i % 2 === 0 ? "chat-start" : "chat-end"}`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-header">
          {i % 2 === 0 ? "Obi-Wan Kenobi" : "Anakin"}
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">
          {i % 2 === 0 ? "You were the Chosen One!" : "I hate you!"}
        </div>
        <div className="chat-footer opacity-50">
          {i % 2 === 0 ? "Delivered" : `Seen at 12:${46 + i}`}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="h-screen w-full bg-white w-7/12 border-r">
        <div className="h-[70px] bg-white flex justify-between items-center border-b">
          <div className="flex items-center">
            <img src="zalo.svg" alt="avatar" />
          </div>
          <div className="flex-col items-center mr-auto ml-2">
            <p className="text-lg font-semibold">Le Nguyen Sinh</p>
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
            <button className="bg-blue-100 p-2 rounded">
              <PiDesktopDuotone size={18} fill="blue" />
            </button>
          </div>
        </div>

        {/*Content Chat */}
        <div className="h-[calc(100%-170px)] pl-3 pr-3 overflow-y-auto">
          {chats}
        </div>

        <div className="h-[100px] bg-white flex-col border-t">
          <div className="h-[40%] bg-white flex justify-between items-center border-b p-1">
            <button className="hover:bg-gray-300 p-2 rounded">
              <LuSticker size={20} />
            </button>
            <button className="hover:bg-gray-300 p-2 rounded">
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
        </div>
      </div>
      <div className="h-screen w-full bg-gray w-3/12">
        <div className="h-[70px] bg-white flex justify-center items-center border-b">
          <p className="text-lg font-medium">Thông tin hội thoại</p>
        </div>
        <div className="h-[calc(100%-70px)] items-center  overflow-y-auto">
          <div className="h-[200px] bg-white items-center flex-col">
            <div className="flex justify-center pt-2">
              <img src="zalo.svg" alt="avatar" />
            </div>
            <div className="flex justify-center pt-2">
              <p className="text-lg font-semibold">Le Nguyen Sinh</p>
              <div className="flex items-center ml-2 rounded-full bg-gray-200 p-1 hover:bg-gray-400">
                <button>
                  <LuPencilLine size={20} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex-col items-center justify-center">
                <button className="flex items-center ml-2 rounded-full bg-gray-200 p-1 hover:bg-gray-400">
                  <PiBellRingingThin size={22} />
                </button>
                <p className="text-pretty flex items-center ">Tắt thông báo</p>
              </div>
              <div className="flex-col items-center ">
                <button className="flex items-center ml-2 rounded-full bg-gray-200 p-1 hover:bg-gray-400">
                  <TiPinOutline size={22} />
                </button>
                <p className="text-pretty  ">Ghim hội thoại </p>
              </div>
              <div className="flex-col items-center">
                <button className="flex items-center ml-2 rounded-full bg-gray-200 p-1 hover:bg-gray-400">
                  <AiOutlineUsergroupAdd size={22} />
                </button>
                <p className="text-balance ">Tạo nhóm trò truyện</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PeopleChatComponent;
