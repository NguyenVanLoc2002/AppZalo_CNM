import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import VerifyOTPModule from "../utils/verifyOTP";

const useUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [systemOTP, setSystemOTP] = useState(null);

  const { setAuthUser } = useAuthContext();

  const updateAvatar = async (file, authToken) => {
    setLoading(true);
    try {
      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const formData = new FormData();
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

      if (status === 200) {
        const { avatar } = data;
        if (avatar) {
          // toast.success("Avatar updated successfully");
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

  const updateBackground = async (file, authToken) => {
    setLoading(true);
    try {
      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const formData = new FormData();
      formData.append("background", file);

      const response = await axiosInstance.post(
        "/users/upload-background",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data, status } = response;

      if (status === 200) {
        const { background } = data;
        if (background) {
          // Cập nhật ảnh bìa thành công
          // Thực hiện các thao tác cần thiết sau khi cập nhật ảnh bìa
          // Ví dụ: hiển thị thông báo, cập nhật state, v.v.
        } else {
          throw new Error("Failed to update background");
        }
      } else {
        throw new Error(data.message || "Failed to update background");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Failed to update background! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/users/update-profile",
        userData
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
        error.response.data.message ||
          "Failed to update profile! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { updateAvatar, updateBackground, updateProfile, loading };
};

export default useUpdate;
