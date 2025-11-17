const express = require("express");
const router = express.Router();

// USER CONTROLLERS
const registerApi = require("../controllers/registerApi");
const loginApi = require("../controllers/loginApi");

// ADMIN CONTROLLERS
const adminRegister = require("../controllers/adminRegister");
const adminLogin = require("../controllers/adminLogin");

// USER ROUTES
router.post("/register", registerApi);
router.post("/login", loginApi);

// ADMIN ROUTES
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);

module.exports = router;
