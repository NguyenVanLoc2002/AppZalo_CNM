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
        Toast.show({
          type: "error",
          text1: "Error",
          text2: `${data.error}`,
          visibilityTime: 3000, // 3 giây
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
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
