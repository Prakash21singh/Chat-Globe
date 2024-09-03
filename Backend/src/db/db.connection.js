import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDb = async function () {
  return mongoose.connect(process.env.MONGO_URL);
};
