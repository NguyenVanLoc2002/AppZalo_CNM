const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  device_id: {
    type: String,
    required: true,
  },
  app_type: {
    type: String,
    enum: ["web", "mobile"],
    required: true,
  },
  is_logged_in: {
    type: Boolean,
    default: true,
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
