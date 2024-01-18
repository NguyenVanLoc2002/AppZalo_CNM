//login user and create token and send it back
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Media = require("../models/media");
const saltRounds = 10;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

exports.registerUser = async (req, res) => {
  const { name, password, phone } = req.body;
  try {
    const user = await User.create({
      name,
      phone,
      password: await hashPassword(password),
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid phone or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

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
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// send otp to phone number using nexmo

exports.sendOTP = async (req, res) => {};

// update user avatar

exports.updateUserAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.avatar = req.file.id;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Tạo một middleware để xử lý yêu cầu upload avatar
exports.uploadAvatar = async (req, res) => {
  // Kiểm tra định dạng hình ảnh
  const file = await req.file;
  console.log(req.file);
  try {
    if (file?.type !== "image/jpeg" && file?.type !== "image/png") {
      return res.status(400).send("Định dạng hình ảnh không hợp lệ");
    }

    // Lưu trữ hình ảnh vào cơ sở dữ liệu
    const media = new Media({
      fileName: file.name,
      contentType: file.type,
      data: file.buffer,
    });

    media.save();

    // Cập nhật avatar của người dùng
    const user = await User.findOne(req.body.phone);

    user.avatar = media._id;

    user.save();

    // Trả về kết quả
    return res.status(200).send({
      avatar: media._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
