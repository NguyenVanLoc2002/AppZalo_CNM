import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AsyncStorage.clear();
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const AuthUser = await AsyncStorage.getItem("authUser");
        const AccessToken = await AsyncStorage.getItem("accessToken");
        const RefreshToken = await AsyncStorage.getItem("refreshToken");
        console.log(AuthUser, AccessToken, RefreshToken);
        if (AuthUser) {
          setAuthUser(JSON.parse(AuthUser));
          console.log("set authUser");
        }
        if (AccessToken) {
          setAccessToken(AccessToken);
          console.log("set accessToken");
        }
        if (RefreshToken) {
          setRefreshToken(RefreshToken);
          console.log("set refreshToken");
        }
      } catch (error) {
        throw new Error("Error loading data from AsyncStorage:", error);
      }
    };

    loadData();
  }, []);
  useEffect(() => {
    const saveData = async () => {
      try {
        if (authUser) {
          await AsyncStorage.setItem("authUser", JSON.stringify(authUser));
          console.log("save authUser");
        }
        if (accessToken) {
          await AsyncStorage.setItem("accessToken", accessToken);
          console.log("save accessToken");
        }
        if (refreshToken) {
          await AsyncStorage.setItem("refreshToken", refreshToken);
          console.log("save refreshToken");
        }
      } catch (error) {
        throw new Error("Error saving data to AsyncStorage:", error);
      }
    };

    saveData();
  }, [authUser, accessToken, refreshToken]);

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
