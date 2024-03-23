// import axios from "axios";
// import config from "./config";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const axios = require("axios");
// const config = require("./config");
// const AsyncStorage = require("@react-native-async-storage/async-storage");

import axios from "axios";
import config from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isRefreshing = false;
let refreshSubscribers = [];

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("axiosInstance:", axiosInstance);

// Hàm để thêm các subscriber vào mảng
function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

// Hàm để gửi yêu cầu làm mới token
function onRefreshed(token) {
  refreshSubscribers.map((callback) => callback(token));
}

// Hàm để lấy access token từ AsyncStorage
async function getRefreshToken() {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    return refreshToken;
  } catch (error) {
    console.error("Error getting refreshToken from AsyncStorage:", error);
    return null;
  }
}
const refreshToken = getRefreshToken();
const accessToken = AsyncStorage.getItem("accessToken");

axiosInstance.interceptors.request.use(
  async (config) => {
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
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
    const originalRequest = error.config;

    // Nếu lỗi là mã lỗi 401 (Unauthorized) và không phải là quá trình làm mới token
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang quá trình làm mới token, đợi cho đến khi token được làm mới xong và gửi lại yêu cầu ban đầu
        await new Promise((resolve) => subscribeTokenRefresh(resolve));
        return axiosInstance(originalRequest);
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        // Gửi yêu cầu để làm mới token
        const response = await axiosInstance.post("/auth/refreshToken", {
          //   refreshToken: refreshToken.then((res) => res),
          refreshToken: refreshToken,
        });
        // Lưu trữ token mới
        const newAccessToken = response.data.newAccessToken;
        // save new token to AsyncStorage
        // await AsyncStorage.setItem("accessToken", newAccessToken);
        // Cập nhật header của request ban đầu với token mới
        originalRequest.headers.Authorization = "Bearer " + newAccessToken;
        // Gửi lại yêu cầu ban đầu với token mới
        onRefreshed(newAccessToken);
        // Trả về response sau khi làm mới token thành công
        return axiosInstance(originalRequest);
      } catch (error) {
        // Xử lý lỗi khi làm mới token thất bại
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    // Trả về lỗi nếu không phải mã lỗi 401 hoặc quá trình làm mới token không thành công
    return Promise.reject(error);
  }
);

export default axiosInstance;
