const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../configs/Cloudinary.config");

const uploadImage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Zalo_Fake_App",
    allowedFormats: ["png", "jpg", "jpeg"],
    public_id: (req, file) => {
      return `image_${file.fieldname}_${Date.now()}`;
    },
  },
});

const uploadVideo = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Zalo_Fake_App",
    allowedFormats: ["mp4", "mkv"],
    resource_type: "video",
    public_id: (req, file) => {
      return `video_${file.fieldname}_${Date.now()}`;
    },
  },
});

const multerUploadImage = multer({ storage: uploadImage });
const multerUploadVideo = multer({ storage: uploadVideo });

module.exports = { multerUploadImage, multerUploadVideo };