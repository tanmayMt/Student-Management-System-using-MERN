const express = require("express");
const { getAllStudents,addStudent } = require("../controller/studentController");

const router = express.Router();

router.get("/allStudents",getAllStudents);
router.post('/add-student', addStudent);

module.exports = router;