import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../components/configs/axiosInstance";

const useLogout = async () => {
    try {
        // Kiểm tra token
        const authUser = await AsyncStorage.getItem("authUser");
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken')
  
        console.log('authUser: ', authUser)
        console.log('accessToken: ', accessToken)
        console.log('refreshToken: ', refreshToken)

        // Gửi yêu cầu logout tới server
        if (refreshToken !== null) {
          const response = await axiosInstance.post("/api/auth/logout", {
            headers: {
              Authorization: `JWT ${refreshToken}`
            }
          });
  
          if (response.data.success) {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
            return true
          }
        }
        return false
  
      } catch (error) {
        // Xử lý lỗi mạng hoặc lỗi khác
        console.error("Error during login", error);
      }
}

export default useLogout;