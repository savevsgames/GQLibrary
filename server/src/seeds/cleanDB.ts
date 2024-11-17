import { User } from "../models/index.js";
import process from "process";

const cleanDB = async (): Promise<void> => {
  try {
    // Delete documents from User collection
    await User.deleteMany({});
    console.log("User collection cleaned.");
  } catch (error) {
    console.error("Error cleaning collections:", error);
    // Exit the process if an error occurs
    process.exit(1);
  }
};

export default cleanDB;
