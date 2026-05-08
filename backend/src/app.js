require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");
const cors = require("cors");
const { FRONTEND_URL, PORT, NODE_ENV } = require("./config/config.js");
const cron = require("./utils/cronJob.js");

app.use(
  cors({
    origin: FRONTEND_URL,
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
    const port = PORT || 3000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("db not connected", err);
  });

module.exports = app;
