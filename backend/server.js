const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const protect = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ MongoDB Connected");
})
.catch((err) => {
    console.error("❌ MongoDB Error:");
    console.error(err);
});

app.get("/", (req, res) => {
    res.send("Task Manager API Running");
});
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});