const cloudinary = require("../configs/Cloudinary.config.js");
const Chat = require("../models/Chat.js");
const { io, getReciverSocketId } = require("../socket/socket.io.js");

//Upload media to cloudinary
const uploadMediaToCloudinary = async (file) => {
  try {
    let result;
    if (file.mimetype.startsWith("image/")) {
      result = await cloudinary.uploader.upload(file.path);
    } else if (file.mimetype.startsWith("video/")) {
      result = await cloudinary.uploader.upload(file.path, {
        resource_type: "video",
      });
    }
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error("Failled to upload media to Cloudinary");
  }
};

//Gửi tin nhắn mới cho một người dùng cụ thể.
exports.sendMessage = async (req, resp) => {
  try {
    console.log("req.files: ", req.files);
    console.log("req.body: ", req.body);
    const senderId = req.user.user_id; // Lấy userId của người gửi từ thông tin đăng nhập (đã được đặt trong middleware auth)
    console.log("senderId: ", senderId);
    const receiverId = req.params.userId;
    let contents = [];
    console.log(contents);

    // Kiểm tra xem req.body có tồn tại không và có chứa nội dung không
    if (Object.keys(req.body).length) {
      // Nếu có nội dung, thêm vào mảng contents
      contents.push({
        type: "text",
        data: req.body.data,
      });
    }

    //Upload media to Cloudinary if any
    if (req.files) {
      for (const file of req.files) {
        if (
          file.mimetype.startsWith("image/") ||
          file.mimetype.startsWith("video/")
        ) {
          const media = await uploadMediaToCloudinary(file);
          contents.push({
            type: file.mimetype.startsWith("image/") ? "image" : "video",
            data: media.url,
          });
        } else {
          const media = uploadMediaToCloudinary(file);
          contents.push({
            type: file.mimetype,
            data: media.url,
          });
        }
      }
    }
    console.log(contents);

    if (!contents || !contents.length) {
      throw new Error("Contents are empty or contain no fields");
    }

    // Tạo và lưu tin nhắn mới vào cơ sở dữ liệu
    const message = new Chat({ senderId, receiverId, contents });
    await message.save();

    //Gọi socket và xử lý
    try {
      const receiverSocketId = await getReciverSocketId(receiverId);
      io.to(receiverSocketId.socket_id).emit("new_message", {
        senderId,
        contents,
        read: false,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // Trả về phản hồi thành công
    resp
      .status(201)
      .json({ message: "Message sent successfully", data: message });
  } catch (error) {
    // Xử lý lỗi
    resp
      .status(500)
      .json({ message: "Failed to send message", error: error.message });
  }
};

//Lấy danh sách tin nhắn cá nhân với một người dùng cụ thể
exports.getHistoryMessage = async (req, resp) => {
  try {
    const userId = req.params.userId; //người nhận lấy từ param
    const currentUserId = req.user.user_id; // người dùng hiện đang đăng nhập

    const lastTimestamp = req.query.lastTimestamp; // Lấy tham số lastTimestamp từ query string

    let queryCondition = {
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId },
      ],
    };

    const totalMessageHistory = await Chat.countDocuments(queryCondition);
    let messagesHistory;
    //Lấy 20% tin nhắn khi vượt quá 100 tin nhắn
    if (totalMessageHistory >= 100) {
      if (lastTimestamp) {
        queryCondition.timestamp = { $lt: new Date(parseInt(lastTimestamp)) };
      }
      messagesHistory = await Chat.find(queryCondition)
        .sort({
          timestamp: -1,
        })
        .limit(Math.ceil(totalMessageHistory * 0.2));
    } else {
      //Lấy toàn bộ tin nhắn
      messagesHistory = await Chat.find(queryCondition).sort({
        timestamp: -1,
      });
    }

    resp.status(200).json({ success: true, data: messagesHistory });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ success: false, massage: "Internal server error" });
  }
};
