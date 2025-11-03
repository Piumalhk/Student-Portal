// Add admin user script for the new Admin model
// Run this script with: node add-admin-user.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

// MongoDB connection string - encoded for safety
const DB_USERNAME = "admin";
const DB_PASSWORD = encodeURIComponent("ht5KKTmZp1Px8O40");
const DB_CLUSTER = "cluster0.zhboudq.mongodb.net";
const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}/`;

async function addAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Admin user details
    const adminUsername = "admin";
    const adminEmail = "admin@studentportal.com";
    const adminPassword = "admin123"; // Standard admin password

    console.log("Using admin credentials:");
    console.log("- Username:", adminUsername);
    console.log("- Password:", adminPassword);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username: adminUsername }, { email: adminEmail }],
    });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Admin details:", {
        id: existingAdmin._id,
        username: existingAdmin.username,
        email: existingAdmin.email,
        role: existingAdmin.role,
        lastLogin: existingAdmin.lastLogin,
      });

      // Update password option
      console.log("Updating admin password...");
      existingAdmin.password = await bcrypt.hash(adminPassword, 12);
      await existingAdmin.save();
      console.log("Admin password updated successfully!");
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      console.log("Password hashed successfully");

      // Create new admin user
      const adminUser = new Admin({
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword,
        lastLogin: new Date(),
      });

      // Save admin user to database
      await adminUser.save();
      console.log("Admin user created successfully");
      console.log("Admin details (except password):", {
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
        permissions: adminUser.permissions,
      });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

// Run the function
addAdminUser();
