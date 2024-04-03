import { useState } from "react";
import Toast from "react-native-toast-message";
import axiosInstance from "../api/axiosInstance";

const useChangePw = () => {
    const [isLoading, setIsLoading] = useState(false);

    const showToastSuccess = (notice) => {
        Toast.show({
            text1: notice,
            type: "success",
            topOffset: 0,
            position: "top",
        });
    };
    const showToastError = (notice) => {
        Toast.show({
            text1: notice,
            type: "error",
            topOffset: 0,
            position: "top",
        });
    }

    const changePassword = async (oldPassword, newPassword) => {
        try {
            setIsLoading(true);
          
            const response = await axiosInstance.post("/auth/change-password", {
                oldPassword, newPassword,
            });
           
            if (response.status === 200) {
                showToastSuccess("Change Password Successfully")
                setIsLoading(false);
                return true;
            } else {
                showToastError("Failed to change password")
                setIsLoading(false);
                return false;
            }

        } catch (error) {
            console.log(error);
            setIsLoading(false);
            showToastError(error.response.data.message);
            return false;
        }

    };

    return { showToastSuccess, showToastError, changePassword }
}

export default useChangePw;