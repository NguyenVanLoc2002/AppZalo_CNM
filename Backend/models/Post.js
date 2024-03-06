const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  contents: [
    {
      type: {
        type: String,
        enum: ["text", "image", "video", "link", "file", "audio"],
        required: true,
      }, // Loại nội dung
      media: { type: String }, // Dữ liệu nội dung (văn bản, đường dẫn hình ảnh, đường dẫn video,..)
    },
  ],
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
