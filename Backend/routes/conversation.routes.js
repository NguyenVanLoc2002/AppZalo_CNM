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



router.post("/newConversation", createConversation);
router.post("/deleted/:conversationId", deleteConversation);

module.exports = router;
