const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  member: [
    {
      type: mongoose.Schema.Types.ObjectId,
      unique: false,
      index: false,
      required: true,
      ref: "users",
    },
  ],
  avatar: {
    url: { type: String },
    public_id: { type: String },
  },
  createAt: { type: Date, default: Date.now() },
});

const Group = mongoose.model("groups", groupSchema);

module.exports = Group;
