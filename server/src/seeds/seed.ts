import { User } from "../models/index.js";
import { userSeedData } from "./seedData.js";
import cleanDB from "./cleanDB.js";
import db from "../config/connection.js";

const seedDatabase = async (): Promise<void> => {
  try {
    // Clean the database first
    await db();
    await cleanDB();

    // Create users with their saved books
    await User.create(userSeedData);
    // Process was successful
    console.log("Database seeded! 🌱");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
