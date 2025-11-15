const express = require("express");
const router = express.Router();


const registerApi = require("../controllers/registerApi");
const loginApi = require("../controllers/loginApi");

router.post("/register",registerApi);

router.post("/login",loginApi)

module.exports = router;
