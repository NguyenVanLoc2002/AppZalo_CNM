import ListChatComponent from "../ListChatComponent";
import PeopleChatComponent from "../PeopleChatComponent";

function ChatComponents({ language }) {
 
  return (
    <>
      <div className="bg-gray-100 h-screen w-full flex">
        <div className="h-screen w-full w-4/12 bg-white">
          <ListChatComponent language={language} />
        </div>
        <PeopleChatComponent language={language} />
      </div>
    </>
  );
}

export default ChatComponents;
