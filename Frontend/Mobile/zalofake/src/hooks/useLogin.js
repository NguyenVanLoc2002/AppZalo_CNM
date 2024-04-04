import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import Toast from "react-native-toast-message";
import * as Device from "expo-device";

import axiosInstance from "../api/axiosInstance";

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

      if (response && response?.status === 200) {
        setAuthUser(data.user);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        // Nếu đăng nhập thành công, reset errorCount về 0
        setErrorCount(0);
      }
      else {
        showMesg("Error during login", "error");
      }
    } catch (error) {
      console.log("LOGIN ER: ", error);
      if (error.response.status === 401) {
        showMesg("Invalid phone or password !", "error");
      }
      else if (error.request) {
        showMesg("Error server, please try again !", "error");
        throw error;
      } else {
        showMesg("Error during login", "error");
        throw error;
      }
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