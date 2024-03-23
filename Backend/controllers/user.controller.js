const cloudinary = require("../configs/Cloudinary.config");
const User = require("../models/User");

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

    const { password, _id, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.sendOTP = async (req, res) => {};

exports.uploadAvatar = async (req, res) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.profile.avatar) {
      await cloudinary.uploader.destroy(user.profile.avatar.public_id);
    }
    // const 
    user.profile.avatar = {
      public_id: req.file.public_id,
      url: req.file.url,
    };
    await user.save();
    return res.status(200).json({
      message: "Avatar uploaded successfully",
      avatar: user.profile.avatar,
    });
  } catch (error) {
    res.status(400).json({ name: error.name, message: error.message });
  }
};


