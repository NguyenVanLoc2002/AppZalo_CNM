import Sidebar from "../../SidebarComponent";
import { useState } from "react";
import MenuComponent from "../../MenuComponent";
import ModalComponent from "../../ModalComponent/insex";
import ContactComponent from "../../ContactComponents/ContactComponent";
import ChatComponents from "../../ChatComponents/ChatComponent";

function MainLayout({ isLogin }) {
  const [showModal, setShowModal] = useState(false);
  const [curentTab, setCurentTab] = useState();
  const [currentMenu, setCurrentMenu] = useState();
  const [language, setLanguage] = useState("vi");
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn Tủn",
    gender: 1,
    dob: new Date("2002-04-24"),
    avatar: "public/zalo.svg",
    background: "public/bg-login.svg",
    phone: "0123456789",
  });

  const showModalProfile = () => {
    setShowModal(!showModal);
    setCurrentMenu()
  };

  const changeTab = (tab) => {
    setCurentTab(tab);
  };

  const changeMenu = (menu) => {
    if (currentMenu == menu) {
      setCurrentMenu();
    } else {
      setCurrentMenu(menu);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="h-screen">
          <Sidebar
            curentTab={curentTab}
            changeTab={changeTab}
            changeMenu={changeMenu}
          />
        </div>
        <div className="h-screen w-full relative">
          {curentTab == 1 ? (
            <>
              <ChatComponents language={language} />
              
              {/* Goi toi cac component tương ung voi tab cho nay ne nha :V  */}
              {currentMenu == 1 ? (
                <MenuComponent
                  language={language}
                  setLanguage={setLanguage}
                  typeMenu={"profile"}
                  showModal={showModalProfile}
                />
              ) : currentMenu == 2 ? (
                <MenuComponent
                  language={language}
                  setLanguage={setLanguage}
                  typeMenu={"setting"}
                  showModal={showModalProfile}
                />
              ) : (
                <> </>
              )}
            </>
          ) : curentTab == 2 ? (
            <>
              <ContactComponent language={language} />
              {currentMenu == 1 ? (
                <MenuComponent
                  language={language}
                  setLanguage={setLanguage}
                  typeMenu={"profile"}
                  showModal={showModalProfile}
                />
              ) : currentMenu == 2 ? (
                <MenuComponent
                  language={language}
                  setLanguage={setLanguage}
                  typeMenu={"setting"}
                  showModal={showModalProfile}
                />
              ) : (
                <> </>
              )}
            </>
          ) : curentTab == 3 ? (
            <>
              {/* Goi toi cac component tương ung voi tab cho nay ne nha  :V  */}

              {currentMenu == 1 ? (
                <MenuComponent
                  language={language}
                  setLanguage={setLanguage}
                  typeMenu={"profile"}
                  showModal={showModalProfile}
                />
              ) : currentMenu == 2 ? (
                <MenuComponent
                  language={language}
                  setLanguage={setLanguage}
                  typeMenu={"setting"}
                  showModal={showModalProfile}
                />
              ) : (
                <> </>
              )}
            </>
          ) : curentTab == 4 ? (
            <>
              {/* Goi toi cac component tương ung voi tab cho nay ne nha  :V  */}

              {currentMenu == 1 ? (
                <MenuComponent
                  language={language}
                  setLanguage={setLanguage}
                  typeMenu={"profile"}
                  showModal={showModalProfile}
                />
              ) : currentMenu == 2 ? (
                <MenuComponent
                  language={language}
                  setLanguage={setLanguage}
                  typeMenu={"setting"}
                  showModal={showModalProfile}
                />
              ) : (
                <> </>
              )}
            </>
          ) : (
            <>
              {/* Goi toi cac component tương ung voi tab cho nay ne nha  :V  */}

              {currentMenu == 1 ? (
                <MenuComponent
                  language={language}
                  setLanguage={setLanguage}
                  typeMenu={"profile"}
                  showModal={showModalProfile}
                />
              ) : currentMenu == 2 ? (
                <MenuComponent
                  language={language}
                  setLanguage={setLanguage}
                  typeMenu={"setting"}
                  showModal={showModalProfile}
                />
              ) : (
                <> </>
              )}
            </>
          )}
          {showModal ? (
            <ModalComponent
              showModal={showModalProfile}
              language={language}
              userInfo={userInfo}
            />
          ) : (
            <> </>
          )}
        </div>
      </div>

      {showModal ? (
        <ModalComponent showModal={showModalProfile} language={language} userInfo={userInfo} />
      ) : (
        <> </>
      )}
    </>
  );
}

export default MainLayout;
