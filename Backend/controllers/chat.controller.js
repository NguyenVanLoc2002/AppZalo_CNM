const cloudinary = require("../configs/Cloudinary.config.js");
const Chat = require("../models/Chat.js");

//Upload media to cloudinary
const uploadMediaToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
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
    // console.log(req.files);
    const senderId = req.user.user_id; // Lấy userId của người gửi từ thông tin đăng nhập (đã được đặt trong middleware auth)
    const receiverId = req.params.userId;
    let contents = [];
    console.log(contents);

    // Kiểm tra xem req.body có tồn tại không và có chứa nội dung không
    if (req.body) {
      // Nếu có nội dung, thêm vào mảng contents
        contents.push({
          type: "text",
          data: req.body.data,
      });
    }
    

    //Upload media to Cloudinary if any
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
    console.log(contents);
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
