const express = require("express");
const dotenv = require("dotenv");


//dotenv configuartion
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is Running at http://localhost:${PORT}`)
});
