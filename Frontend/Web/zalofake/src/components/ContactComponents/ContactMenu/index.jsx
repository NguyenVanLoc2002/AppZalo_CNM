import { CiSearch } from "react-icons/ci";
import { AiOutlineUsergroupAdd, AiOutlineUserAdd } from "react-icons/ai";
import { RiContactsLine } from "react-icons/ri";
import { RiGroupLine } from "react-icons/ri";
import { LuMailOpen } from "react-icons/lu";

import { useState } from "react";

function ContactMenu({ language, changeTab }) {
  const [tabSelected, setTabSelected] = useState();
  return (
    <>
      <div className="h-[70px] bg-white flex justify-between items-center border-r">
        <div className="bg-gray-200 rounded-lg ml-5 w-3/4">
          <div className="flex items-center justify-center px-3">
            <CiSearch size={20} />
            <input
              type="text"
              className="h-9 w-full bg-transparent outline-none px-3"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="px-3 w-1/4 flex items-center justify-evenly">
          <AiOutlineUserAdd size={18} opacity={0.8} />
          <AiOutlineUsergroupAdd size={20} opacity={0.8} />
        </div>
      </div>
      <div className="h-[calc(100%-70px)] bg-white border">
        <div className="h-full w-full">
          <div
            className={[
              "flex items-center text-xl font-semibold py-5 ",
              tabSelected == 0 ? " bg-[#e5efff] " : " hover:bg-gray-100 ",
            ]}
            onClick={() => {
                setTabSelected(0);
                changeTab(0);
            }}
          >
            <RiContactsLine size={18} className="mx-5" />
            <p className="text-xl">
              {language == "vi" ? "Danh sách bạn bè" : "Friend list"}
            </p>
          </div>
          <div
            className={[
              "flex items-center text-xl font-semibold py-5 ",
              tabSelected == 1 ? " bg-[#e5efff] " : " hover:bg-gray-100 ",
            ]}
            onClick={() => {
                setTabSelected(1);
                changeTab(1);
            }}
          >
            <RiGroupLine size={18} className="mx-5" />
            <p className="text-xl">
            {language == "vi" ? "Danh sách nhóm" : "Joined groups"}
              
            </p>
          </div>
          <div
            className={[
              "flex items-center text-xl font-semibold py-5 ",
              tabSelected == 2 ? " bg-[#e5efff] " : " hover:bg-gray-100 ",
            ]}
            onClick={() => {
                setTabSelected(2);
                changeTab(2);
            }}
          >
            <LuMailOpen size={18} className="mx-5" />
            <p className="text-xl">
              {language == "vi" ? "Lời mời kết bạn" : "Friend requests"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactMenu;
