//Database Connection 
const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();
const mongoURI = process.env.MONGO_URI;

const connectDB = async()=>{
    try {
        await mongoose.connect(mongoURI
        //   ,{
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        // }
      );
        console.log('MongoDB connected successfully'); // Log success message if connected
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;