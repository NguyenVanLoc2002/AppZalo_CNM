const jwt = require("jsonwebtoken");

exports.generateAccessToken = (device_id, user_id, phone) => {
  return jwt.sign({ device_id, user_id, phone }, process.env.JWT_SECRET, {
    expiresIn: "600s",
  });
};
exports.generateRefreshToken = (device_id, user_id, phone) => {
  return jwt.sign({ device_id, user_id, phone }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};