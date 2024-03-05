const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
  interactionId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'posts', required: true },
  type: { type: String, required: true }, // Loại tương tác: like, comment, share
  createdAt: { type: Date, default: Date.now }
});

const Interaction = mongoose.model('interactions', interactionSchema);

module.exports = Interaction;
