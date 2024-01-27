const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId },
  fileName: { type: String, required: true },
  contentType: { type: String, required: true },
  data: { type: Buffer},
});

const Media = mongoose.model("media", mediaSchema);
module.exports = Media;