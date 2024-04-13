import axiosInstance from "../api/axiosInstance";
import { useState } from "react";
const useConversation = () => {

    const [conversations, setConversations] = useState([]);
    // const [conversation, setConversation] = useState();
    const [loading, setLoading] = useState(true);
  
    const getConversations = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          "/conversations/getConversations"
        );
        if (response.status === 200) {
          const newConversationList = response.data.map((conversation) => {
            return {
              id: conversation._id,
              participants: conversation.participants,
              messages: conversation.messages,
              lastMessage: conversation.lastMessage,
              tag : conversation.tag
            };
          });
          setConversations(newConversationList);
        }
      } catch (error) {
        console.log(error);
        // toast.error("Failed to get conversations");
      }
      setLoading(false);
    };
    const getConversationsByParticipants = async (participant) => {
      try {
        setLoading(true);
        const participants = []
        participants.push(participant)
        // console.log(participants)
        const response = await axiosInstance.post(
          "/conversations/getByParticipants",{participants}
        );
        if (response.status === 200) {
          console.log(response.data)
          return response.data;
          // setConversation(response.data);
          // console.log(conversation)
        }
      } catch (error) {
        console.log(error);
        return null;
        // toast.error("Failed to get conversations");
      }
      setLoading(false);
    };

    return { conversations, getConversations ,getConversationsByParticipants}
}

export default useConversation;