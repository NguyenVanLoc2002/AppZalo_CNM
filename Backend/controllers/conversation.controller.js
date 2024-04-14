const Chats = require("../models/Chat");
const Conversation = require("../models/Conversation");
const { deleteChat } = require("./chat.controller");
const jwt = require("jsonwebtoken");
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

    const deleteConversation = await Conversation.findByIdAndDelete(
      conversationId
    );
    if (!deleteConversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.status(200).json({ message: "Conversation deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res
      .status(500)
      .json({ message: "Failed to delete conversation", error: error.message });
  }
};

// exports.deleteMessInConver = async (req, res) => {
//   try {
//     const conversationId = req.params.conversationId;
//     const chatIdToDelete = req.params.chatId;

//     await deleteChat(req, res);

//     // Nếu deleteChat gặp lỗi và gửi phản hồi lỗi, không cần thiết phải tiếp tục thực hiện lệnh tiếp theo
//     if (res.headersSent) {
//       return;
//     }

//     // Xóa chatIdToDelete cũng như cập nhật trường "messages" của tài liệu "Conversation"
//     const deleteChatInMessOfConver = await Conversation.findByIdAndUpdate(
//       conversationId,
//       { $pull: { messages: chatIdToDelete } }
//     );

//     console.log("deleteChatInMessOfConver: ", deleteChatInMessOfConver);

//     if (!deleteChatInMessOfConver) {
//       return res.status(404).json({ message: "Conversation not found" });
//     }

//     // Trả về phản hồi thành công
//     res.status(200).json({ message: "Conversation deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting conversation:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to delete conversation", error: error.message });
//   }
// };

exports.getConversation = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const conversation = await Conversation.findById(conversationId).populate(
      "participants"
    );
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.status(200).json(conversation);
  } catch (error) {
    console.error("Error getting conversation:", error);
    res
      .status(500)
      .json({ message: "Failed to get conversation", error: error.message });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const conversations = await Conversation.find({
      participants: userId,
      tag: { $ne: "group" },
    }).populate([
      {
        path: "participants",
        select: "phone email profile _id",
      },
      {
        path: "lastMessage",
        select: "senderId receiverId contents timestamp read",
      },
    ]);
    if (!conversations) {
      return res.status(404).json({ message: "Conversations not found" });
    }
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error getting conversations:", error);
    res
      .status(500)
      .json({ message: "Failed to get conversations", error: error.message });
  }
};

// get conversation by participants every time a new message is sent
exports.getConversationByParticipants = async (req, res) => {
  try {
   console.log( req.body)
    let participants = req.body.participants;
    console.log(participants)
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    participants = [...participants, user.user_id];
    if (!participants) {
      return res.status(400).json({ message: "Participants are required" });
    }


    const conversation = await Conversation.findOne({
      participants: { $all: participants },
    }).populate([
      {
        path: "participants",
        select: "phone email profile _id",
      },
      {
        path: "lastMessage",
        select: "senderId receiverId contents timestamp read",
      },
      {
        path: "messages",
        populate: {
          path: "replyMessageId",
          model: "chats",
        },
      },
    ]);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    return res.status(200).json(conversation);
  } catch (error) {
    console.error("Error getting conversation by participants:", error);
    return null;
  }
};

exports.getMessageByConversationId = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const conversation = await Conversation.findById(conversationId).populate({
      path: "messages",
      populate: {
        path: "replyMessageId",
        model: "chats",
      },
    });
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res
      .status(500)
      .json({ message: "Failed to get messages", error: error.message });
  }
};

exports.deleteOnMySelf = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    const chatIdToDelete = req.params.chatId;

    const userIdCurrent = req.user.user_id; // người dùng hiện đang đăng nhập

    const chat = await Chats.findById(chatIdToDelete);
    if (!chat) {
      return res.status(404).json({ error: "Not Found" });
    }

    if (chat.senderId.equals(userIdCurrent)) {
      if (chat.status === 0 || chat.status === null) {
        chat.status = 1;
        await chat.save();
        res.status(200).json({ message: "Update status success" });
      } else {
        try {
          await Chats.findByIdAndDelete(chatIdToDelete);
          const deleteChatInMessOfConver = await Conversation.findByIdAndUpdate(
            conversationId,
            { $pull: { messages: chatIdToDelete } }
          );
          if (!deleteChatInMessOfConver) {
            return res.status(404).json({ message: "Conversation not found" });
          } else {
            return res.status(200).json({ message: "Delete mess success" });
          }

          res.status(200).json({ message: "Update status success" });
        } catch (error) {
          console.log("Error delete: ", error);
        }
      }
    } else {
      if (chat.status === 0 || chat.status === null) {
        console.log("Đang đổi status");
        chat.status = 2;
        await chat.save();
        res.status(200).json({ message: "Update status success" });
      } else {
        console.log("Đang xóa");
        try {
          await Chats.findByIdAndDelete(chatIdToDelete);
          const deleteChatInMessOfConver = await Conversation.findByIdAndUpdate(
            conversationId,
            { $pull: { messages: chatIdToDelete } }
          );
          if (!deleteChatInMessOfConver) {
            return res.status(404).json({ message: "Conversation not found" });
          } else {
            return res.status(200).json({ message: "Delete mess success" });
          }
          res.status(200).json({ message: "Update status success" });
        } catch (error) {
          console.log("Error delete: ", error);
        }
      }
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request: " });
  }
};
