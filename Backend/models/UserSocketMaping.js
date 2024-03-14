const mongoose = require("mongoose");

const userSocketMapingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  socket_id: {
    type: String,
    required: true,
  },
});

const UserSocketMaping = mongoose.model(
  "UserSocketMaping",
  userSocketMapingSchema
);

module.exports = UserSocketMaping;
