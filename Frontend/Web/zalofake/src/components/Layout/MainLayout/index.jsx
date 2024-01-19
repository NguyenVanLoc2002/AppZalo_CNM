import Sidebar from "../../SidebarComponent";
import { useState } from "react";
import MenuComponent from "../../MenuComponent";
import ModalComponent from "../../ModalComponent/insex";

function MainLayout({ isLogin }) {
  //check login
  // if (!isLogin) {
  //   window.location.href = "/";
  // }
  const [showModal, setShowModal] = useState(true);
  const [curentTab, setCurentTab] = useState();
  const [language, setLanguage] = useState("vi");

  const showModalProfile = () => {
    setShowModal(!showModal);
    setCurentTab()
  };

  const changeTab = (tab) => {
    setCurentTab(tab);
  };

  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="h-screen">
          <Sidebar curentTab={curentTab} changeTab={changeTab} />
        </div>
        <div className="h-screen w-full md:w-96 relative">
          {curentTab == 5 ? (
            <MenuComponent
              language={language}
              setLanguage={setLanguage}
              typeMenu={"setting"}
              showModal={showModalProfile}
            />
          ) : curentTab == 0 ?(
            <MenuComponent
              language={language}
              setLanguage={setLanguage}
              typeMenu={"profile"}
              showModal={showModalProfile}

            />
          ) : (
            <></>
          )}
        </div>
      </div>

      {showModal ? (
        <ModalComponent showModal={showModalProfile} language={language}/>
      ) : null}
    </>
  );
}

export default MainLayout;
