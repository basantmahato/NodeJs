const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/dashboard", authMiddleware, (req, res) => {
  res.send({
    message: "Welcome to user dashboard",
    user: req.user
  });
});

module.exports = router;
