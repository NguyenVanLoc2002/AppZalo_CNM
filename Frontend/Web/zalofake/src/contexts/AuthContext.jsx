import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    /* save accessToken : 
    - to Redux store
    - to localStorage
    -> you can choose one of them or both, 
    As long as you can get the accessToken anywhere in the app
    */
  }, [authUser, accessToken]);

  return (
    <AuthContext.Provider
      value={{ authUser, setAuthUser, accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
