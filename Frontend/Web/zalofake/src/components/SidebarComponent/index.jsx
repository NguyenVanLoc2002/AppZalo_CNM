import React, { useState } from "react";
import { BsChatText, BsChatTextFill } from "react-icons/bs";
import { RiContactsBookLine, RiContactsBookFill } from "react-icons/ri";
import { FaCheckSquare } from "react-icons/fa";
import { FaRegSquareCheck } from "react-icons/fa6";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { CiCloudOn } from "react-icons/ci";
import SettingComponent from "../SettingComponent";
import Dropdown from "../dropdown";

function Sidebar({isShowSetting,curentTab}) {
  const [tabSelected, setTabSelected] = useState(curentTab);
  const [isSetting, setIsSetting] = useState(isShowSetting);

  return (
    <>
      <div className="bg-[#0091ff] h-full w-20 grid grid-rows-12">
        <div className="h-20 w-20 flex justify-center items-center row-span-1">
          <img src="zalo.svg" alt="avata" className="w-12 h-12 mt-10" />
        </div>
        <div className="row-span-9">
          <div className="mt-3">
            <div
              className={[
                " h-20 w-20 flex justify-center items-center hover:bg-[#006edc] ",
                tabSelected == 0 ? " bg-[#006edc] " : " ",
              ]}
              onClick={() => {setTabSelected(0);
              curentTab = tabSelected}}
            >
              {tabSelected == 0 ? (
                <BsChatTextFill size={28} color="#ffffff" />
              ) : (
                <BsChatText size={28} color="#ffffff" />
              )}
            </div>
            <div
              className={[
                " h-20 w-20 flex justify-center items-center hover:bg-[#006edc] ",
                tabSelected == 1 ? " bg-[#006edc] " : " ",
              ]}
              onClick={() => {setTabSelected(1);
              curentTab = tabSelected}}
            >
              {tabSelected == 1 ? (
                <RiContactsBookFill size={28} color="#ffffff" />
              ) : (
                <RiContactsBookLine size={28} color="#ffffff" />
              )}
            </div>
            <div
              className={[
                " h-20 w-20 flex justify-center items-center hover:bg-[#006edc] ",
                tabSelected == 2 ? " bg-[#006edc] " : " ",
              ]}
              onClick={() => {setTabSelected(2);
              curentTab = tabSelected}}
            >
              {tabSelected == 2 ? (
                <FaCheckSquare size={28} color="#ffffff" />
              ) : (
                <FaRegSquareCheck size={28} color="#ffffff" />
              )}
            </div>
          </div>
        </div>
        <div className="row-span-2">
          <div className=" h-20 w-20 flex justify-center items-center hover:bg-[#006edc] active:bg-[#006edc]">
            <CiCloudOn size={28} color="#ffffff" />
          </div>
          <div
            className={[
              " h-20 w-20 flex justify-center items-center hover:bg-[#006edc] ",
              isSetting ? " bg-[#006edc] " : " ",
            ]}
            onClick={() => setIsSetting(!isSetting)}
          >
            {isSetting ? (
              <IoSettingsSharp size={28} color="#ffffff" />
            ) : (
              <IoSettingsOutline size={28} color="#ffffff" />
            )}
          </div>
        </div>
      </div>
      <div className="relative">
        {isSetting ? <SettingComponent /> : <></>}
      </div>
      <Dropdown
        button={
          <button className="bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200 rounded-xl px-5 py-3 text-base font-medium text-white transition duration-200 dark:text-white">
            Dropdown Menu
          </button>
        }
        children={
          <div className="flex h-max w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat pb-4 shadow-[0_20px_25px_-5px] shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
            <div className="mt-3 ml-4">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  👋 Hey, Adela
                </p>{" "}
              </div>
            </div>
            <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

            <div className="mt-3 ml-4 flex flex-col">
              <a
                href=" "
                className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Profile Settings
              </a>
              <a
                href=" "
                className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
              >
                Newsletter Settings
              </a>
              <a
                href=" "
                className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
              >
                Log Out
              </a>
            </div>
          </div>
        }
        classNames={"py-2 bottom-[-30px] -left-[180px] w-max"}
      />
    </>
  );
}

export default Sidebar;
