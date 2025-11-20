const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const adminOnly = require("../middlewares/adminOnly");


router.get("/dashboard", auth, adminOnly, (req, res) => {
  res.json({
    message: "Welcome to the Admin Dashboard",
    admin: req.user
  });
});


const User = require("../models/user");

router.get("/all-users", auth, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json({
    message: "User list fetched successfully",
    users
  });
});

module.exports = router;
