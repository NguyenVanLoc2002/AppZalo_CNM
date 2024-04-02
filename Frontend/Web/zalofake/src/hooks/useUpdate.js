import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";

const useUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  // const authToken = JSON.parse(localStorage.getItem("accessToken"));

  const updateProfile = async (userData) => {
    setLoading(true);
    try {
      // if (!authToken) {
      //   throw new Error("Authentication token not found");
      // }

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

  return { updateProfile, loading };
};

export default useUpdate;
