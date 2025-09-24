const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret key for JWT (in production, use environment variables)
const JWT_SECRET_KEY = "mySecretKey123456789";

// Signup controller
const signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validate inputs
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already registered",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user
    await newUser.save(); // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username, role: newUser.role },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Return success response
    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    console.error("Error stack:", error.stack);
    return res
      .status(500)
      .json({ message: "Server error during signup", error: error.message });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    } // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Return success response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

// Check if a user is authenticated
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Format the response to match login/signup responses
    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error while fetching user" });
  }
};

module.exports = {
  signup,
  login,
  getUser,
};
