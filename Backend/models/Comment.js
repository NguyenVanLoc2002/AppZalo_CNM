const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentId: { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "posts", required: true }, // Tham chiếu đến bài đăng tương ứng
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true }, // Tham chiếu đến người dùng tạo bình luận
  contents: [
    {
      type: {
        type: String,
        enum: ["text", "image", "video", "link", "file", "audio"],
        required: true,
      }, // Loại nội dung
      data: { type: String }, // Dữ liệu nội dung (văn bản, đường dẫn hình ảnh, đường dẫn video,..)
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;
