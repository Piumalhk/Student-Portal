const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret key for JWT (in production, use environment variables)
const JWT_SECRET_KEY = "adminSecretKey123456789";

// Admin login controller
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Check if admin exists (case insensitive search for username)
    const admin = await Admin.findOne({
      username: { $regex: new RegExp(`^${username}$`, "i") },
    });

    if (!admin) {
      console.log(`No admin found with username: ${username}`);
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      console.log(`Password validation failed for admin: ${username}`);
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    // Update last login time
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        adminId: admin._id,
        username: admin.username,
        role: admin.role,
        permissions: admin.permissions,
      },
      JWT_SECRET_KEY,
      { expiresIn: "2h" } // Longer expiration for admins
    );

    // Return success response
    return res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Server error during admin login" });
  }
};

// Get admin profile
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        permissions: admin.permissions,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching admin profile" });
  }
};

module.exports = {
  adminLogin,
  getAdminProfile,
};
