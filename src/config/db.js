import mongoose from "mongoose";
import { env } from "./env.js";

const { MONGO_URI } = env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;