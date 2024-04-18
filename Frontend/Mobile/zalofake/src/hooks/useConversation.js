import { useState } from "react";

import axiosInstance from "../api/axiosInstance";
import Toast from "react-native-toast-message";

const useConversation = () => {
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState({});
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
            _id: conversation._id,
            participants: conversation.participants,
            messages: conversation.messages,
            lastMessage: conversation.lastMessage,
            tag : conversation.tag,
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
        // console.log(response.data)
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
  const deleteConversation = async (conversationId) => {
    try {
      const response = await axiosInstance.post(
        `conversations/deleted/${conversationId}`
      );
      if (response.status === 200) {
        Toast.success("Conversation deleted successfully");
        getConversations();
      }
    } catch (error) {
      console.log(error);
      Toast.error("Failed to delete conversation");
    }
  };

  const getConversationByID = async (conversationId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `conversations/get/${conversationId}`
      );
      if (response.status === 200) {
        setConversation(response.data);
        setLoading(false);
        return response.data;
      }
    } catch (error) {
      console.log(error);
      Toast.error("Failed to get conversation");
      setLoading(false);
      return null;
    }
  };

  return {
    conversations,
    conversation,
    loading,
    getConversations,
    deleteConversation,
    getConversationByID,
    getConversationsByParticipants
    // getConversationByParticipants,
  };
};

export default useConversation;
