import axios from "axios";
import config from "./config";
import toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: config.baseURL
});



axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(AsyncStorage.getItem("accessToken"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("hihi");
    const originalRequest = error.config;
    const reqURL = originalRequest && originalRequest.url;

    if (error.response.status === 401 && !reqURL.includes("/auth/login")) {
      try {
        const refreshToken = JSON.parse(AsyncStorage.getItem("refreshToken"));
        if (!refreshToken) {
          toast.error("Your session has expired. Please login again.");
          throw new Error("No refresh token available.");
        }

        const refreshedTokenResponse = await axiosInstance.post("/auth/refreshToken", {
          refreshToken: refreshToken
        });
        const newAccessToken = refreshedTokenResponse.data.newAccessToken;
        AsyncStorage.setItem("accessToken", JSON.stringify(newAccessToken));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        toast.error("Your session has expired. Please login again.");
        AsyncStorage.clear();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
