const io = require("socket.io-client");
const mongoose = require("mongoose");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter user ID: ", (userId) => {
  const socket = io("http://localhost:3000", {
    query: {
      userId: userId,
    },
  });


  socket.on("connect", () => {
    console.log("Connected to server!");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server!");
  });

  socket.on("user_connected", (user) => {
    console.log(`User connected with id: ${user}`);
    socket.emit("get_online_friends", new mongoose.Types.ObjectId(userId));
  });

  socket.on("user_disconnected", (user) => {
    socket.emit("get_online_friends", new mongoose.Types.ObjectId(userId));
    console.log(`User disconnected with id: ${user}`);
  });

  socket.on("online_friends", (onlineFriends) => {
    console.log("Online friends: ", onlineFriends);
  });

  rl.close();
});
