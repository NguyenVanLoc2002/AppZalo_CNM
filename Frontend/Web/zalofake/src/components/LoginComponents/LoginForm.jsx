import { MdPhoneIphone } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";

import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

function LoginForm() {
  const [phone, setPhone] = useState("");
  const [password, setPwssword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const langue = useOutletContext();
  const [isLogin, setIsLogin] = useState(false);
  const [phoneId, setPhoneId] = useState([]);

  useEffect(() => {
    const getPhoneIdCountry = async () => {
      const res = await fetch("https://restcountries.com/v3.1/region/asia");
      const data = await res.json();
      data.map((item) => {
        setPhoneId((phoneId) => [
          //check if phoneId already exist
          ...phoneId.filter((phone) => phone.id !== item.cca2),
          {
            id: item.cca2,
            phoneId: item.idd.root + item.idd.suffixes?.[0],
          },
        ]);
      });
    };
    getPhoneIdCountry();
  }, []);

  const handleLogin = () => {
    window.location.href = "/chat";
    setIsLogin(true);
    Link.contextType = isLogin;
  };
  return (
    <>
      <div className="w-[400px] text-sm">
        <div className="w-full p-1 bg-white flex justify-around">
          <p className="text-center text-sm uppercase py-3 text-gray-400">
            {langue == "vi" ? "Với số Mã QR" : "With QR code"}
          </p>
          <p className="text-center text-sm font-bold uppercase py-3 mb-[-5px] border-b border-black">
            {langue == "vi" ? "Với số điện thoại" : "With phone number"}
          </p>
        </div>
        <hr />
        <form className="bg-white shadow-lg rounded px-10 pt-4 pb-5 mb-4">
          <div className="my-6 flex items-center border-b-2">
            <span>
              <MdPhoneIphone size={16} color="#555555" />
            </span>
            <select className="select focus:border-none focus:outline-none">
              {phoneId.map((item) => (
                <option
                  value={item.phoneId}
                  key={item.id}
                  className="select focus:border-none focus:outline-none"
                >
                    {item.id + item.phoneId}
                </option>
              ))}
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
          <div className="my-6 flex items-center border-b-2">
            <span>
              <FaLock size={16} color="#555555" />
            </span>

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
          <p className="text-red-500 text-xs italic hidden">
            {langue == "vi" ? "Sai Mật khẩu." : "Wrong password."}
          </p>
          <div>
            <button
              className="bg-primary hover:bg-primaryHover text-white 
                    rounded focus:outline-none focus:shadow-outline block w-full disabled:opacity-50 py-3"
              type="button"
              disabled={phone.length === 0 || password.length < 6}
              onClick={handleLogin}
            >
              {langue == "vi"
                ? "Đăng nhập bằng mật khẩu"
                : "Login with password"}
            </button>
            <Link
              className="hover:border-[#0068ff] border text-[#0190f3] rounded block w-full my-3 py-3 disabled:opacity-70 text-center"
              to="/mobile"
            >
              {langue == "vi"
                ? "Đăng nhập bằng thiết bị di động"
                : "Sign in with mobile device"}
            </Link>
            <Link
              className="block hover:underline hover:text-blue-400 text-center text-gray-700"
              to={"/forgot"}
            >
              {langue == "vi" ? "Quên mật khẩu?" : "Forgot password?"}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
