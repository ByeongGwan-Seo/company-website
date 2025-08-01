require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");
const postRoutes = require("./routes/post");
const uploadRoutes = require("./routes/upload");
const isProd = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  cors({
    origin: isProd
      ? "https://company-website-taupe-seven.vercel.app"
      : "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/post", postRoutes);
app.use("/api/upload", uploadRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("🟢 MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🟢 server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("🔴 MongoDB connection error:", err);
  });
