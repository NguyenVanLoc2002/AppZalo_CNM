const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  media: String,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'sent' },
  type: { type: String, default: 'text' },

});

const Message = mongoose.model('Message', MessageSchema);
