require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log("server is running");
});
