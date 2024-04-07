import axiosInstance from "../api/axiosInstance";

const useSendMessage = () => {

    const sendMessage = async (user, message) => {
        console.log("message: ", message);
        try {
            const response = await axiosInstance.post(`/chats/${user.userId}/sendMessage`,
                {

                    data: message,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }

            )
            if (response.status === 201) {
                console.log("success");
                return true;
            }
            else if (response.status === 500) {
                console.log("fail");
                return false;
            }

        } catch (error) {
            console.log("error1:", error)
            return false;
        }
    }

    return { sendMessage }
}

export default useSendMessage;