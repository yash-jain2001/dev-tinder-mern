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
const compression = require("compression");
const { FRONTEND_URL, PORT, NODE_ENV } = require("./config/config.js");
const paymentRouter = require("./routes/payment.js");
require("./utils/cronJob.js");
const http = require('http');
const initializeSocket = require("./utils/socket.js");



app.use(compression());
app.use(
  cors({
    origin: (origin, callback) => {
      // Normalize origin by removing trailing slash for comparison
      const normalizedOrigin = origin ? origin.replace(/\/$/, "") : null;
      const normalizedFrontendUrl = FRONTEND_URL ? FRONTEND_URL.replace(/\/$/, "") : null;

      const allowedOrigins = [
        normalizedFrontendUrl,
        "http://localhost:5173",
        "http://localhost:3000",
      ];
      
      if (!origin || allowedOrigins.includes(normalizedOrigin) || (origin && origin.includes("vercel.app"))) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);
app.use("/",paymentRouter);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

const server = http.createServer(app);
initializeSocket(server);

connectDB() 
  .then(() => {
    console.log("Database connected");
    const port = PORT || 3000;
    server.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("db not connected", err);
  });

module.exports = app;
