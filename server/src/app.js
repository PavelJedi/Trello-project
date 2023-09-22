require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

//Middlewares
const authentication = require("./middlewares/authentication");
const cors = require("./middlewares/cors");

//DB
const connectDB = require("./db");

//Routers
const appRouter = require("./routes/AppRouter");
const authRouter = require("./routes/AuthRouter");

app.use(cors);
app.use(express.json());

app.use("/api", authentication, appRouter);
app.use("/auth", authRouter);
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  connectDB();
  console.log(`Server has been started on port ${port}`);
});
