import axiosInstance from "../api/axiosInstance";

const useSendMessage = () => {

    const sendImage = async (user, message) => {
        try {
            const response = await axiosInstance.post(`/chats/${user.userId}/sendImages`, message,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            )
            return response;

        } catch (error) {
            console.log("error1:", error)

        }
    }

    const sendMessage = async (user, message) => {
        try {
            const response = await axiosInstance.post(`/chats/${user.userId}/sendText`,
                { data: message }
            )
            return response;
        } catch (error) {
            console.log("error1:", error)
            return false;
        }
    }

 

    const sendVideo = async (user, message) => {
        try {
            const response = await axiosInstance.post(`/chats/${user.userId}/sendVideo`,
                message,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }

            )
            return response;
            
        } catch (error) {
            console.log("error1:", error)
            return false;
        }
    }

    return { sendMessage, sendImage, sendVideo }
}

export default useSendMessage;