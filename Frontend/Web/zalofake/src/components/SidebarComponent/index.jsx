import React, { useState } from "react";

import { BsChatText, BsChatTextFill } from "react-icons/bs";
import { RiContactsBookLine, RiContactsBookFill } from "react-icons/ri";
import { FaCheckSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { CiCloudOn } from "react-icons/ci";

function Sidebar({ changeTab, changeMenu }) {
  const [tabSelected, setTabSelected] = useState();
  const [settingClick, setsettingClick] = useState(false);

  return (
    <>
      <div className="bg-[#0091ff] h-full flex flex-col items-center justify-between">
        <div>
          <div
            className="h-20 w-[75px] flex justify-center items-center mt-5"
            onClick={() => {
              changeMenu(1);
            }}
          >
            <img src="zalo.svg" alt="avatar" className="w-12 h-12" />
          </div>
          <div className="invisible md:visible">
            <div
              className={[
                " h-20 w-[75px] flex justify-center items-center hover:bg-[#006edc] ",
                tabSelected == 1 ? " bg-[#006edc] " : " ",
              ]}
              onClick={() => {
                setTabSelected(1);
                changeTab(1);
                setsettingClick(false);
                changeMenu();
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
                " h-20 w-[75px] flex justify-center items-center hover:bg-[#006edc] ",
                tabSelected == 2 ? " bg-[#006edc] " : " ",
              ]}
              onClick={() => {
                setTabSelected(2);
                changeTab(2);
                setsettingClick(false);
                changeMenu();
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
                " h-20 w-[75px] flex justify-center items-center hover:bg-[#006edc] ",
                tabSelected == 3 ? " bg-[#006edc] " : " ",
              ]}
              onClick={() => {
                setTabSelected(3);
                changeTab(3);
                setsettingClick(false);
                changeMenu();
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
        <div>
          <div
            className={[
              "h-20 w-[75px] flex justify-center items-center hover:bg-[#006edc] active:bg-[#006edc]",
              tabSelected == 4 ? " bg-[#006edc] " : " ",
            ]}
            onClick={() => {
              setTabSelected(4);
              changeTab(4);
              setsettingClick(false);
              changeMenu();
            }}
          >
            <CiCloudOn size={28} color="#ffffff" />
          </div>
          <div
            className={[
              " h-20 w-[75px] flex justify-center items-center hover:bg-[#006edc] ",
              settingClick ? " bg-[#006edc] " : " ",
            ]}
            onClick={() => {
              setsettingClick(!settingClick);
              changeMenu(2);
            }}
          >
            {settingClick ? (
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
