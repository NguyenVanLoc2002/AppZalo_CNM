import React, { useEffect, useState } from "react";
import { RiGroupLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { TbArrowsSort } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import useGroup from "../../../hooks/useGroup";

function JoinedGroupComponent({ language }) {
  const [groupList, setGroupList] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const { getGroups, groups, loading } = useGroup();

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    setGroupList(groups);
  }, [groups]);
  return (
    <>
      <div className="h-[70px] w-full flex items-center bg-white border-b fixed">
        <RiGroupLine size={20} className="mx-5" />
        <p className="text-xl font-semibold">
          {language == "vi" ? "Danh sách nhóm" : "Joined group"}
        </p>
      </div>
      <div className="w-full bordered mt-24">
        <div className="h-[calc(100%-70px)] w-full my-6 px-6">
          <p className="font-semibold">
            {language
              ? `Nhóm (${groupList.length})`
              : `Groups (${groupList.length})`}
          </p>
        </div>

        <div className="bg-white rounded-md mx-3 px-3">
          <div className="my-3 py-3 lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-full flex items-center justify-center px-3 border rounded-lg">
              <CiSearch size={20} />
              <input
                type="text"
                className="h-9 w-full bg-transparent outline-none px-3"
                placeholder="Search"
              />
            </div>
            <div className="lg:w-full flex items-center justify-between mt-5 lg:mt-0 lg:ml-2">
              <div className="mr-2 w-full bg-gray-100 flex items-center justify-center px-3 border rounded dropdown">
                <TbArrowsSort size={20} />
                <select
                  className="h-9 w-full px-3 bg-transparent outline-none"
                  onChange={(e) => setSortDirection(e.target.value)}
                >
                  <option value="asc">
                    {language == "vi" ? "Tên (A - Z )" : "Name (A - Z)"}
                  </option>
                  <option value="desc">
                    {language == "vi" ? "Tên (Z - A )" : "Name (Z - A)"}
                  </option>
                  <option value="newest">
                    {language == "vi"
                      ? "Hoạt động gần đây (mới - cũ)"
                      : "Last update (newest - oldest)"}
                  </option>
                  <option value="oldest">
                    {language == "vi"
                      ? "Hoạt động gần đây (cũ - mới)"
                      : "Last update (oldest - newest)"}
                  </option>
                </select>
              </div>
              <div className="ml-2 w-full bg-gray-100 flex items-center justify-center px-3 border rounded">
                <CiFilter size={20} />
                <select className="h-9 w-full px-3 bg-transparent outline-none">
                  <option value="all">
                    {language == "vi" ? "Tất cả" : "ALl"}
                  </option>
                  <option value="friend">
                    {language == "vi" ? "Nhóm tôi quản lý" : "My admin groups"}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full">
            {loading && (
              <div className="w-full flex items-center justify-center">
                <span className="loading loading-spinner text-blue-400"></span>
              </div>
            )}
            {groupList
              .sort(
                sortDirection == "asc"
                  ? (a, b) => a.groupName.localeCompare(b.groupName)
                  : (a, b) => b.groupName.localeCompare(a.groupName)
              )
              .map((group) => (
                <div
                  key={group._id}
                  className="my-5 flex items-center justify-between px-6 py-5 border-b hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <img
                      src={group.avatar?.url || "/zalo.svg"}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-3">
                      <p className="font-semibold">{group.groupName}</p>
                      <p className="text-sm text-gray-500">
                        {language == "vi"
                          ? `Quản trị viên: ${group.createBy.profile.name} - Thành viên: ${group.conversation.participants?.length}`
                          : `Admin: ${group.createBy.profile.name} - Members: ${group.conversation.participants?.length}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn bg-transparent border-none shadow-none"
                      >
                        <IoIosMore size={20} />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded w-52"
                      >
                        <li className="border-b">
                          <a className="py-3">
                            {language == "vi"
                              ? "Xem thông tin"
                              : "View infomation"}
                          </a>
                        </li>
                        <li className="mt-3">
                          <a className="py-3">
                            {language == "vi" ? "Rời nhóm" : "Leave group"}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinedGroupComponent;
