import { MdPhoneIphone } from "react-icons/md";

import { useState } from "react";
import { Link, useOutletContext} from "react-router-dom";

function LoginMobileDevice() {
  const [phone, setPhone] = useState("");
  const langue = useOutletContext();

  const handleLogin = () => {
    window.location.href = "/chat";
  };
  return (
    <>
      <div className="w-[400px] text-sm ">
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

          <div className="mt-6 flex items-center py-3">
            <p className="text-center text-gray-500 ">
              {langue == "vi"
                ? "Chúng tôi sẽ gửi một yêu cầu đăng nhập đến ứng dụng Zalo trên thiết bị của bạn."
                : "We will send a request login to Zalo app on your device."}
            </p>
          </div>

          <div>
            <button
              className="bg-primary hover:bg-primaryHover text-white 
                    rounded focus:outline-none focus:shadow-outline block w-full disabled:opacity-50 py-3"
              type="button"
              disabled={phone.length === 0}
              onClick={handleLogin}
            >
              {langue == "vi" ? "Đồng ý" : "Agree"}
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

export default LoginMobileDevice;
