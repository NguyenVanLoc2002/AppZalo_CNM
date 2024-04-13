import axiosInstance from "../api/axiosInstance";

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

    const getConversationById = async (idConversation) => {
        try {
            const response = await axiosInstance.get(`/conversations/get/${idConversation}`);
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
    }

    const getConversations = async (idConversation) => {
        try {
            const response = await axiosInstance.get("/conversations/getConversations");
            if (response.status === 200) {
                const group = [];
                let lastMessage = null;
                let nameUserSendLast = null;

                for (const data of response.data) {
                    if (data._id === idConversation) {
                        for (const participant of data.participants) {
                            if (participant._id === data?.lastMessage?.senderId) {
                                nameUserSendLast = participant.profile.name
                                if (data?.lastMessage?.contents[0].type === 'text') {
                                    lastMessage = data?.lastMessage?.contents[0]?.data
                                } else if (data?.lastMessage?.contents[0].type === 'image') {
                                    lastMessage = ": [Hình ảnh]"
                                } else {
                                    lastMessage = ": [Video]"
                                }
                            }
                        }
                    }
                    const newGroup = {
                        lastMessage: lastMessage,
                        sendTime: data?.lastMessage?.timestamp,
                        userSend: nameUserSendLast
                    }
                    group.push(newGroup)
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
              name : nameGroup,
              members: idUser
            })
            if (response.status === 201) {
              console.log("Create group success");
              return response.data._id;
            }
            else if (response.status === 500) {
              console.log("Create group fail");
            return null;
            }
          } catch (error) {
            console.log("CreateGroupError:", error);
            return null;
          }
    }

    return { getAllGroup, getConversationById, getConversations, createGroup }
}

export default useCreateGroup