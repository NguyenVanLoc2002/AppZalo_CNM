import React, { useState } from "react";
import ContactMenu from "../ContactMenu";
import FriendListComponent from "../FriendListComponent";
import JoinGroupComponent from "../JoinedGroupComponent";
import FriendRequestComponent from "../FriendRequestComponent";
function ContactComponent({ language }) {
  const [tabSelected, setTabSelected] = useState(0);

  const changeTab = (tab) => {
    setTabSelected(tab);
  }
  return (
    <>
      <div className="bg-gray-100 h-screen w-full flex">
        <div className="h-screen w-full sm:w-96 bg-white">
          <ContactMenu language={language} changeTab={changeTab} />
        </div>
        <div className="h-screen sm:w-[calc(100%-24rem)] w-0 overflow-y-auto">
          {tabSelected == 0 ? (
            <FriendListComponent language={language}/>
          ) : tabSelected == 1 ? (
            <JoinGroupComponent language={language}/>
          ) : (
            <FriendRequestComponent language={language}/>
          )}
        </div>
      </div>
    </>
  );
}

export default ContactComponent;
