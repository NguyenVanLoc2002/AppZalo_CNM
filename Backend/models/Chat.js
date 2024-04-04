const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  contents: [
    {
      type: {
        type: String,
        enum: ["text", "image", "video", "link", "file", "audio"],
        required: true,
      }, // Loại nội dung
      data: { type: String }, // Dữ liệu nội dung (văn bản, đường dẫn hình ảnh, đường dẫn video,..)
    },
  ],
  timestamp: { type: Date, default: Date.now },
  read:{type: Boolean, default: false},
});

const Chats = mongoose.model("chats", chatSchema);

module.exports = Chats;
