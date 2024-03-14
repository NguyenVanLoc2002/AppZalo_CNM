const mongoose = require('mongoose');


const ConversationSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    createdAt: { type: Date, default: Date.now },
    tag: { type: String, optional: true },
  });
  
  const Conversation = mongoose.model('Conversation', ConversationSchema);

  module.exports = Conversation;
  