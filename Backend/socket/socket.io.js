const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const UserSocketMaping = require("../models/UserSocketMaping");
const User = require("../models/User");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const getReciverSocketId = async (reciverId) => {
  return await UserSocketMaping.findOne({
    user_id: reciverId,
  });
};

const getOnlineFriends = async (userId) => {
  const userSocketMaping = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "usersocketmapings",
        localField: "friendList",
        foreignField: "user_id",
        as: "online_friends",
      },
    },
    {
      $unwind: "$online_friends",
    },
    {
      $project: {
        _id: 0,
        online_friends: 1,
      },
    },
  ]);

  return userSocketMaping;
};

io.on("connection", async (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(`User connected with id: ${userId}`);

  const userSocketMaping = await UserSocketMaping.findOne({
    user_id: userId,
  });
  if (userSocketMaping) {
    userSocketMaping.socket_id = socket.id;
    await userSocketMaping.save();
  } else {
    const newUserSocketMaping = new UserSocketMaping({
      user_id: userId,
      socket_id: socket.id,
    });
    await newUserSocketMaping.save();
  }

  const onlineFriends = await getOnlineFriends(userId);
  onlineFriends.forEach((friend) => {
    io.to(friend.online_friends.socket_id).emit("user_connected", userId);
  });

  const onlineFriendsId = onlineFriends.map(
    (friend) => friend.online_friends.user_id
  );
  io.to(socket.id).emit("online_friends", onlineFriendsId);

  // sent list of online friends of user to the user connected
  socket.on("get_online_friends", async (user) => {
    const onlineFriends = await getOnlineFriends(user);
    const onlineFriendsId = onlineFriends.map(
      (friend) => friend.online_friends.user_id
    );
    io.to(socket.id).emit("online_friends", onlineFriendsId);
  });


  // Nhận tin nhắn mới và gửi tới người nhận thông qua socket
  socket.on("send_message", async({receiverId, message})=>{
    try {
      const receiverSocketId = await getReciverSocketId(receiverId);
      //Send message to receiver through socket
      io.to(receiverSocketId).emit("new_message",{senderId: userId, message})
    } catch (error) {
      console.error("Error sending message:", error);
    }
  })


  socket.on("disconnect", async () => {
    console.log(`User disconnected with id: ${userId}`);
    try {
      const deletedUser = await UserSocketMaping.findOneAndDelete({
        user_id: userId,
      });

      const onlineFriends = await getOnlineFriends(userId);

      if (deletedUser) {
        onlineFriends.forEach((friend) => {
          io.to(friend.online_friends.socket_id).emit(
            "user_disconnected",
            userId
          );
        });
      }
    } catch (err) {
      console.log(err);
      return;
    }
  });
});

module.exports = { app, server, io, getReciverSocketId };
