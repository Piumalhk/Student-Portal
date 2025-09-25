//db password=ht5KKTmZp1Px8O40

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth-routes");
const adminRoutes = require("./routes/admin-routes");
const adminAuthRoutes = require("./routes/admin-auth-routes");
const feedbackRoutes = require("./routes/feedback-routes");
const noticeRoutes = require("./routes/notice-routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin-auth", adminAuthRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/notices", noticeRoutes);

// Root route for API health check
app.get("/", (req, res) => {
  res.send("API is running");
});

mongoose
  .connect("mongodb+srv://admin:ht5KKTmZp1Px8O40@cluster0.zhboudq.mongodb.net/")
  .then(() => {
    console.log("DB Connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));
