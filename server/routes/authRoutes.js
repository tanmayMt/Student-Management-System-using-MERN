const express = require("express");
const {login,register} = require("../controller/authController");
// import { login } from "../controller/authController";

const router = express.Router();

// Route to login as an Admin
router.post("/login", login);
router.post("/register", register);

module.exports = router;