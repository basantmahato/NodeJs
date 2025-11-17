const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const registerApi = async (req, res) => {
  try {
    const userData = req.body;
    const existingUser = await User.findOne({ email: userData.email });
    console.log("User data received:", userData);

    if (existingUser) {
      res.send({ message: "User already exists", data: userData });
    } else {
      const user = new User(userData);
      const savedUser = await user.save();
      console.log({ message: "User registered successfully", data: savedUser });

      // JWT token
      const token = jwt.sign(
        { id: savedUser._id, email: savedUser.email },
        process.env.JWT_SECRET || "SECRET123",
        { expiresIn: "7d" }
      );

      res.send({ 
        message: "User registered successfully", 
        data: savedUser,
        token: token
      });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
    console.log({ error: err.message });
  }
};

module.exports = registerApi;
