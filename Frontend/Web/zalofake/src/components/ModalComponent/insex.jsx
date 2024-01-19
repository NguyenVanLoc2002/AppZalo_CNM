import { CiEdit, CiCamera } from "react-icons/ci";

function ModalComponent({ showModal, language }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 ">
        <div className="relative w-[400px] h-[560px] my-6 mx-auto">
          {/*content*/}

          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
              <h1 className="font-semibold">
                {language == "vi" ? "Thông tin tài khoản" : "Profile"}
              </h1>
              <button
                className="mr-2 float-right uppercase"
                onClick={() => showModal(false)}
              >
                <span className="block">x</span>
              </button>
            </div>

            {/*body*/}
            <div className="bg-gray-200">
              <div className="h-[170px]">
                <img
                  src="public/bg-login.svg"
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="-mt-6 ">
                <div className="flex bg-white px-3">
                  <div className="relative">
                    <img
                      className="rounded-full h-24 w-24 object-cover border-2 border-white"
                      src="public/zalo.svg"
                      alt="avatar"
                    />
                    <CiCamera
                      className="absolute bottom-3 right-0 border-spacing-4 rounded-full border-white bg-gray-300"
                      size={26}
                    />
                  </div>
                  <div className="flex items-center">
                    <h1 className="text-xl font-semibold mx-3">
                      Nguyễn Văn Tủn
                    </h1>
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
                    <h1 className="w-2/3">hong biết nữa</h1>
                  </div>
                  <div className="flex items-center my-3">
                    <h1 className="w-1/3 text-gray-500">
                      {language == "vi" ? "Ngày sinh" : "Birthday"}:
                    </h1>
                    <h1 className="w-2/3">honggg</h1>
                  </div>
                  <div className="flex items-center my-3">
                    <h1 className="w-1/3 text-gray-500">
                      {language == "vi" ? "Điện thoại" : "Phone number"}:
                    </h1>
                    <h1 className="w-2/3">hongg có nhớ...</h1>
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
            {/*footer*/}
            <div className="py-1 px-3 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className=" w-full my-2 font-semibold text-xl py-2 hover:rounded hover:bg-gray-200 ease-linear transition-all duration-150"
                type="button"
                onClick={() => showModal(false)}
              >
                <CiEdit className="inline-block mr-2" size={18} />
                {language === "vi" ? "Cập nhật" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default ModalComponent;
