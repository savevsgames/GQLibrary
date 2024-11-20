import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googlebooks";

console.log("DB Connecting with MONGODB_URI: ", MONGODB_URI);

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database");
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to database: ", error);
    throw new Error("Error connecting to database");
  }
};

export default db;
