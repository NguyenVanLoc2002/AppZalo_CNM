//login user and create token and send it back
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const User = require("../models/User");
const Media = require("../models/media");
const Session = require("../models/Session");

const saltRounds = 10;

// hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

const generateToken = (device_id, user_id) => {
  return jwt.sign({ device_id, user_id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const createOrUpdateSession = async (user_id, device_id, app_type, token) => {
  let session = await Session.findOne({ device_id, app_type });

  if (session) {
    session.is_logged_in = false;
    await session.save();
  }

  // Tạo hoặc cập nhật phiên (session) mới
  session = await Session.findOneAndUpdate(
    { user_id, device_id, app_type },
    { user_id, device_id, app_type, token, is_logged_in: true },
    { upsert: true, new: true }
  );

  return session;
};

exports.loginUser = async (req, res) => {
  const { phone, password, device_id, app_type } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(device_id, user._id);

      const session = await createOrUpdateSession(
        user._id,
        device_id,
        app_type,
        token
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res.status(200).json({
        user,
        token,
        session,
      });
    } else {
      res.status(401).json({ message: "Invalid phone or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.registerUser = async (req, res) => {
  const { name, password, phone } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  try {
    const user = await User.create({
      phone,
      password: await hashPassword(password),
      profile: { name },
      createdAt: Date.now(),
    });
    res.status(201).json({
      user,
      token: generateToken(user._id),
    });
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
