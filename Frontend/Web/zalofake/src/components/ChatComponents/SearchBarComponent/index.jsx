import { useState } from "react";
import { AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsArrowBarDown, BsArrowBarUp } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaCaretDown, FaSortDown } from "react-icons/fa";
import { GoArrowDown } from "react-icons/go";
import { IoArrowDown } from "react-icons/io5";
import { LuMailOpen } from "react-icons/lu";
import { PiDotsNine, PiDotsThree } from "react-icons/pi";
import { RiContactsLine, RiGroupLine } from "react-icons/ri";

function SearchBarComponent({ language }) {
  const [valueSearch, setValueSearch] = useState("");

  return (
    <>
      <div className="h-[70px] bg-white flex justify-between items-center border-r">
        <div className="bg-gray-200 rounded-lg ml-5 w-3/4">
          <div className="flex items-center justify-center px-3">
            <CiSearch size={20} />
            <input
              type="text"
              className="h-9 w-full bg-transparent outline-none px-3"
              placeholder="Search"
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.valueSearch)}
            />
          </div>
        </div>
        <div className="px-3 w-1/4 flex items-center justify-evenly">
          <AiOutlineUserAdd size={18} opacity={0.8} />
          <AiOutlineUsergroupAdd size={20} opacity={0.8} />
        </div>
      </div>
      <div className="flex items-centers px-5">
            <p>
                Tất cả
            </p>
            <p>
                Chưa đọc
            </p>
            <p>
                Phân loại
                <button>
                    <FaSortDown size={20} /> 
                </button>
            </p>
            <button>
            <PiDotsThree size={20} opacity={1.8}/>
            </button>

      </div>
      <div className="h-[calc(100%-70px)] bg-white border">
        <div className="h-full w-full"></div>
      </div>
    </>
  );
}

export default SearchBarComponent;
