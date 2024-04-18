import axiosInstance from "../api/axiosInstance";
import Toast from "react-native-toast-message";

const useCreateGroup = () => {
  const getAllGroup = async () => {
    try {
      const response = await axiosInstance.get("/groups/all");
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 500) {
        console.log("getAllGrEr");
        return null;
      }
    } catch (error) {
      console.log("getAllGrEr: ", error);
      return null;
    }
  }
  const getUserById = async (id) => {
    try {
      const response = await axiosInstance.get(`/users/get/uid/${id}`)
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log("GetUserError", error);
    }
  }
 


  const getConversationById = async (idConversation) => {
    try {
      const response = await axiosInstance.get(
        `/conversations/get/${idConversation}`
      );
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 500) {
        console.log("getConversationErr");
        return null;
      }
    } catch (error) {
      console.log("getConversationErr: ", error);
      return null;
    }
  };

  const getConversations = async (idConversation) => {
    try {
      const response = await axiosInstance.get(
        "/conversations/getConversations"
      );
      if (response.status === 200) {
        const group = [];
        let lastMessage = null;
        let nameUserSendLast = null;

        for (const data of response.data) {
          if (data._id === idConversation) {
            for (const participant of data.participants) {
              if (participant._id === data?.lastMessage?.senderId) {
                nameUserSendLast = participant.profile.name;
                if (data?.lastMessage?.contents[0].type === "text") {
                  lastMessage = data?.lastMessage?.contents[0]?.data;
                } else if (data?.lastMessage?.contents[0].type === "image") {
                  lastMessage = ": [Hình ảnh]";
                } else {
                  lastMessage = ": [Video]";
                }
              }
            }
          }
          const newGroup = {
            lastMessage: lastMessage,
            sendTime: data?.lastMessage?.timestamp,
            userSend: nameUserSendLast,
          };
          group.push(newGroup);
        }
        return group;
      } else if (response.status === 500) {
        console.log("getAllConversationsErr");
        return null;
      }
    } catch (error) {
      console.log("getAllConversationsErr: ", error);
      return null;
    }
   
  }
  const createGroup = async (nameGroup, idUser) => {
    try {
      const response = await axiosInstance.post("/groups/create", {
        name: nameGroup,
        members: idUser,            
      });
      if (response.status === 201) {
        console.log("Create group success");
        Toast.show({
          type: "success",
          text1: "Tạo nhóm thành công!",
          text1Style: { color: "white" }, // Đặt màu chữ trắng cho text1
          position: "bottom", // Đặt vị trí ở phía dưới   
        });
        return response.data;
      } else if (response.status === 500) {
        console.log("Create group fail");
        return null;
      }
    } catch (error) {
      console.log("CreateGroupError:", error);
      return null;
    }
  };
  const deleteGroup = async (groupId) => {
    setGrLoading(true);
    try {
      const response = await axiosInstance.delete(`/groups/delete/${groupId}`);
      const { status } = response;

      if (status === 200) {
        return true;
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setGrLoading(false);
    }
  };

  const addMember = async (groupId, memberData) => {
    setGrLoading(true);
    try {
      const response = await axiosInstance.post(
        `/groups/addMembers/${groupId}`,
        memberData
      );
      const { data, status } = response;

      if (status === 200) {
        setGroup(data.group);
        return data.message;
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setGrLoading(false);
    }
  };

  const removeMember = async (groupId, memberData) => {
    console.log(memberData);
    setGrLoading(true);
    try {
      const response = await axiosInstance.post(
        `/groups/removeMembers/${groupId}`,
        memberData
      );
      const { data, status } = response;

      if (status === 200) {
        setGroup(data.group);
        return true;
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setGrLoading(false);
    }
  };

  return {
    getAllGroup,
    getConversationById,
    getConversations,
    createGroup,
    removeMember,
    addMember,
    deleteGroup,getUserById
  };
};


export default useCreateGroup;
