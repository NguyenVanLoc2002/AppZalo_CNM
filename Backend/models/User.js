const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
// //create user schema
// const userSchema_test = new Schema({
//   name: String,
//   email: String,
//   password: String,
//   phone: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   status: String,
//   createdAt: Date,
//   updatedAt: Date,
// });

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   phone: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   avatar: { type: mongoose.Types.ObjectId, optional: true },
//   status: { type: String, optional: true },
//   lastActive: { type: Date },
//   friendList: { type: [mongoose.Types.ObjectId], required: false },
//   groupList: { type: [mongoose.Types.ObjectId], required: false },
// });

const userSchema = new Schema({
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true }, 
  profile:{
    avatar: { type: mongoose.Types.ObjectId, default: null },
    name: { type: String, required: true },
    gender:{ type: String, enum: ['male', 'female', 'other'] },
    dob:{type: Date}
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'groups' }],
  status: { type: String, default: "active" }, // Trạng thái hoạt động mặc định là "active"
  lastActive: { type: Date }
});

//match password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

  //create user model
  const User = mongoose.model("users", userSchema);

module.exports = User;
