import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { encode as base64Encode, decode as base64Decode } from "base-64"; // Import thư viện mã hóa base64

const ENCRYPTION_KEY = "CongNgheMoi"; // Khóa bí mật, thay bằng khóa thực tế của bạn

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const encryptedAuthUser = await AsyncStorage.getItem("authUser");
        const encryptedAccessToken = await AsyncStorage.getItem("accessToken");
        const encryptedRefreshToken = await AsyncStorage.getItem(
          "refreshToken"
        );

        if (encryptedAuthUser) {
          const decryptedAuthUser = base64Decode(encryptedAuthUser); // Giải mã base64
          setAuthUser(JSON.parse(decryptedAuthUser));
        }
        if (encryptedAccessToken) {
          const decryptedAccessToken = base64Decode(encryptedAccessToken);
          setAccessToken(decryptedAccessToken);
        }
        if (encryptedRefreshToken) {
          const decryptedRefreshToken = base64Decode(encryptedRefreshToken);
          setRefreshToken(decryptedRefreshToken);
        }
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };

    loadData();
  }, []);
  useEffect(() => {
    const saveData = async () => {
      try {
        if (authUser) {
          const encryptedAuthUser = base64Encode(JSON.stringify(authUser)); // Mã hóa base64
          await AsyncStorage.setItem("authUser", encryptedAuthUser);
        } else {
          await AsyncStorage.removeItem("authUser");
        }
        if (accessToken) {
          const encryptedAccessToken = base64Encode(accessToken);
          await AsyncStorage.setItem("accessToken", encryptedAccessToken);
        } else {
          await AsyncStorage.removeItem("accessToken");
        }
        if (refreshToken) {
          const encryptedRefreshToken = base64Encode(refreshToken);
          await AsyncStorage.setItem("refreshToken", encryptedRefreshToken);
        } else {
          await AsyncStorage.removeItem("refreshToken");
        }
      } catch (error) {
        console.error("Error saving data to AsyncStorage:", error);
      }
    };

    saveData();
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
