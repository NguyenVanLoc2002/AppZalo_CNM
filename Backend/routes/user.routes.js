const express = require("express");

const router = express.Router();
const {
  getUserByPhone,
  sendOTP,
  uploadAvatar,
  uploadBackground,
  updateUser,
} = require("../controllers/user.controller");
const { protect, isRootUser } = require("../middlewares/authMiddleware");
const { multerUploadImage } = require("../middlewares/multerMiddleware");

//get methods
router.get("/get/:phone", protect, isRootUser, getUserByPhone);
router.get("/get/:uid", protect, getUserByPhone);

//post methods
router.post("/update-profile", protect, updateUser);

router.post(
  "/upload-avatar",
  protect,
  multerUploadImage.single("avatar"),
  uploadAvatar
);
router.post(
  "/upload-background",
  protect,
  multerUploadImage.single("background"),
  uploadBackground
);

module.exports = router;
