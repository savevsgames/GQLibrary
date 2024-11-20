import cleanDB from "./cleanDB.js";
import db from "../config/connection.js";

const cleanDatabase = async (): Promise<void> => {
  try {
    // Clean the database first
    await db();
    await cleanDB();
  } catch (error) {
    console.error("Error cleaning database:", error);
    process.exit(1);
  }
};

cleanDatabase();
