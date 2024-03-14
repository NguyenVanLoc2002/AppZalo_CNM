import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const storedAuthUser = await AsyncStorage.getItem("authUser");
        const storedAccessToken = await AsyncStorage.getItem("accessToken");
        const storedRefreshToken = await AsyncStorage.getItem("refreshToken");

        if (storedAuthUser) {
          setAuthUser(JSON.parse(storedAuthUser));
        }
        if (storedAccessToken) {
          setAccessToken(storedAccessToken);
        }
        if (storedRefreshToken) {
          setRefreshToken(storedRefreshToken);
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
          await AsyncStorage.setItem("authUser", JSON.stringify(authUser));
        } else {
          await AsyncStorage.removeItem("authUser");
        }
        if (accessToken) {
          await AsyncStorage.setItem("accessToken", accessToken);
        } else {
          await AsyncStorage.removeItem("accessToken");
        }
        if (refreshToken) {
          await AsyncStorage.setItem("refreshToken", refreshToken);
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
