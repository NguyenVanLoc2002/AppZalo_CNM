import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { LuMailOpen } from "react-icons/lu";
import { PiChatCircleText } from "react-icons/pi";

function FriendRequestComponent({ language }) {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendRecieved, setFriendRecieved] = useState([]);

  var newList = [];

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      newList.push({
        id: faker.string.uuid(),
        name: faker.internet.userName(),
        avatar: faker.image.avatar(),
        message: faker.lorem.sentence(),
      });
    }
    setFriendRequests(newList);
  }, []);
  return (
    <>
      <div className="h-[70px] w-full flex items-center bg-white border-b fixed z-20">
        <LuMailOpen size={20} className="mx-5" />
        <p className="text-xl font-semibold">
          {language == "vi" ? "Lời mời kết bạn" : "Friend Requests"}
        </p>
      </div>
      <div className="w-full bordered mt-24">
        <div className="h-[calc(100%-70px)] w-full my-6 px-6">
          <p className="font-semibold">
            {language
              ? `Lời mời đã nhận (${friendRequests.length})`
              : `Requests received (${friendRequests.length})`}
          </p>
        </div>
        <div className="w-full mx-3 px-3  lg:grid-cols-3 lg:grid lg:gap-4 lg:px-6 lg:my-6">
          {friendRequests.map((friendRequest) => {
            return (
              <div
                key={friendRequest.id}
                className="w-full lg:col-span-1 mt-3 card card-compact bg-base-100 shadow-xl flex flex-col items-center justify-between"
              >
                <div className="w-full my-5 flex items-center justify-between px-6 py-5">
                  <div className="flex items-center">
                    <img
                      src={friendRequest.avatar}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="block overflow-hidden">
                      <p className="font-bold truncate">{friendRequest.name}</p>
                      <p className="ml-1 text-sm text-gray-400 overflow-x-hidden">{friendRequest.message}</p>                     
                    </div>
                  </div>
                  <div>
                    <PiChatCircleText size={22} opacity={0.5} />
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <textarea
                      name="message_request"
                      id="message_request"
                      cols="50"
                      rows="3"
                      className="border rounded bg-gray-50 p-3 w-full outline-none resize-none"
                      value={friendRequest.message}
                      disabled
                    ></textarea>
                  </div>
                  <div className="card-actions">
                    <button className="btn bg-gray-100 text-sm sm:text-md rounded-md w-[48%] hover:bg-gray-300">
                      {language == "vi" ? "Từ chối" : "Reject"}
                    </button>
                    <button className="btn bg-[#e5efff] text-sm sm:text-md text-[#3779dc] hover:bg-[#c7e0ff] hover:border-none rounded-md w-[48%]">
                      {language == "vi" ? "Chấp nhận" : "Accept"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="h-[calc(100%-70px)] w-full my-6 px-6">
          <p className="font-semibold">
            {language
              ? `Lời mời đã gửi (${friendRequests.length})`
              : `Requests sent (${friendRequests.length})`}
          </p>
        </div>
        <div className="w-full mx-3 px-3 lg:grid-cols-3 lg:grid lg:gap-4 lg:px-6 lg:my-6">
          {friendRequests.map((friendRequest) => {
            return (
              <div
                key={friendRequest.id}
                className="w-full lg:col-span-1 mt-3 card card-compact bg-base-100 shadow-xl flex flex-col justify-between items-center"
              >
                <div className="w-full my-5 flex items-center justify-between px-6 py-5 overflow-hidden">
                  <div className="flex items-center">
                    <img
                      src={friendRequest.avatar}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="ml-5 overflow-hidden">
                      <p className="font-bold">{friendRequest.name}</p>
                      <p className="text-sm text-gray-400 font-semibold overflow-hidden">
                        {friendRequest.message}
                      </p>
                    </div>
                  </div>
                  <div>
                    <PiChatCircleText size={22} opacity={0.5} />
                  </div>
                </div>
                <div className="card-body">
                  <div className="card-actions items-center">
                    <button className="btn bg-gray-100 text-sm md:text-md lg:text-lg rounded-md w-full hover:bg-gray-300">
                      {language == "vi" ? "Hủy yêu cầu" : "Cancel request"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default FriendRequestComponent;
