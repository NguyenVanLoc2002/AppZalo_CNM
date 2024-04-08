const express = require("express");
const {
  createConversation,
  deleteConversation,
  getConversation,
  getConversations,
} = require("../controllers/conversation.controller");
const router = express.Router();

router.get("/get/:conversationId", getConversation);
router.get("/getConversations", getConversations);


//Cập nhật status theo chatId
router.post("/updateStatus/:chatId", setStatusMessage);
router.post("/newConversation", createConversation);
router.post("/deleted/:conversationId", deleteConversation);

module.exports = router;
