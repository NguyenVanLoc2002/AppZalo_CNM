const express = require("express");
const router = express.Router();
const {
  getHistoryMessage,
  sendMessage,
} = require("../controllers/chat.controller");
const {
  multerUploadImage,
  multerUploadVideo,
} = require("../middlewares/multerMiddleware");
const { formatBodyData } = require("../middlewares/bodyDataFormat");

// Lấy danh sách tin nhắn cá nhân với một người dùng cụ thể với userId là người nhận
router.get("/:userId", getHistoryMessage);

// Gửi tin nhắn mới cho một người dùng cụ thể bao gồm text và image
router.post(
  "/:userId/sendMessage",
  multerUploadImage.array("data"),
  formatBodyData,
  (req, res, next) => {
    console.log("Uploaded files:", req.files);
    next(); // Chuyển tiếp yêu cầu sang middleware tiếp theo (sendMessage)
  },
  sendMessage
);

// Gửi video mới cho một người dùng cụ thể
router.post(
  "/:userId/sendVideo",
  (req, res, next) => {
    console.log("Uploaded files 1:", req.files);
    next(); // Chuyển tiếp yêu cầu sang middleware tiếp theo (sendMessage)
  },
  multerUploadVideo.array("data"),(req, res, next) => {
    console.log("Uploaded files 2:", req.files);
    next(); // Chuyển tiếp yêu cầu sang middleware tiếp theo (sendMessage)
  },
  formatBodyData,
  (req, res, next) => {
    console.log("Uploaded files:", req.files);
    next(); // Chuyển tiếp yêu cầu sang middleware tiếp theo (sendMessage)
  },
  sendMessage
);

//Xử lý lỗi từ Multer
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});
module.exports = router;
