const express = require("express");
const { signup, login, getUser } = require("../controllers/auth-controller");
const verifyToken = require("../middleware/auth-middleware");

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.get("/user", verifyToken, getUser);

module.exports = router;
