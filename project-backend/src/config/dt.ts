const mongoose = require("mongoose");
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const base = process.env.MONGO_URI;
    console.log("ggggggggg",base);
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb+srv://siyansimon246:simon246@cluster0.kjgi5mb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
