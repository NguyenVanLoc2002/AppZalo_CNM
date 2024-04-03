import { MdPhoneIphone } from "react-icons/md";

import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

function FogotPassword() {
  const [phone, setPhone] = useState("");
  const langue = useOutletContext();

  const handleLogin = () => {
    window.location.href = "/chat";
  };
  return (
    <>
      <div className="w-[400px] text-sm">
        <div className="w-full text-base pt-5 pb-3 bg-white">
          <p className="text-center mt-10 ">
            {langue == "vi" ? "Nhập số điện thoại của bạn" : "Enter your phone number"}
          </p>
        </div>
        <form className="bg-white shadow-lg rounded px-10 pt-4 pb-5 mb-4">
          <div className="mb-6 flex items-center border-b">
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
          <div>
            <button
              className="bg-primary hover:bg-primaryHover text-white 
                    rounded focus:outline-none focus:shadow-outline block w-full disabled:opacity-50 py-3"
              type="button"
              disabled={phone.length === 0}
              onClick={handleLogin}
            >
              {langue == "vi" ? "Tiết Tục" : "Continue"}
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
    </>
  );
}

export default FogotPassword;
