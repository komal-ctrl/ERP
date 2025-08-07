const userModel = require("../models/user");
const studentModel = require("../models/students");
const teacherModel = require("../models/teachers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    let {
      name,
      email,
      password,
      role,
      gender,
      dob,
      phone,
      department,
      enrollmentYear,
      address,
      course,
    } = req.body;
    let user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "You already have an account, please login." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hash,
      role,
      profile: {
        gender,
        dob,
        phone,
        address,
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      },
    });

    const token = generateToken(newUser);
    res.cookie("token", token, { httpOnly: true });
    if (role == "student") {
      await studentModel.create({
        userId: newUser._id,
        course,

        department,

        enrollmentYear,
      });
    }
    if (role == "teacher") {
      await teacherModel.create({
        userId: newUser._id,

        department,
      });
    }

    res.status(201).json({
      message: "Registration successful",

      role: newUser.role,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      message: "Login successful",
      role: user.role,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.logout = function (req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
