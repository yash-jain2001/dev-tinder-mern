require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

connectDB() 
  .then(() => {
    console.log("Database connected");
    if (process.env.NODE_ENV !== "production") {
      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });
    }
  })
  .catch((err) => {
    console.log("db not connected", err);
  });

module.exports = app;
