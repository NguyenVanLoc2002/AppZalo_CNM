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
      }, 
      data: { type: String }, 
    },
  ],
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

chatSchema.post("save", async function (chat, next) {
  try {
    const Conversation = mongoose.model("Conversation");
    const conversation = await Conversation.findOne({
      participants: { $all: [chat.senderId, chat.receiverId] },
    });
    if (!conversation) {
      const newConversation = new Conversation({
        participants: [chat.senderId, chat.receiverId],
        messages: [chat._id],
      });
      await newConversation.save();
    } else {
      conversation.messages.push(chat._id);
      await conversation.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Chats = mongoose.model("chats", chatSchema);

module.exports = Chats;
