const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  member: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  createAt: { type: Date, default: Date.now() },
});

const Group = mongoose.model("groups", groupSchema);

module.exports = Group;
