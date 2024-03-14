const express = require("express");
const router = express.Router();
const {
  getHistoryMessage,
  sendMessage,
} = require("../controllers/chat.controller");
const multerUpload= require("../middlewares/multerMiddleware");
const {formatBodyData} = require('../middlewares/bodyDataFormat');

// Lấy danh sách tin nhắn cá nhân với một người dùng cụ thể với userId là người nhận 
router.get("/:userId", getHistoryMessage);

// Gửi tin nhắn mới cho một người dùng cụ thể
router.post("/:userId/send",multerUpload.array('data'),async(req, res)=>{console.log(req.files);}, formatBodyData,sendMessage);
// ,async(req, res)=>{console.log(req.files); console.log(req.body);}

//Xử lý lỗi từ Multer
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong'});
});
module.exports= router;
