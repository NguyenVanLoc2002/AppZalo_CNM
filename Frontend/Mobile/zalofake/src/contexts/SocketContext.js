import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";
import Toast from "react-native-toast-message";
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
    const newSocket = io(config.socketURL, {
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
          Toast.error({
            text1: "Your account has been logged out from another device",
            type: "error",
          });
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
    Toast.show({
      text1: `${sender.sender.name} has sent you a friend request`,
      type: "success",
    });
    await reloadAuthUser();
  };

  const handleFriendAcceptAction = async (sender) => {
    Toast.show({
      text1: `${sender.sender.name} has accepted your friend request`,
      type: "success",
    });
    await reloadAuthUser();
  };
  const handleFriendRejectAction = async (sender) => {
    console.log("reject", sender);
    Toast.show({
      text1: `${sender.sender.name} has rejected your friend request`,
      type: "error",
    });
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
