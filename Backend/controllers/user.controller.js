const cloudinary = require("../configs/Cloudinary.config");
const User = require("../models/User");

exports.getUserById = async (req, res) => {
  const uid = req.params.uid;
  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const returnUser = {
      profile: user.profile,
      email: user.email,
      phone: user.phone,
    };
    return res.status(200).json({ user: returnUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can't not get this user" });
  }
};

exports.getUserByPhone = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.params.phone });
    const { password, _id, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can't not get this user" });
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
      public_id: req.file.filename,
      url: req.file.path,
    };
    await user.save();
    return res.status(200).json({
      message: "Avatar uploaded successfully",
      avatar: user.profile.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ name: error.name, message: "Can't upload avatar" });
  }
};

exports.uploadBackground = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.profile.background) {
      await cloudinary.uploader.destroy(user.profile.background.public_id);
    }
    // const
    user.profile.background = {
      public_id: req.file.filename,
      url: req.file.path,
    };
    await user.save();
    return res.status(200).json({
      message: "Background uploaded successfully",
      background: user.profile.background,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ name: error.name, message: "Can't upload background" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {userId, name, email, gender, dob } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.profile.name = name;
    user.email = email;
    user.profile.gender = gender;
    user.profile.dob = new Date(dob);
    await user.save();
    const { password, _id, friends, groups,create_at,status, ...userWithoutPassword } =
      user.toObject();
    return res.status(200).json({
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can't update this user" });
  }
};
