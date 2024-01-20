import Sidebar from "../../SidebarComponent";
import { useState } from "react";
import MenuComponent from "../../MenuComponent";
import ModalComponent from "../../ModalComponent/insex";
import ContactComponent from "../../ContactComponent";

function MainLayout({ isLogin }) {
  
  const [showModal, setShowModal] = useState(false);
  const [curentTab, setCurentTab] = useState();
  const [currentMenu, setCurrentMenu] = useState();
  const [language, setLanguage] = useState("vi");

  const showModalProfile = () => {
    setShowModal(!showModal);
    setCurentTab();
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
              <ContactComponent />
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
        </div>
      </div>

      {showModal ? (
        <ModalComponent showModal={showModalProfile} language={language} />
      ) : <> </> }
    </>
  );
}

export default MainLayout;
