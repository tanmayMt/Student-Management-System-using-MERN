const express = require("express");
const { getAllStudents,addStudent,deleteStudent,getStudentProfile,updateStudent} = require("../controller/studentController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/all-students",auth, getAllStudents);
router.post("/add-student",auth, addStudent);
router.delete("/delete/:id",auth, deleteStudent);
router.get("/student-profile/:id",auth, getStudentProfile); //student-profile/${student.id}`}
router.put("/edit-student/:id",auth, updateStudent);

module.exports = router;