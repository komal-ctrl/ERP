const express = require("express");
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedIn");
const { profile } = require("../controllers/userController");
router.get("/", function (req, res) {
  res.render("index");
});
router.get("/profile", isLoggedin, profile);

module.exports = router;
