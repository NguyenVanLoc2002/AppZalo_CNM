import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import * as Device from "expo-device";

import axiosInstance from "../components/configs/axiosInstance";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser, setAccessToken, setRefreshToken } = useAuthContext();

  const login = async (phone, password) => {
    setLoading(true);
    try {
      const device_id = Device.osBuildId;
      const response = await axiosInstance.post("/auth/login", {
        phone,
        password,
        device_id,
      });

      const data = response.data;
      if (response.status === 200) {
        setAuthUser(data.user);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
      } else {
        showMesg("Error during login", "error"); // Hiển thị thông báo lỗi khi đăng nhập không thành công
      }
    } catch (error) {
      console.error("Error during login:", error);
      showMesg("Error during login", "error"); // Hiển thị thông báo lỗi khi có lỗi trong quá trình đăng nhập
    }
    setLoading(false);
  };

  return { login, loading };
};

const showMesg = (mesg, type) => {
  Toast.show({
    type: `${type}`,
    text1: `${mesg}`,
    text2: `${mesg}`,
  });
};

export default useLogin;
