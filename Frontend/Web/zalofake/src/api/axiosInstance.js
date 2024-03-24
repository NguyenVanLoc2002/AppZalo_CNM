import axios from "axios";
import config from "./config";

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  timeout: 5000,
});

export default axiosInstance;
