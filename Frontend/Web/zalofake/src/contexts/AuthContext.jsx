/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [accessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem('accessToken')));

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
  }, [authUser, accessToken]);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
