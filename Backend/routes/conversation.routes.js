const express = require("express");
const {
  createConversation,
  deleteConversation,
  getConversation,
  getConversations,
  getConversationByParticipants,
  getMessageByConversationId,
  deleteMessInConver,
  deleteOnMySelf,
} = require("../controllers/conversation.controller");
const router = express.Router();

router.get("/get/:conversationId", getConversation);
router.get("/getConversations", getConversations);
router.post("/getByParticipants", getConversationByParticipants);
router.get("/get/messages/:conversationId", getMessageByConversationId);


router.post("/newConversation", createConversation);
router.post("/deleted/:conversationId", deleteConversation);
// router.post("/deletedMess/:conversationId/:chatId", deleteMessInConver);
router.post("/deleteOnMySelf/:conversationId/:chatId", deleteOnMySelf);

module.exports = router;
