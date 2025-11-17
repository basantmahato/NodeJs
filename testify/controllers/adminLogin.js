const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).send({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET || "SECRET123",
      { expiresIn: "7d" }
    );

    res.send({
      message: "Admin login successful",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      },
      token,
    });

  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = adminLogin;
