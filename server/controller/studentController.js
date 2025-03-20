const Student = require("../model/Student");

// Get all students
exports.getAllStudents = async(req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            succes:true,
            data: students,
            message: "Data fetched successfully"
        })
    } catch (error) {
        console.log("Error fetching students:", error.message);
        res.status(500).json({message: "Server error. Unable to fetch students." })
    }
};

// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, department } = req.body;

    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists. Please use a different email.',
      });
    }

    // Create a new student instance
    const newStudent = new Student({
      firstName,
      lastName,
      email,
      department,
    });

    // Save student to database
    const savedStudent = await newStudent.save();

    res.status(201).json({
      success: true,
      data: savedStudent,
      message: 'Student added successfully!',
    });
  } catch (error) {
    console.error('Error adding student:', error.message);
    res.status(500).json({ message: 'Server error. Unable to add student.' });
  }
};

// Delete a Student
exports.deleteStudent = async (req, res) => {
    try {
        const delStudent = await Student.findByIdAndDelete(req.params.id);
        if (!delStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({
            message: "Student deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting delStudent:", error.message);
        res.status(500).json({ message: "Server error. Unable to delete Student." });
    }
};

// //Student Profile
exports.getStudentProfile = async (req, res) => {
	try {
		const studentId = req.params.id;

		// Find the student by ID
		const student = await Student.findById(studentId);

		// Check if student exists
		if (!student) {
			return res.status(404).json({
				success: false,
				message: "Student not found!",
			});
		}

		res.status(200).json({
			success: true,
			data: student,
			message: "Student profile fetched successfully!",
		});
	} catch (error) {
		console.error("Error fetching student profile:", error.message);
		res.status(500).json({
			success: false,
			message: "Server error. Unable to fetch student profile.",
		});
	}
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updateStudent){
      return res.status(404).json({ message: "Student is not found" });
    }
    res.json({
      succes:true,
      message:"Post is Updated successfully",
      data: {updateStudent}
    });
  } catch (error) {
    console.error("Error updating student details:", error.message);
    res.status(500).json({ message: "Server error. Unable to update student details." });
  }
};