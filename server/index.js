const express = require("express");
const dotenv = require("dotenv");
const studentRouter = require('./router/studentRouter.js');


//dotenv configuartion
dotenv.config();
const app = express();


app.get("/",(req,res)=>{
    res.send("<h1>Welcome To Student Management Server</h1>")
});
app.use("/student",studentRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is Running at http://localhost:${PORT}`)
});
