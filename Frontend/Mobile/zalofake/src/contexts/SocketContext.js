import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../api/config";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const { refreshToken, authUser, setAuthUser, reloadAuthUser } =
    useAuthContext();

  const connectSocket = (token) => {
    const newSocket = io(config.baseURL, {
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


  useEffect(() => {
    if (socket) {
      socket.on("force_logout", () => {
        if (authUser) {
          toast.error("Your account has been logged out from another device");
        }
        socket.disconnect();
        setAuthUser(null);
        AsyncStorage.clear();
      });
      socket.on("online_friends", (onlineFriends) => {
        setOnlineFriends(onlineFriends);
      });
      socket.on("receive-request-add-friend", handleReceiveFriendRequest);
      socket.on("accept-request-add-friend", handleFriendAcceptAction);
      socket.on("reject-request-add-friend", handleFriendRejectAction);
      socket.on("cancel-request-add-friend", handleFriendAction);
      socket.on("unfriend", handleFriendAction);


      return () => {
        socket.off("force_logout");
        socket.off("receive-request-add-friend", handleReceiveFriendRequest);
        socket.off("accept-request-add-friend", handleFriendAcceptAction);
        socket.off("reject-request-add-friend", handleFriendRejectAction);
        socket.off("cancel-request-add-friend", handleFriendAction);
      };
    }
  }, [socket]);

  const handleReceiveFriendRequest = async (sender) => {
    toast.success(`${sender.sender.name} has sent you a friend request`);
    await reloadAuthUser();
  };

  const handleFriendAcceptAction = async (sender) => {
    toast.success(`${sender.sender.name} has accepted your friend request`);
    await reloadAuthUser();
  };
  const handleFriendRejectAction = async (sender) => {
    console.log("reject", sender);
    toast.error(`${sender.sender.name} has rejected your friend request`);
    await reloadAuthUser();
  };

  const handleFriendAction = async () => {
    await reloadAuthUser();
  };

  return (
    <SocketContext.Provider value={{ socket, onlineFriends }}>
      {children}
    </SocketContext.Provider>
  );
};
