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