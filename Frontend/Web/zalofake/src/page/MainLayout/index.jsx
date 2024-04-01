import Sidebar from "../../layouts/Sidebar";
import { useState } from "react";
import MenuComponent from "../../layouts/Menu";
import ModalComponent from "../../layouts/Modal/index";
import ContactComponent from "../../components/ContactComponents/ContactComponent";
import ChatComponents from "../../components/ChatComponents/ChatComponent";

function MainLayout() {
  const [showModal, setShowModal] = useState(false);
  const [curentTab, setCurentTab] = useState(1);
  const [currentMenu, setCurrentMenu] = useState();
  const [language, setLanguage] = useState("vi");
  const userInfo = JSON.parse(localStorage.getItem("authUser"));

  const showModalProfile = () => {
    setShowModal(!showModal);
    setCurrentMenu();
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
        <ModalComponent
          showModal={showModalProfile}
          language={language}
          userInfo={userInfo}
        />
      ) : (
        <> </>
      )}
    </>
  );
}

export default MainLayout;
