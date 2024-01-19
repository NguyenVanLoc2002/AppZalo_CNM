import React, { useState } from "react";

import { BsChatText, BsChatTextFill } from "react-icons/bs";
import { RiContactsBookLine, RiContactsBookFill } from "react-icons/ri";
import { FaCheckSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { CiCloudOn } from "react-icons/ci";

function Sidebar({ curentTab, changeTab }) {
  const [tabSelected, setTabSelected] = useState(curentTab);

  return (
    <>
      <div className="bg-[#0091ff] h-full w-20 grid grid-rows-12">
        <div
          className="h-20 w-20 flex justify-center items-center row-span-1"
          onClick={() => {
            setTabSelected(curentTab == 0 ? 6 : 0);
            changeTab(curentTab == 0 ? 6 : 0);
          }}
        >
          <img src="zalo.svg" alt="avatar" className="w-12 h-12 mt-10" />
        </div>
        <div className="row-span-9">
          <div className="mt-3">
            <div
              className={[
                " h-20 w-20 flex justify-center items-center hover:bg-[#006edc] ",
                tabSelected == 1 ? " bg-[#006edc] " : " ",
              ]}
              onClick={() => {
                setTabSelected(1);
                changeTab(1);
              }}
            >
              {tabSelected == 1 ? (
                <BsChatTextFill size={28} color="#ffffff" />
              ) : (
                <BsChatText size={28} color="#ffffff" />
              )}
            </div>
            <div
              className={[
                " h-20 w-20 flex justify-center items-center hover:bg-[#006edc] ",
                tabSelected == 2 ? " bg-[#006edc] " : " ",
              ]}
              onClick={() => {
                setTabSelected(2);
                changeTab(2);
              }}
            >
              {tabSelected == 2 ? (
                <RiContactsBookFill size={28} color="#ffffff" />
              ) : (
                <RiContactsBookLine size={28} color="#ffffff" />
              )}
            </div>
            <div
              className={[
                " h-20 w-20 flex justify-center items-center hover:bg-[#006edc] ",
                tabSelected == 3 ? " bg-[#006edc] " : " ",
              ]}
              onClick={() => {
                setTabSelected(3);
                changeTab(3);
              }}
            >
              {tabSelected == 3 ? (
                <FaCheckSquare size={28} color="#ffffff" />
              ) : (
                <FaRegSquareCheck size={28} color="#ffffff" />
              )}
            </div>
          </div>
        </div>
        <div className="row-span-2">
          <div
            className={[
              "h-20 w-20 flex justify-center items-center hover:bg-[#006edc] active:bg-[#006edc]",
              tabSelected == 4 ? " bg-[#006edc] " : " ",
            ]}
            onClick={() => {
              setTabSelected(4);
              changeTab(4);
            }}
          >
            <CiCloudOn size={28} color="#ffffff" />
          </div>
          <div
            className={[
              " h-20 w-20 flex justify-center items-center hover:bg-[#006edc] ",
              tabSelected == 5 ? " bg-[#006edc] " : " ",
            ]}
            onClick={() => {
              setTabSelected(curentTab == 5 ? 6 : 5);
              changeTab(curentTab == 5 ? 6 : 5);
            }}
          >
            {tabSelected == 5 ? (
              <IoSettingsSharp size={28} color="#ffffff" />
            ) : (
              <IoSettingsOutline size={28} color="#ffffff" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
