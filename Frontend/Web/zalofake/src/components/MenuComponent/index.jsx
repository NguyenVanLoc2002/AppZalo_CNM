import React, { useState } from "react";

import { CiUser, CiCircleInfo } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { GoDatabase } from "react-icons/go";
import { FiTool } from "react-icons/fi";
import { GrLanguage } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";

function MenuComponent({ language, setLanguage, typeMenu, showModal }) {
  const [tabSelected, setTabSelected] = useState("");

  return typeMenu == "setting" ? (
    <>
      <div className="h-[285px] w-[225px] bg-white rounded-sm shadow-xl absolute bottom-[85px] -left-16 z-40 grid grid-rows-7">
        <div className="row-span-2">
          <div className="px-3 py-2  w-full flex items-center hover:bg-gray-200"
          onClick={showModal}
          >
            <CiUser size={20} color="#555555" />
            <p className="text-sm ml-6">
              {language == "vi" ? "Thông tin tài khoản" : "Account infomation"}
            </p>
          </div>
          <div className="p-3 w-full flex items-center hover:bg-gray-200">
            <IoSettingsOutline size={18} color="#555555" />
            <p className="text-sm ml-6">
              {language == "vi" ? "Cài đặt" : "Setting"}
            </p>
          </div>
          <hr />
        </div>

        <div className="row-span-4">
          <div
            className="px-3 py-[10px] w-full flex items-center hover:bg-gray-200 justify-between relative"
            onClick={() => {
              setTabSelected(tabSelected == "data" ? "" : "data");
            }}
          >
            <GoDatabase size={20} color="#555555" />
            <p className="text-sm w-full ml-8">
              {language == "vi" ? "Dữ liệu" : "Data"}
            </p>
            <IoIosArrowForward size={16} color="#555555" />

            <div
              className={
                tabSelected == "data"
                  ? "z-50 bg-white rounded-sm shadow w-44 absolute -top-12 -right-48 mt-12 mr-4"
                  : "z-50 bg-white rounded-sm shadow w-44 absolute -top-12 -right-48 mt-12 mr-4 hidden"
              }
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <a className="block px-4 py-2 hover:bg-gray-200">
                    {language == "vi" ? "Quản lý File" : "File Manager"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="px-3 py-[10px]  w-full flex items-center hover:bg-gray-200 justify-between relative"
            onClick={() => {
              setTabSelected(tabSelected == "tool" ? "" : "tool");
            }}
          >
            <FiTool size={20} color="#555555" />
            <p className="text-sm w-full ml-8">
              {language == "vi" ? "Công cụ" : "Tool"}
            </p>
            <IoIosArrowForward size={16} color="#555555" />

            <div
              className={
                tabSelected == "tool"
                  ? "z-50 bg-white rounded-sm shadow w-44 absolute -top-12 -right-48 mt-12 mr-4 "
                  : "z-50 bg-white rounded-sm shadow w-44 absolute -top-12 -right-48 mt-12 mr-4 hidden"
              }
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <a className="block px-4 py-2 hover:bg-gray-200">
                    {language == "vi" ? "Gửi file logs" : "Send logs file"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="px-3 py-[10px]  w-full flex items-center hover:bg-gray-200 justify-between relative"
            onClick={() => {
              setTabSelected(tabSelected == "lang" ? "" : "lang");
            }}
          >
            <GrLanguage size={18} color="#555555" />
            <p className="text-sm w-full ml-8">
              {language == "vi" ? "Ngôn ngữ" : "Language"}
            </p>
            <IoIosArrowForward size={16} color="#555555" />

            <div
              className={
                tabSelected == "lang"
                  ? "z-50 bg-white rounded-sm shadow w-44 absolute -top-12 -right-48 mt-12 mr-4 "
                  : "z-50 bg-white rounded-sm shadow w-44 absolute -top-12 -right-48 mt-12 mr-4 hidden"
              }
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <p
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setLanguage("vi")}
                  >
                    {language == "vi" ? "Tiếng Việt" : "Vietnamese"}
                  </p>
                </li>
                <li>
                  <p
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setLanguage("en")}
                  >
                    {language == "vi" ? "Tiếng Anh" : "English"}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="px-3 py-[10px]  w-full flex items-center hover:bg-gray-200 justify-between relative"
            onClick={() => {
              setTabSelected(tabSelected == "about" ? "" : "about");
            }}
          >
            <CiCircleInfo size={22} color="#555555" />
            <p className="text-sm w-full ml-8">
              {language == "vi" ? "Giới thiệu" : "About"}
            </p>
            <IoIosArrowForward size={16} color="#555555" />

            <div
              className={
                tabSelected == "about"
                  ? "z-50 bg-white rounded-sm shadow w-44 absolute -top-12 -right-48 mt-12 mr-4 "
                  : "z-50 bg-white rounded-sm shadow w-44 absolute -top-12 -right-48 mt-12 mr-4 hidden"
              }
            >
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <a className="block px-4 py-2 hover:bg-gray-200">
                    {language == "vi" ? "Phiên bản" : "Version"}
                  </a>
                  <a className="block px-4 py-2 hover:bg-gray-200">
                    {language == "vi" ? "Trung tâm hỗ trợ" : "Help center"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>

        <div className="row-span-1">
          <div
            className="p-2 w-full flex items-center hover:bg-gray-200 "
            onClick={() => (window.location.href = "/")}
          >
            <p className="text-sm  ml-12 text-red-500">
              {language == "vi" ? "Đăng xuất" : "Logout"}
            </p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="h-[170px] w-[300px] bg-white rounded shadow-2xl border absolute top-10 left-0 z-40 grid grid-rows-4">
        <div className="row-span-1">
          <p className="font-bold ml-2 p-3">Nguyễn Văn Tủn</p>
          <hr />
        </div>
        <div className="row-span-2">
          <div
            className="px-3 py-[10px] w-full flex items-center hover:bg-gray-200 justify-between relative"
            onClick={showModal}
          >
            <p className="text-sm w-full ml-2">
              {language == "vi" ? "Hồ sơ của bạn" : "Profile"}
            </p>
          </div>
          <div
            className="px-3 py-[10px]  w-full flex items-center hover:bg-gray-200 justify-between relative"
            
          >
            <p className="text-sm w-full ml-2">
              {language == "vi" ? "Cài đặt" : "Setting"}
            </p>
          </div>
          <hr />
        </div>
        <div className="row-span-1">
          <div
            className="p-2 w-full flex items-center hover:bg-gray-200 "
            onClick={() => (window.location.href = "/")}
          >
            <p className="text-sm ml-3">
              {language == "vi" ? "Đăng xuất" : "Logout"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuComponent;
