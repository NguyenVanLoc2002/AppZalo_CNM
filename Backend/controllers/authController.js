const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Session = require("../models/Session");

const generateAccessToken = (device_id, user_id, phone) => {
  return jwt.sign({ device_id, user_id, phone }, process.env.JWT_SECRET, {
    expiresIn: "180s",
  });
};
const generateRefreshToken = (device_id, user_id, phone) => {
  return jwt.sign({ device_id, user_id, phone }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const createOrUpdateSession = async (
  user_id,
  device_id,
  app_type,
  refreshToken
) => {
  let existsSession = await Session.findOne({
    user_id,
    app_type,
    is_logged_in: true,
  });
  if (existsSession) {
    existsSession.is_logged_in = false;
    existsSession.save();
  }
  let session = await Session.findOneAndUpdate(
    { user_id, device_id, app_type },
    { user_id, device_id, app_type, refreshToken, is_logged_in: true },
    { upsert: true, new: true }
  );
  return session;
};

exports.loginUser = async (req, res) => {
  const { phone, password, device_id } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (user && (await user.matchPassword(password))) {
      const token = generateAccessToken(device_id, user._id, phone);
      const refreshToken = generateRefreshToken(device_id, user._id, phone);
      const user_agent = req.headers["user-agent"];
      const app_type = user_agent ? "web" : "mobile";
      await createOrUpdateSession(user._id, device_id, app_type, refreshToken);
      const { password, _id, ...userWithoutPassword } = user.toObject();

      if (app_type === "web") {
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({
          user: userWithoutPassword,
          accessToken: token,
        });
      } else {
        res.status(200).json({
          user: userWithoutPassword,
          accessToken: token,
          refreshToken,
        });
      }
    } else {
      res.status(401).json({ message: "Invalid phone or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logoutUser = async (req, res) => {
  const reToken = req.cookies.refreshToken;
  if (!reToken) return res.status(403).json("You're not authenticated !");
  const storeRefreshToken = await Session.findOne({ refreshToken: reToken });
  if (storeRefreshToken) {
    jwt.verify(reToken, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("Refresh Token is not valid !");
      storeRefreshToken.is_logged_in = false;
      storeRefreshToken.refreshToken = "";
      storeRefreshToken.save();
      res.clearCookie("refreshToken");
      res.status(200).json("Logout successfully");
    });
  }
  return res.status(403).json("You're not authenticated !");
};

exports.registerUser = async (req, res) => {
  const { name, password, phone } = req.body;
  if (await User.findOne({ phone })) {
    return res.status(409).json({ message: "Phone number already exists" });
  }

  const hashPassword = async (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  try {
    const user = await User.create({
      phone,
      password: await hashPassword(password),
      profile: { name },
      createdAt: Date.now(),
    });
    return res.status(201).json({
      user: {
        phone: user.phone,
        profile: user.profile,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  const reToken = req.cookies.refreshToken;
  if (!reToken) return res.status(403).json("You're not authenticated !");
  const storeRefreshToken = await Session.findOne({ refreshToken: reToken });
  if (!storeRefreshToken)
    return res.status(403).json("Refresh Token is not valid !");
  const user_agent = req.headers["user-agent"];
  const app_type = user_agent ? "web" : "mobile";
  jwt.verify(reToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Refresh Token is not valid 2!");
    const newAccessToken = generateAccessToken(
      user.device_id,
      user.user_id,
      user.phone
    );
    const newRefreshToken = generateRefreshToken(
      user.device_id,
      user.user_id,
      user.phone
    );

    storeRefreshToken.refreshToken = newRefreshToken;
    storeRefreshToken.save();

    if (app_type === "web") {
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({
        newAccessToken,
      });
    } else {
      return res.status(200).json({
        newAccessToken,
        newRefreshToken,
      });
    }
  });
};
