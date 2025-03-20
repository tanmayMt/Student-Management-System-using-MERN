const express = require("express");
const { getAllStudents,addStudent,deleteStudent,getStudentProfile,updateStudent} = require("../controller/studentController");

const router = express.Router();

router.get("/all-students",getAllStudents);
router.post("/add-student", addStudent);
router.delete("/delete/:id", deleteStudent);
router.get("/student-profile/:id",getStudentProfile); //student-profile/${student.id}`}
router.put("/edit-student/:id",updateStudent);

module.exports = router;