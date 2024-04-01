import React, { useState } from "react";
import { CiEdit, CiCamera } from "react-icons/ci";
import useUpdate from "../../hooks/useUpdate";

function ModalComponent({ showModal, language, userInfo }) {
  const [showUpdate, setShowUpdate] = useState(false);
  const { updateProfile, loading } = useUpdate();
  const [usName, setUsName] = useState(userInfo?.profile.name);
  const [usEmail, setUsEmail] = useState(userInfo?.email);
  const [usGender, setUsGender] = useState(userInfo?.profile.gender);
  const [usDob, setUsDob] = useState(new Date(userInfo?.profile.dob));
  const background = userInfo?.profile.background?.url || "./zalo.svg";
  const avatar = userInfo?.profile.avatar?.url || "./zalo.svg";

  const handleUpdate = async () => {
    const selectedDay = document.getElementById("day").value;
    const selectedMonth = document.getElementById("month").value;
    const selectedYear = document.getElementById("year").value;

    const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

    const formattedDob = selectedDate.toISOString().split("T")[0];

    await updateProfile({
      name: usName,
      email: usEmail,
      gender: usGender,
      dob: formattedDob,
    });

    setShowUpdate(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ">
        <div className="relative w-[440px] h-[560px] my-6 mx-auto">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
              <h1 className="font-semibold">
                {!showUpdate
                  ? language == "vi"
                    ? "Thông tin tài khoản"
                    : "Profile"
                  : language == "vi"
                  ? "Cập nhật thông tin"
                  : "Update profile"}
              </h1>
              <button
                className="mr-2 float-right uppercase"
                onClick={() => showModal(false)}
              >
                <span className="block">x</span>
              </button>
            </div>

            {/*body*/}
            {showUpdate ? (
              <div className="my-3 px-5 h-96">
                <label htmlFor="usname">
                  {language == "vi" ? "Tên hiển thị" : "Display name"}
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded my-3"
                  id="usname"
                  value={usName}
                  onChange={(e) => setUsName(e.target.value)}
                />
                <label htmlFor="usname">
                  {language == "vi" ? "Email hiển thị" : "Display mail"}
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-2 rounded my-3"
                  id="usEmail"
                  value={usEmail}
                  onChange={(e) => setUsEmail(e.target.value)}
                />
                <h1 htmlFor="gender" className="font-semibold text-xl">
                  {language == "vi"
                    ? "Thông tin cá nhân"
                    : "Personal Infomation"}
                </h1>
                <div className="flex my-5">
                  <div className="mr-5">
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      checked={usGender === "male"}
                      onChange={() => setUsGender("male")}
                    />
                    <label htmlFor="male" className="ml-3">
                      {language == "vi" ? "Nam" : "Male"}
                    </label>
                  </div>
                  <div className="ml-5">
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      checked={usGender === "female"}
                      onChange={() => setUsGender("female")}
                    />
                    <label htmlFor="female" className="ml-3">
                      {language == "vi" ? "Nữ" : "Female"}
                    </label>
                  </div>
                  <div className="ml-10">
                    <input
                      type="radio"
                      name="gender"
                      id="other"
                      checked={usGender === "other"}
                      onChange={() => setUsGender("other")}
                    />
                    <label htmlFor="other" className="ml-3">
                      {language == "vi" ? "Khác" : "Other"}
                    </label>
                  </div>
                </div>

                <h1>{language == "vi" ? "Ngày sinh" : "Birthday"}</h1>
                <div className="flex my-5 w-full justify-between items-center">
                  <div className="w-[30%]">
                    <select
                      name="day"
                      id="day"
                      className="h-10 max-h-20 w-full overflow-y-auto border rounded px-3"
                      value={usDob.getDate()}
                      onChange={(e) => {
                        const dob = new Date(usDob);
                        dob.setDate(parseInt(e.target.value));
                        setUsDob(dob);
                      }}
                    >
                      {[...Array(31)].map((e, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-[30%]">
                    <select
                      name="month"
                      id="month"
                      className="h-10 max-h-20 w-full overflow-y-auto border rounded px-3"
                      value={usDob.getMonth()}
                      onChange={(e) => {
                        const dob = new Date(usDob);
                        dob.setMonth(parseInt(e.target.value));
                        setUsDob(dob);
                      }}
                    >
                      {[...Array(12)].map((e, i) => (
                        <option key={i + 1} value={i}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-[30%]">
                    <select
                      name="year"
                      id="year"
                      className="h-10 max-h-20 w-full overflow-y-auto border rounded px-3"
                      value={usDob.getFullYear()}
                      onChange={(e) => {
                        const dob = new Date(usDob);
                        dob.setFullYear(parseInt(e.target.value));
                        setUsDob(dob);
                      }}
                    >
                      {[...Array(121)].map((e, i) => (
                        <option key={i + 1920} value={i + 1920}>
                          {i + 1920}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-200">
                <div className="h-[170px]">
                  <img
                    src={background}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="-mt-6 ">
                  <div className="flex bg-white px-3">
                    <div className="relative">
                      <img
                        className="rounded-full h-24 w-24 object-cover border-2 border-white"
                        src={avatar}
                        alt="avatar"
                      />
                      <CiCamera
                        className="absolute bottom-3 right-0 border-spacing-4 rounded-full border-white bg-gray-300"
                        size={26}
                      />
                    </div>
                    <div className="flex items-center">
                      <h1 className="text-xl font-semibold mx-3">{usName}</h1>
                      <CiEdit className="inline-block" size={20} />
                    </div>
                  </div>
                  <div className="mt-1 px-5 bg-white">
                    <h1 className="text-xl font-semibold pt-5">
                      {language == "vi"
                        ? "Thông tin cá nhân"
                        : "Personal Infomation"}
                    </h1>
                    <div className="flex items-center my-3">
                      <h1 className="w-1/3 text-gray-500">
                        {language == "vi" ? "Giới tính" : "Gender"}:
                      </h1>
                      <h1 className="w-2/3">
                        {usGender === undefined
                          ? language === "vi"
                            ? "Chưa cập nhật"
                            : "Not updated"
                          : usGender === "female"
                          ? language === "vi"
                            ? "Nữ"
                            : "Female"
                          : usGender === "other"
                          ? language === "vi"
                            ? "Khác"
                            : "Other"
                          : language === "vi"
                          ? "Nam"
                          : "Male"}
                      </h1>
                    </div>

                    <div className="flex items-center my-3">
                      <h1 className="w-1/3 text-gray-500">
                        {language == "vi" ? "Ngày sinh" : "Birthday"}:
                      </h1>
                      <h1 className="w-2/3">
                        {userInfo.profile.dob
                          ? usDob.getDate() +
                            "/" +
                            (usDob.getMonth() + 1) +
                            "/" +
                            usDob.getFullYear()
                          : language == "vi"
                          ? "Chưa cập nhật"
                          : "Not updated"}
                      </h1>
                    </div>
                    <div className="flex items-center my-3">
                      <h1 className="w-1/3 text-gray-500">
                        {language == "vi" ? "Điện thoại" : "Phone number"}:
                      </h1>
                      <h1 className="w-2/3">{userInfo.phone}</h1>
                    </div>
                    <div className="flex items-center py-3">
                      <p className="text-gray-500 text-sm">
                        {language == "vi"
                          ? "Chỉ có bạn bè có lưu số của bạn trong danh bạ máy mới xem được số này"
                          : "Only friends who have saved your number in their phone address book can see this number"}
                        :
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/*footer*/}
            <div className="py-1 px-3 border-t border-solid border-blueGray-200 rounded-b">
              {showUpdate ? (
                <div className="flex items-center justify-end">
                  <button
                    className="my-2 mr-3 font-semibold text-xl  px-3 py-2 rounded bg-gray-200 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowUpdate(false)}
                  >
                    {language === "vi" ? "Hủy" : "Cancel"}
                  </button>
                  <button
                    className={`my-2 font-semibold text-xl text-white px-3 py-2 rounded bg-[#0068ff] ease-linear transition-all duration-150`}
                    type="button"
                    onClick={handleUpdate}
                    disabled={loading}
                  >
                    {loading
                      ? "Loading..."
                      : language === "vi"
                      ? "Cập nhật"
                      : "Update"}
                  </button>
                </div>
              ) : (
                <button
                  className=" w-full my-2 font-semibold text-xl py-2 hover:rounded hover:bg-gray-200 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowUpdate(true)}
                >
                  <CiEdit className="inline-block mr-2" size={18} />
                  {language === "vi" ? "Cập nhật" : "Update"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ModalComponent;
