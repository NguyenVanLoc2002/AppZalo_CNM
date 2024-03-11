const express = require("express");
const router = express.Router();
const {
  getHistoryMessage,
  sendMessage,
} = require("../controllers/chat.controller");

// Lấy danh sách tin nhắn cá nhân với một người dùng cụ thể
router.get("/:userId", getHistoryMessage);

// Gửi tin nhắn mới cho một người dùng cụ thể
router.post("/:userId/send", sendMessage);

module.exports= router;
