const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: 4,
    select: false
  },
}, {
  timestamps: true
});

const User = model("User", UserSchema);
module.exports = User;
