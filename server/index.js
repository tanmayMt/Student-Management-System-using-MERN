const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose'); // Import Mongoose for MongoDB
const cors = require("cors");
const studentRoute = require('./routes/studentRoute');
const connectDB = require("./config/db");

//dotenv configuartion
dotenv.config();
const app = express();

// MongoDB connection
connectDB();

// ✅ CORS Configuration
const corsOptions = {
    //origin: "http://localhost:3000", // Allow frontend requests
    origin: "https://student-management-system-using-mern.vercel.app",    // https://student-management-system-using-mern.vercel.app
    methods: "GET,POST,PUT,DELETE",
    credentials: true // Allow cookies and authentication headers
};

app.use(cors(corsOptions));

// Middleware to Parse json data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this line



app.get("/",(req,res)=>{
    res.send("<h1>Welcome To Student Management Server</h1>")
});
app.use("/student",studentRoute);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is Running at http://localhost:${PORT}`)
});
