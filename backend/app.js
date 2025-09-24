//db password=ht5KKTmZp1Px8O40

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth-routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// API Routes
app.use("/api/auth", authRoutes);

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
