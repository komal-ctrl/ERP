const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    // unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    required: true,
  },

  profile: {
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    dob: Date,
    phone: String,
    image: {
      data: Buffer,
      contentType: String,
    },
    address: String,
  },
});

module.exports = mongoose.model("User", userSchema);
