const cloudinary = require("../configs/Cloudinary.config.js");
const Chat = require("../models/Chat.js");

//Gửi tin nhắn mới cho một người dùng cụ thể.
exports.sendMessage = async (req, resp) => {
  console.log(req.user);
  try {
    const senderId = req.user.user_id; // Lấy userId của người gửi từ thông tin đăng nhập (đã được đặt trong middleware auth)
    const receiverId = req.params.userId;
    const { contents } = req.body;
    console.log(contents);
    console.log(senderId);
    console.log(receiverId);

    if (!contents || contents.length === 0) {
      return resp.status(400).json({ message: "Content is required" });
    }

    // Kiểm tra từng phần tử trong mảng contents
    for (const content of contents) {
      if (!content.data.trim()) {
        return resp.status(400).json({ message: "Content is required" });
      }
    }

    // Tạo và lưu tin nhắn mới vào cơ sở dữ liệu
    const message = new Chat({ senderId, receiverId, contents });
    await message.save();
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
    const userId = req.params.userId;
    const messagesByReceiver = await Chat.find({ receiverId: userId }).sort({
      timestamp: 1,
    });
    resp.status(200).json({ success: true, data: messagesByReceiver });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ success: false, massage: "Internal server error" });
  }
};
