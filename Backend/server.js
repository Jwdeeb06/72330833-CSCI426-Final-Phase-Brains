require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config");

const app = express();

const userRoutes = require("./api/user");
const categoryRoutes = require("./api/category");
const courseRoutes = require("./api/course");
const registrationRoutes = require("./api/registration");
const messageRoutes = require("./api/message");

const path = require("path");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/messages", messageRoutes);

app.use("/assets", express.static(path.join(__dirname, "assets")));
