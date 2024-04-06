import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import toast from "react-hot-toast";

const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [isDisplayToast, setIsDisplayToast] = useState(false);
  const { refreshToken, setAuthUser, setAccessToken, setRefreshToken } =
    useAuthContext();

  const connectSocket = (token) => {
    const newSocket = io("http://localhost:3000", {
      query: {
        token: token,
      },
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    if (refreshToken) {
      connectSocket(refreshToken);
    } else {
      setSocket(null);
      socket?.disconnect();
    }
    return () => {
      if (socket) {
        socket?.disconnect();
      }
    };
  }, [refreshToken]);

  if (socket) {
    socket.on("force_logout", () => {
      setAuthUser(null);
      setRefreshToken(null);
      setAccessToken(null);
      if (!isDisplayToast) {
        toast.error("Your account has been logged out from another device");
        socket.disconnect();
        setIsDisplayToast(true);
      }
    });
    socket.on("online_friends", (onlineFriends) => {
      setOnlineFriends(onlineFriends);
    });
  }

  return (
    <SocketContext.Provider value={{ socket, onlineFriends }}>
      {children}
    </SocketContext.Provider>
  );
};
