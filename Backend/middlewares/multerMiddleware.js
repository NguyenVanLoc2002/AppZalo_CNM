const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../configs/Cloudinary.config");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Zalo_Fake_App",
    allowedFormats: async (req, file) => ["mp4", "mkv", "png", "jpg", "jpeg"],
    public_id: (req, file) =>
      req.body.userId + "-" + file.fieldname + "-" + Date.now(),
  },
});

const multerUpload = multer({ storage });

module.exports = multerUpload;
