const Chats = require("../models/Chat");
const Conversation = require("../models/Conversation");

exports.createConversation = async (req, res) => {
  try {
    console.log("req.body: ", req.body);
    const userId = req.user.user_id;
    const { participants, messages } = req.body;
    const updateParticipants = [...participants, userId];
    const conversation = new Conversation({
      participants: updateParticipants,
      messages: messages ? messages : [],
    });
    const savedConversation = await conversation.save();
    // Return the ID of the newly created conversation
    res.status(201).json({ conversationId: savedConversation._id });
  } catch (error) {
    console.error("Error creating conversation:", error);
    res
      .status(500)
      .json({ message: "Failed to create conversation", error: error.message });
  }
};

exports.deleteConversation = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    
    //Xóa theo _id
    const deleteConversation = await Conversation.findByIdAndDelete(
      conversationId
    );

    if (!deleteConversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // await Chats.deleteMany({ _id: { $in: deleteConversation.messages } });
    
    // Trả về phản hồi thành công
    res.status(200).json({ message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res
      .status(500)
      .json({ message: "Failed to delete conversation", error: error.message });
  }
};
