require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

//DB
const connectDB = require("./db");

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  connectDB();
  console.log(`Server has been started on port ${port}`);
});
