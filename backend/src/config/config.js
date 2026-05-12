require("dotenv").config();

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
  NODE_ENV: process.env.NODE_ENV,
  GMAIL_USER: process.env.GMAIL_USER,
  GMAIL_PASS: process.env.GMAIL_PASS,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,
};

module.exports = config;
