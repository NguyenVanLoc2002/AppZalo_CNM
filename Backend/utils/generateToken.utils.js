const jwt = require("jsonwebtoken");

exports.generateAccessToken = (device_id, user_id, phone) => {
  return jwt.sign(
    { device_id, user_id, phone, type: "access" },
    process.env.JWT_SECRET,
    {
      expiresIn: "60s",
    }
  );
};
exports.generateRefreshToken = (device_id, user_id, phone) => {
  return jwt.sign(
    { device_id, user_id, phone, type: "refresh" },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
