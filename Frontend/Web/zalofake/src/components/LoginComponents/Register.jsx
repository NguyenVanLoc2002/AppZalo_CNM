import { MdPhoneIphone } from "react-icons/md";
import { toast, Toaster } from 'react-hot-toast';

import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { IoEyeOff, IoEye } from "react-icons/io5";
import axiosInstance from '../../configs/axiosInstance'

function Register() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const langue = useOutletContext();
  const [password, setPwssword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [confirmPassword, setConfirmPwssword] = useState("");
  const [showConfirmPass, setConfirmShowPass] = useState(false);
  const [isCheckedUse, setIsCheckedUse] = useState(false);
  const [isCheckedInter, setIsCheckedInter] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRegister = () => {
    handlePressablePress();
  };
  const handleCheckUse = () => {
    setIsCheckedUse(!isCheckedUse);
  };


  const handleCheckInter = () => {
    setIsCheckedInter(!isCheckedInter);
  };


  const handlePressablePress = () => {
    if (!/^[0-9]{8,20}$/.test(phone)) {
      toast.error('Số điện thoại phải từ 8 đến 20 chữ số.')
    }
    else if (!(/^([a-zA-Zá-ỹÁ-Ỹ\s]{2,40})$/.test(name))) {
      toast.error('Vui lòng nhập tên là chữ và ít nhất 2 kí tự chữ');
    } else if (!/^[A-Za-z\d@$!%*?&#]{6,}$/.test(password)) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test(password)) {
      toast.error('MK chứa ít nhất 1 chữ,1 số,1 ký tự đặc biệt');
    } else if (!(password === confirmPassword)) {
      toast.error('Vui lòng nhập xác nhận mật khẩu trùng khớp')
    } else if (!isCheckedInter || !isCheckedUse) {
      toast.error('Vui lòng chấp nhận các điều khoản')
    }
    else {
      handleSubmit()
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        phone: phone,
        password: password,
        name: name
      });
      openModal()
    } catch (error) {
      if (error.response && (error.response.status === 400 || error.response.status === 409 || error.response.status === 500)) {
        // Nếu lỗi là 400, 409, 500 (Conflict), lấy thông điệp từ phản hồi
        toast.error(error.response.data.message);
      } else {
        console.log(2);
        // Xử lý các lỗi khác
        toast.error('Đã xảy ra lỗi');
      }
    }
   
  };

  const handleXacNhan = () => {
    closeModal()
    window.location.href = "/login";
  };
  
  const handleTuChoi = () => {
    closeModal()
    window.location.href = "/login/register";
  };

  return (
    <>
      <div><Toaster /></div>
      <div className=" flex justify-center items-center" >
        {/* Modal xác nhận khi đăng ký thành công */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Đăng ký thành công!</h2>
              <p>{langue == "vi" ? "Bạn có muốn chuyển về trang đăng nhập không?" : "Registration successful! Do you want to return to the login page?"}</p>
              <div className="flex justify-around">
                <button className="bg-blue-500 text-white px-4 py-2  mt-4 rounded hover:bg-blue-600 text-center " onClick={handleXacNhan}>Yes</button>
                <button className="bg-gray-400 text-white px-5 py-2 mt-4 rounded hover:bg-gray-600 text-center" onClick={handleTuChoi}>No</button>
                </div>
            </div>
          </div>
        )}

        <div className="w-[400px] text-sm ">
          <div className="w-full p-1 bg-white flex justify-around">
            <p className="text-center text-sm font-bold uppercase py-3 mb-[-5px] border-b border-black">
              {langue == "vi" ? "Đăng ký" : "Register"}
            </p>
          </div>
          <hr />
          <form className="bg-white shadow-lg rounded px-10 pt-4 pb-5 mb-4">
            <div className="my-6 flex items-center border-b">
              <span>
                <MdPhoneIphone size={16} color="#555555" />
              </span>
              <select className="select focus:border-none focus:outline-none">
                <option defaultValue={""}>+84</option>
                <option>+1</option>
                <option>+2</option>
                <option>+3</option>
                <option>+4</option>
                <option>+5</option>
              </select>
              <input
                className="rounded w-full py-1 px-3 border-none
                text-gray-700 focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder={langue == "vi" ? "Số điện thoại" : "Phone number"}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ""));
                }}
              />
            </div>

            <div className="my-6 flex items-center border-b">
              <input
                className=" ml-3 rounded w-full py-1 px-3 border-none
                text-gray-700 focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder={langue == "vi" ? "Tên" : "User name"}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="my-6 flex items-center border-b">
              <input
                className="ml-3 rounded w-full py-1 px-3 border-none
                  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={showPass ? "text" : "password"}
                placeholder={langue == "vi" ? "Mật khẩu" : "Password"}
                value={password}
                onChange={(e) => setPwssword(e.target.value)}
              />
              {showPass ? (
                <IoEyeOff
                  className="mr-2 opacity-75"
                  size={16}
                  color="#555555"
                  onClick={() => setShowPass(!showPass)}
                />
              ) : (
                <IoEye
                  className="mr-2 opacity-75"
                  size={16}
                  color="#555555"
                  onClick={() => setShowPass(!showPass)}
                />
              )}
            </div>
            <div className="my-6 flex items-center border-b">
              <input
                className="ml-3 rounded w-full py-1 px-3 border-none
                  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type={showConfirmPass ? "text" : "password"}
                placeholder={langue == "vi" ? "Nhập lại mật khẩu" : "Enter confirm password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPwssword(e.target.value)}
              />
              {showConfirmPass ? (
                <IoEyeOff
                  className="mr-2 opacity-75"
                  size={16}
                  color="#555555"
                  onClick={() => setConfirmShowPass(!showConfirmPass)}
                />
              ) : (
                <IoEye
                  className="mr-2 opacity-75"
                  size={16}
                  color="#555555"
                  onClick={() => setConfirmShowPass(!showConfirmPass)}
                />
              )}
            </div>

            <div className="my-6 flex items-center">
              <input
                className="rounded ml-6 mr-3 py-1 px-3 border-none
                text-gray-700 focus:outline-none focus:shadow-outline"
                id="checkedUse"
                type="checkbox"
                checked={isCheckedUse}
                onChange={handleCheckUse}
              /><span >{langue == "vi" ? "Tôi đồng ý với các điều khoản sử dụng Zalo" : "I agree to the terms of use of Zalo"}</span>
            </div>

            <div className="my-6 flex items-center">
              <input
                className="rounded ml-6 mr-3 py-1 px-3 border-none
                text-gray-700 focus:outline-none focus:shadow-outline"
                id="checkedInter"
                type="checkbox"
                checked={isCheckedInter}
                onChange={handleCheckInter}
              /><span >{langue == "vi" ? "Tôi đồng ý với các điều khoản Mạng xã hội của Zalo" : "I agree to Zalo's Social Network terms"}</span>
            </div>

            <div>
              <button
                className="bg-primary hover:bg-primaryHover text-white 
                    rounded focus:outline-none focus:shadow-outline block w-full disabled:opacity-50 py-3"
                type="button"
                disabled={phone.length === 0 || password.length === 0 || name.length === 0 || confirmPassword === 0 || !isCheckedInter || !isCheckedUse}
                onClick={handleRegister}
              >
                {langue == "vi" ? "Đăng ký" : "Register"}
              </button>

              <Link
                className="block hover:underline hover:text-blue-400 text-gray-700 my-3"
                to={"/"}
              >
                {langue == "vi" ? "<< Quay lại" : "<< Back"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
