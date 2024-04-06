const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, unique: true, ref: "users" },
  ],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "chats" }],
  createdAt: { type: Date, default: Date.now },
  tag: { type: String,default: "friend", optional: true },
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
