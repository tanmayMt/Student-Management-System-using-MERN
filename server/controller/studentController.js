const Student = require("../model/Student");
const sendEmail = require("../config/sendEmail");  //email confirmation
const auth = require("../middleware/authMiddleware");

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

    // Prepare email content
    const message = `
<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
  <div style="max-width: 600px; background-color: #ffffff; margin: 20px auto; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="background-color: #4CAF50; color: white; padding: 15px; text-align: center;">
      <h2 style="margin: 0;">🎉 Student Registration Successful!</h2>
    </div>
    <div style="padding: 20px; text-align: center;">
      <img 
          src="https://img.freepik.com/free-vector/registration-online-concept-illustration_114360-7893.jpg" 
           alt="Welcome Student" 
           width="200" 
           style="margin-bottom: 20px;">
      <p style="font-size: 18px; color: #333;">Hi <b>${firstName} ${lastName}</b>,</p>
      <p style="font-size: 16px; color: #555;">You have been successfully registered in the <b>${department}</b> department.</p>
      <p style="font-size: 14px; color: #777;">Your email: <b>${email}</b></p>
      <div style="margin-top: 20px;">
        <a href="http://student-management-system-using-mern.vercel.app/student/student-profile/${newStudent._id}" 
           style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
           📚 View Your Profile
        </a>
      </div>
    </div>
    <div style="background-color: #f4f4f4; color: #777; padding: 10px; text-align: center;">
      <p style="margin: 0;">&copy; 2024 Student Management System | All Rights Reserved</p>
    </div>
  </div>
</div>

    `;

    // Send email confirmation
    await sendEmail({
      email: savedStudent.email,
      subject: "Student Registration Successful! Confirmation email sent.",
      message,
    });

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
        res.status(200).json({
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
      return res.status(404).json({ success: false, message: "Student is not found" });
    }
    res.json({
      succes:true,
      message:"Student Information is Updated successfully",
      data: {updateStudent}
    });
  } catch (error) {
    console.error("Error updating student details:", error.message);
    res.status(500).json({ message: "Server error. Unable to update student details." });
  }
};