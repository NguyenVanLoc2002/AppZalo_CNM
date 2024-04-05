import React, { useRef, useState } from "react";

import { CiUser, CiCircleInfo } from "react-icons/ci";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { GoDatabase } from "react-icons/go";
import { FiTool } from "react-icons/fi";
import { GrLanguage } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { HiMiniLockClosed } from "react-icons/hi2";
import { TiArrowSync } from "react-icons/ti";
import { FaDatabase } from "react-icons/fa";
import useLogout from "../../hooks/useLogout";
import { checkPassword } from "../../utils/validation";

function MenuComponent({ language, setLanguage, typeMenu, showModal }) {
  const [tabSelected, setTabSelected] = useState("");
  const logout = useLogout();
  const user = JSON.parse(localStorage.getItem("authUser"));
  const [isOpenSetup, setIsOpenSetup] = useState(false);
  const [isOpenSecurity, setIsSecurity] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwordNew, setPasswordNew] = useState("");
  const [showPasswordNew, setShowPasswordNew] = useState(false);

  const [passwordReNew, setPasswordReNew] = useState("");
  const [showPasswordReNew, setShowPasswordReNew] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordNew = () => {
    setShowPasswordNew(!showPasswordNew);
  };

  const togglePasswordReNew = () => {
    setShowPasswordReNew(!showPasswordReNew);
  };

  const toggleModal = () => {
    setIsOpenSetup(!isOpenSetup);
  };

  const toggleModalSecurity = () => {
    setIsSecurity(!isOpenSecurity);
  };

  const handleLogout = async () => {
    await logout();
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  // Hàm kiểm tra mật khẩu
  // const validatePassword = async (userId) => {
  //   try {
  //     const response = await axios.post(`users/get/uid/${userId}`);
  //     // Kiểm tra mật khẩu hiện tại có giống trong CSDL không (giả sử databasePassword là mật khẩu trong CSDL)
  //     if (passwordCurrent !== databasePassword) {
  //       alert("Mật khẩu hiện tại không đúng");
  //       return false;
  //     }

  //     // Kiểm tra mật khẩu mới có ít nhất 8 ký tự, chứa ít nhất một ký tự đặc biệt và ít nhất một chữ
  //     const passwordRegex = checkPassword;
  //     if (!passwordRegex.test(passwordNew)) {
  //       alert("Mật khẩu mới không hợp lệ");
  //       return false;
  //     }

  //     // Kiểm tra mật khẩu nhập lại có khớp với mật khẩu mới không
  //     if (passwordReNew !== passwordNew) {
  //       alert("Mật khẩu nhập lại không khớp với mật khẩu mới");
  //       return false;
  //     }

  //     // Nếu tất cả các điều kiện đều đúng, trả về true
  //     return true;
  //   } catch (error) {
  //     console.error("Error:", error);
  //     return false;
  //   }
  // };


  return typeMenu == "setting" ? (
    <>
      <div className="h-[285px] w-[225px] bg-white rounded-sm shadow-xl absolute bottom-[85px] -left-16 z-40 grid grid-rows-7">
        <div className="row-span-2">
          <div
            className="px-3 py-2  w-full flex items-center hover:bg-gray-200"
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
            onClick={handleLogout}
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
          <p className="font-bold ml-2 p-3">{user?.profile.name}</p>
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
            onClick={toggleModal}
          >
            <p className="text-sm w-full ml-2">
              {language == "vi" ? "Cài đặt" : "Setting"}
            </p>
            {isOpenSetup && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-[90%] bg-gray-100 rounded-lg shadow-lg ">
                {/* Content */}
                <div className="absolute left-0 top-0 h-full w-5/12  border-r border-gray-300 bg-gray-100 overflow-auto">
                  {/* Nội dung ở bên trái */}
                  <div className="flex p-2 items-center h-20 ">
                    <p className="text-xl font-semibold">Cài đặt</p>
                  </div>
                  <div
                    className="flex items-center justify-start h-12  hover:bg-sky-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IoSettingsSharp size={20} className="mr-5 ml-5" />
                    <p className="text-base font-semibold">Cài đặt chung</p>
                  </div>
                  <div
                    className="flex items-center justify-start h-12 hover:bg-sky-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleModalSecurity();
                    }}
                  >
                    <HiMiniLockClosed size={20} className="mr-5 ml-5" />
                    <p className="text-base font-semibold">
                      Riêng tư và bảo mật
                    </p>
                  </div>

                  <div
                    className="flex items-center justify-start h-12 hover:bg-sky-100"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <TiArrowSync size={20} className="mr-5 ml-5" />
                    <p className="text-base font-semibold">Đồng bộ tin nhắn</p>
                  </div>

                  <div
                    className="flex items-center justify-start h-12 hover:bg-sky-100"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <FaDatabase size={20} className="mr-5 ml-5" />
                    <p className="text-base font-semibold">Quản lý dữ liệu</p>
                  </div>
                </div>
                <div
                  className="absolute right-0 top-0 h-full w-7/12 overflow-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="flex p-2 justify-end h-15"
                    onClick={toggleModal}
                  >
                    <p className="text-2xl ">x</p>
                  </div>
                  {/* Nội dung ở bên phải */}

                  {isOpenSecurity && (
                    <div className="p-2">
                      <p className="text-base font-semibold">
                        Mật khẩu đăng nhập
                      </p>
                      <button
                        className="rounded mt-5 bg-gray-200 p-2 font-semibold text-black hover:bg-gray-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowChangePassword(true);
                        }}
                      >
                        Đổi mật khẩu
                      </button>
                      {showChangePassword && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-[90%] bg-white rounded-lg shadow-lg ">
                          <div className="p-4 text-xl font-semibold text-black border-b">
                            <p>Tạo mật khẩu mới</p>
                          </div>
                          <div className="p-4 ">
                            <p className="text-sm">
                              Lưu ý: Mật khẩu bao gồm chữ kèm theo số hoặc ký tự
                              đặc biệt, tối thiểu 8 ký tự trở lên & tối đa 32 ký
                              tự.
                            </p>
                            <p className="mt-2 pb-2">Mật khẩu hiện tại</p>
                            <div className="flex justify-between p-2 border rounded border-sky-500 ">
                              <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu hiện tại"
                                value={passwordCurrent}
                                onChange={(e) =>
                                  setPasswordCurrent(e.target.value)
                                }
                                className="w-full rounded focus:outline-none"
                              />
                              <div onClick={togglePasswordVisibility}>
                                <p className="text-sky-500 font-semibold">
                                  {!showPassword ? "Hiện" : "Ẩn"}
                                </p>
                              </div>
                            </div>

                            <p className="mt-2 border-t pt-2 pb-2">
                              Mật khẩu mới
                            </p>
                            <div className="flex justify-between p-2 border rounded border-sky-300 ">
                              <input
                                type={showPasswordNew ? "text" : "password"}
                                placeholder="Nhập mật khẩu mới"
                                value={passwordNew}
                                onChange={(e) => setPasswordNew(e.target.value)}
                                className="w-full rounded focus:outline-none "
                              />
                              <div onClick={togglePasswordNew}>
                                <p className="text-sky-500 font-semibold">
                                  {!showPasswordNew ? "Hiện" : "Ẩn"}
                                </p>
                              </div>
                            </div>

                            <p className="mt-2 border-t pt-2 pb-2">
                              Nhập lại mật khẩu mới
                            </p>
                            <div className="flex justify-between p-2 border rounded border-sky-300 ">
                              <input
                                type={showPasswordReNew ? "text" : "password"}
                                placeholder="Nhập mật khẩu hiện tại"
                                value={passwordReNew}
                                onChange={(e) =>
                                  setPasswordReNew(e.target.value)
                                }
                                className="w-full rounded focus:outline-none "
                              />
                              <div onClick={togglePasswordReNew}>
                                <p className="text-sky-500 font-semibold">
                                  {!showPasswordReNew ? "Hiện" : "Ẩn"}
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-end mt-6">
                              <button
                                className="flex items-center justify-center text-lg font-semibold p-2 pl-3 pr-3 mr-5 bg-gray-200 rounded hover:bg-gray-400"
                                onClick={() => setShowChangePassword(false)}
                              >
                                Hủy
                              </button>
                              <button className="flex items-center justify-center text-lg font-semibold p-2 pl-3 pr-3  bg-sky-200 rounded hover:bg-sky-400">
                                Cập nhật
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-2 border-t">
                        <p className="text-base font-semibold mt-2">
                          Khóa màn hình Zalo
                        </p>
                        <p className="text-sm text-gray-300  mt-2">
                          Khóa màn hình Zalo của bạn bằng Ctrl + L, khi bạn
                          không sử dụng máy tính.
                        </p>
                        <button className="rounded mt-5 bg-sky-100 p-2 font-semibold text-sky-600 hover:bg-sky-200">
                          Tạo mã khóa màn hình
                        </button>
                      </div>

                      <div className="mt-2 border-t">
                        <p className="text-base font-semibold mt-2">
                          Bảo mật 2 lớp
                        </p>
                        <div className="flex justify-around">
                          <p className="text-sm text-gray-300  mt-2">
                            Sau khi bật, bạn sẽ được yêu cầu nhập mã OTP hoặc
                            xác thực từ thiết bị di động sau khi đăng nhập trên
                            thiết bị lạ.
                          </p>
                          <div className="form-control">
                            <label className="label cursor-pointer">
                              <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                checked={isChecked}
                                onChange={handleChange}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <hr />
        </div>
        <div className="row-span-1">
          <div
            className="p-2 w-full flex items-center hover:bg-gray-200 "
            onClick={handleLogout}
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
