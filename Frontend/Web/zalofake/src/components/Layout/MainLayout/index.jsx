import Sidebar from "../../SidebarComponent";
import { useState } from "react";

function MainLayout({isLogin}) {

  //check login
  // if (!isLogin) {
  //   window.location.href = "/";
  // }
  const [isShowSetting, setisShowSetting] = useState(false)
  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="h-screen">
          <Sidebar isShowSetting={isShowSetting} curentTab={0}/>
        </div>
        <div className="h-screen w-full md:w-96">
          {
            isShowSetting ? <SettingComponent /> : <></>
          }
        </div>
      </div>
    </>
  );
}

export default MainLayout;
