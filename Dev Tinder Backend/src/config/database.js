const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

const connectDB = async () => {
  await mongoose.connect(MONGO_URI);
};

module.exports = connectDB;
