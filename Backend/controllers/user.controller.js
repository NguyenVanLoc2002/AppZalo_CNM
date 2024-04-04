const cloudinary = require("../configs/Cloudinary.config");
const User = require("../models/User");
const { getUserIdFromToken } = require("../utils/generateToken.utils");
const { io, getReciverSocketId } = require("../socket/socket.io");

exports.getUserByPhoneOrId = async (req, res) => {
  const uid = req.params.uid;
  const phone = req.params.phone;
  try {
    let user;
    if (!uid) {
      user = await User.findOne({ phone: phone });
    } else {
      user = await User.findById(uid);
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const returnUser = {
      userId: user._id,
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

exports.checkUserByEmail = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Can't found User with this email  !" });
    }
    return res.status(200).json({ message: "User found" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Some error internal server, please try again !" });
  }
};

exports.uploadAvatar = async (req, res) => {
  console.log("em");
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    if (user.profile.avatar && user.profile.avatar.public_id) {
      await cloudinary.uploader.destroy(user.profile.avatar.public_id);
    }
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
    const token = req.headers.authorization.split(" ")[1];
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    if (user.profile.background && user.profile.background.public_id) {
      await cloudinary.uploader.destroy(user.profile.background.public_id);
    }
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
    const { name, email, gender, dob } = req.body;
    console.log("dob", dob);
    const token = req.headers.authorization.split(" ")[1];
    const userId = getUserIdFromToken(token);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) user.profile.name = name;
    if (gender) user.profile.gender = gender;
    let dateOfBirth;
    if (dob) {
      dateOfBirth = typeof dob === "string" ? new Date(dob) : dob;
      user.profile.dob = dateOfBirth;
    }
    if (email) {
      const checkEmail = await User.findOne({ email });
      if (checkEmail && checkEmail._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    await user.save();
    const {
      password,
      _id,
      friends,
      groups,
      create_at,
      status,
      ...userWithoutPassword
    } = user.toObject();
    return res.status(200).json({
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can't update this user" });
  }
};

exports.sendRequestAddFriend = async (req, res) => {
  try {
    const { phone } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const userId = getUserIdFromToken(token);
    const user = await User.findById(userId);
    const friend = await User.findOne(phone);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ message: "You are already friend" });
    }
    if (user.requestSent.includes(friend._id)) {
      return res.status(400).json({ message: "Request already sent" });
    }
    if (user.requestReceived.includes(friend._id)) {
      return res.status(400).json({ message: "Request already received" });
    }
    user.requestSent.push(friend._id);
    friend.requestReceived.push(userId);
    await user.save();
    await friend.save();

    const reciverSocketId = getReciverSocketId(friend._id);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("receive-request-add-friend", {
        sender: userId,
      });
    }
    return res.status(200).json({ message: "Request sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can't send request add friend" });
  }
};

exports.acceptRequestAddFriend = async (req, res) => {
  try {
    const { phone } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const userId = getUserIdFromToken(token);
    const user = await User.findById(userId);
    const friend = await User.findOne(phone);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ message: "You are already friend" });
    }
    if (!user.requestReceived.includes(friend._id)) {
      return res.status(400).json({ message: "Request not found" });
    }
    user.friends.push(friend._id);
    friend.friends.push(userId);
    user.requestReceived = user.requestReceived.filter(
      (id) => id.toString() !== friend._id
    );
    friend.requestSent = friend.requestSent.filter(
      (id) => id.toString() !== userId
    );
    await user.save();
    await friend.save();
    const reciverSocketId = getReciverSocketId(friend._id);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("accept-request-add-friend", {
        sender: userId,
      });
    }

    return res.status(200).json({ message: "Request accepted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can't accept request add friend" });
  }
};

exports.unfriend = async (req, res) => {
  try {
    const { phone } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const userId = getUserIdFromToken(token);
    const user = await User.findById(userId);
    const friend = await User.findOne(phone);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.friends.includes(friend._id)) {
      return res.status(400).json({ message: "You are not friend" });
    }
    user.friends = user.friends.filter((id) => id.toString() !== friend._id);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);
    await user.save();
    await friend.save();
    const reciverSocketId = getReciverSocketId(friend._id);
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("unfriend", {
        sender: userId,
      });
    }
    return res.status(200).json({ message: "Unfriend successfully" });
  } catch (error) {
    res.status(400).json({ message: "Can't unfriend" });
  }
};

exports.getFriends = async (req, res) => {
  console.log('hihi')
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const userId = getUserIdFromToken(token);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const friends = await User.find({ _id: { $in: user.friends } });
    const returnFriends = friends.map((friend) => {
      return (userWithoutPassword = {
        userId: friend._id,
        profile: friend.profile,
        email: friend.email,
        phone: friend.phone,
      });
    });
    return res.status(200).json({ friends: returnFriends });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Can't get friends" });
  }
};
