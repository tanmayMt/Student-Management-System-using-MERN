const express = require("express");
const { getAllStudents } = require("../controller/studentController");

const router = express.Router();

router.get("/allStudents",getAllStudents);

module.exports = router;