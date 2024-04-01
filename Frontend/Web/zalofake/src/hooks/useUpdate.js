import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

const useUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const authToken = JSON.parse(localStorage.getItem("accessToken"));

  const updateAvatar = async (file) => {
    // console.log(userId);
    setLoading(true);
    try {
      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const formData = new FormData();
      // formData.append("userId", userId);
      formData.append("avatar", file);

      const response = await axiosInstance.post(
        "/users/upload-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data, status } = response;

      console.log("Response data:", data); // In ra dữ liệu từ phản hồi
      console.log("Response status:", status); // In ra mã trạng thái của phản hồi

      if (status === 200) {
        const { avatar } = data;
        if (avatar) {
          // Cập nhật thông tin người dùng với URL mới của avatar
          // Cụ thể, bạn có thể cập nhật trường profile.avatar trong user object
          // setAuthUser(user); // Thực hiện cập nhật thông tin người dùng sau khi cập nhật avatar thành công
          toast.success("Avatar updated successfully");
        } else {
          throw new Error("Failed to update avatar");
        }
      } else {
        throw new Error(data.message || "Failed to update avatar");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Failed to update avatar! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    console.log(userData);
    setLoading(true);
    try {
      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const response = await axiosInstance.post(
        "/users/update-profile",
        userData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const { data, status } = response;

      if (status === 200) {
        const { user } = data;
        if (user) {
          setAuthUser(user);
          toast.success("Profile updated successfully");
        } else {
          throw new Error("Failed to update profile");
        }
      } else {
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Failed to update profile! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { updateAvatar, updateProfile, loading };
};

export default useUpdate;
