const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

const adminRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existed = await Admin.findOne({ email });
    if (existed) {
      return res.status(400).send({ message: "Admin already exists" });
    }

    const admin = new Admin({ username, email, password });
    const saved = await admin.save();

    const token = jwt.sign(
      { id: saved._id, role: "admin" },
      process.env.JWT_SECRET || "SECRET123",
      { expiresIn: "7d" }
    );

    res.send({
      message: "Admin registered successfully",
      admin: {
        id: saved._id,
        username: saved.username,
        email: saved.email
      },
      token,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = adminRegister;
