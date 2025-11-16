const mongoose = require("mongoose");
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
      res.send({ message: "User registered successfully", data: savedUser });
      console.log({ message: "User registered successfully", data: savedUser });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
    console.log({ error: err.message });
  }
};

module.exports = registerApi;
