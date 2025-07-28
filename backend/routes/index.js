const express = require("express");
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");
router.get("/", function (req, res) {
  res.render("index");
});
router.get("/shop", isLoggedin, function (req, res) {
  res.render("shop");
});

module.exports = router;
