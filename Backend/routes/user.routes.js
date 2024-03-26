const express = require("express");

const router = express.Router();
const {
  uploadAvatar,
  uploadBackground,
  updateUser,
  getUserByPhoneOrId,
} = require("../controllers/user.controller");
const { protect, isRootUser } = require("../middlewares/authMiddleware");
const { multerUploadImage } = require("../middlewares/multerMiddleware");

//get methods
router.get("/get/phone/:phone", protect, getUserByPhoneOrId);
router.get("/get/uid/:uid", protect, getUserByPhoneOrId);

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
