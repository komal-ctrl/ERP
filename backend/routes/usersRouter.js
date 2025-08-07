const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../config/multer-config");

router.get("/", function (req, res) {
  res.send("hey");
});
router.post("/register", upload.single("image"), registerUser);
router.post("/logout", logout);
router.post("/login", isLoggedIn, loginUser);
module.exports = router;
