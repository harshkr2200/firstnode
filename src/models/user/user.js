const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 5,
  },

  lastName: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    validation(value) {
      if (value > 18) {
        throw new Error("user age is blow then 18");
      }
    },
  },
  profileImage: {
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    type: String,
  },
  skills: {
    type: [String],
  },
  about: {
    type: String,
    default: "Please wrrite something here",
  },
});

const User = new mongoose.model("User", userSchema);
module.exports = {
  User,
};
