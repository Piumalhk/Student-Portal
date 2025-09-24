// Add admin user script
// Run this script with: node add-admin.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// MongoDB connection string - same as in app.js
const MONGODB_URI =
  "mongodb+srv://admin:ht5KKTmZp1Px8O40@cluster0.zhboudq.mongodb.net/";

async function addAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Admin user details
    const adminUsername = "admin";
    const adminEmail = "admin@example.com";
    const adminPassword = "admin123"; // Change this to a secure password in production

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      $or: [{ username: adminUsername }, { email: adminEmail }],
    });

    if (existingAdmin) {
      console.log("Admin user already exists!");

      // If admin exists but doesn't have admin role, update it
      if (existingAdmin.role !== "admin") {
        existingAdmin.role = "admin";
        await existingAdmin.save();
        console.log("Existing user updated with admin role");
      }
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      // Create new admin user
      const adminUser = new User({
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });

      // Save admin user to database
      await adminUser.save();
      console.log("Admin user created successfully");
    }

    // Disconnect from MongoDB
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

// Run the function
addAdminUser();
