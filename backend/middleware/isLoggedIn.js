const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "You need to Register first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
