const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose'); // Import Mongoose for MongoDB
const studentRouter = require('./router/studentRouter.js');
const connectDB = require("./config/db");

//dotenv configuartion
dotenv.config();
const app = express();


// MongoDB connection
connectDB();

app.get("/",(req,res)=>{
    res.send("<h1>Welcome To Student Management Server</h1>")
});
app.use("/student",studentRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is Running at http://localhost:${PORT}`)
});
