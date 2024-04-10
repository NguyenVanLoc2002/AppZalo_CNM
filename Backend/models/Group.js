const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupProfile: { 
    groupName: { type: String, required: true },
    groupAvatar: { type: String, default: "zalo.svg" },
    groupDescription: { type: String, default: "" },
  },
  // member: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  createAt: { type: Date, default: Date.now() },
  createBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // new field
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" }, // new field
});

const Group = mongoose.model("groups", groupSchema);

module.exports = Group;
