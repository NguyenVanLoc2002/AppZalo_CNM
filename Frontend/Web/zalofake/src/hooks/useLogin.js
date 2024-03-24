import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../components/configs/axiosInstance";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser, setAccessToken } = useAuthContext();

  const login = async (phone, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", {
        phone,
        password,
      });

      const data = response.data;
      if (response.status === 200) {
        setAuthUser(data.user);
        setAccessToken(data.accessToken);
      } else {
        // Hiển thị thông báo lỗi từ data.message
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Login failed! Please try again.");
    }
    setLoading(false);
  };

  return { login, loading };
};

export default useLogin;
