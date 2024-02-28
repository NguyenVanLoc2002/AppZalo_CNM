//login user and create token and send it back
const mongoose = require("mongoose");

const User = require("../models/User");
const Media = require("../models/media");

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserByPhone = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.params.phone });

    // return user withthout password using Object destructuring
    const { password, _id, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// send otp to phone number using nexmo

exports.sendOTP = async (req, res) => {};

// update user avatar

// Tạo một middleware để xử lý yêu cầu upload avatar
exports.uploadAvatar = async (req, res) => {
  // Kiểm tra định dạng hình ảnh
  const file = await req.file;
  console.log(req.file);
  try {
    // Lưu trữ thông tin tệp tin trong MongoDB
    const newMedia = new Media({
      _id: new mongoose.Types.ObjectId(),
      fileName: file.originalname,
      contentType: file.mimetype,
      data: file.buffer,
    });

    const savedMedia = await newMedia.save();

    res.json({
      message: "File uploaded successfully",
      mediaId: savedMedia._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
