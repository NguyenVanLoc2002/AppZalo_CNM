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

    const createGroup = async (nameGroup, idUser) => {
        try {
            const response = await axiosInstance.post("/groups/create", {
              name : nameGroup,
              members: idUser
            })
            if (response.status === 201) {
              console.log("Create group success");
              return response.data;
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
    const getUserById = async (id) => {
        try {
            const response = await axiosInstance.get(`/users/get/uid/${id}`)
            if(response.status === 200){
                return response.data;
            } 
        } catch (error) {
            console.log("GetUserError",error);
        }
    }
    return { getAllGroup, getConversationById, createGroup, getUserById }
}

export default useCreateGroup