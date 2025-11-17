const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginApi = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }


    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "SECRET123",
      { expiresIn: "7d" }
    );

    res.send({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = loginApi;
