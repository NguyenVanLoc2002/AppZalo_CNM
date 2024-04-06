const express = require("express");
const { createConversation, deleteConversation } = require("../controllers/conversation.controller");
const router = express.Router();

// Tạo Cuộc Trò Chuyện Mới
router.post("/newConversation", createConversation);

// Xóa Cuộc Trò Chuyện theo _id của conversation
router.post("/deleted/:conversationId", deleteConversation)

module.exports = router;
