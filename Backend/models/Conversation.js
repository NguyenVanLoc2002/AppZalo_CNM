const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  participants: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    required: true,
    unique: false,
    index: false,
  },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "chats" }],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "chats" },
  createdAt: { type: Date, default: Date.now },
  tag: { type: String, default: "friend", optional: true },
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

ConversationSchema.pre("deleteOne", async function (next) {
  try {
    const Chat = mongoose.model("chats");
    const messagesToDelete = await Chat.find({ _id: { $in: this.messages } });
    for (const message of messagesToDelete) {
      await message.deleteOne();
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = Conversation;
