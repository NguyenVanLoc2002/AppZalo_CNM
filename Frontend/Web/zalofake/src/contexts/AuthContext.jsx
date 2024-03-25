/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  const [accessToken, setAccessToken] = useState(
    JSON.parse(localStorage.getItem("accessToken"))
  );
  const [refreshToken, setRefreshToken] = useState(
    JSON.parse(localStorage.getItem("refreshToken"))
  );

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("authUser");
    }
    if (accessToken) {
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
    } else {
      localStorage.removeItem("accessToken");
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    } else {
      localStorage.removeItem("refreshToken");
    }
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
