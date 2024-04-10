import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
const useConversation = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  const getConversations = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        "conversations/getConversations"
      );
      if (response.status === 200) {
        const newConversationList = response.data.map((conversation) => {
          return {
            id: conversation._id,
            participants: conversation.participants,
            messages: conversation.messages,
            lastMessage: conversation.lastMessage,
          };
        });
        setConversations(newConversationList);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get conversations");
    }
    setLoading(false);
  };

  const deleteConversation = async (conversationId) => {
    try {
      const response = await axiosInstance.post(
        `conversations/deleted/${conversationId}`
      );
      if (response.status === 200) {
        toast.success("Conversation deleted successfully");
        getConversations();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete conversation");
    }
  };

  const getConversationByParticipants = async (participants) => {
    try {
      const response = await axiosInstance.get(
        "conversations/get/getByParticipants",
        {
          participants,
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to get conversation");
    }
  };

  return {
    conversations,
    loading,
    getConversations,
    deleteConversation,
    getConversationByParticipants,
  };
};

export default useConversation;
