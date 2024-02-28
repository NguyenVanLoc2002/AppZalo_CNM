const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
//create user schema

const userSchema = new Schema({
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profile: {
    name: { type: String, required: true },
    email: { type: String, optional: true },
    dob: { type: Date, optional: true },
    gender: { type: String, optional: true },
    avatar: { type: mongoose.Types.ObjectId, optional: true },
    cover: { type: mongoose.Types.ObjectId, optional: true },
  },
  status: { type: String, optional: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, optional: true },
  lastActive: { type: Date },
  friendList: { type: [mongoose.Types.ObjectId], required: false },
  groupList: { type: [mongoose.Types.ObjectId], required: false },
  posts: { type: [mongoose.Types.ObjectId], required: false },
  moments: { type: [mongoose.Types.ObjectId], required: false },
});

//match password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


//create user model
const User = mongoose.model("User", userSchema);

module.exports = User;
