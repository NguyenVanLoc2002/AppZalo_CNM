const express = require("express");
const router = express.Router();
const {
  getHistoryMessage,
  sendMessage,
  deleteChat,
  getFirstMessage,
} = require("../controllers/chat.controller");
const {
  multerUploadImage,
  multerUploadVideo,
} = require("../middlewares/multerMiddleware");
const { formatBodyData } = require("../middlewares/bodyDataFormat");

// Lấy danh sách tin nhắn cá nhân với một người dùng cụ thể với userId là người nhận
router.get("/:userId", getHistoryMessage);

// Lấy danh sách tin nhắn cá nhân với một người dùng cụ thể với userId là người nhận
router.get("/:userId/getFirstMessage", getFirstMessage);


// Gửi tin nhắn mới cho một người dùng cụ thể bao gồm text và image
router.post(
  "/:userId/sendMessage",
  multerUploadImage.array("data"),
  formatBodyData,
  sendMessage
);

// Gửi video mới cho một người dùng cụ thể
router.post(
  "/:userId/sendVideo",
  multerUploadVideo.array("data"),
  formatBodyData,
  sendMessage
);

// Xóa tin nhắn cụ thể
router.post("/:chatId/delete", deleteChat);

//Xử lý lỗi từ Multer
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = router;
