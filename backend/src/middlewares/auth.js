const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../config/config");


const userAuth = async(req, res, next) => {
  try {
    const cookies = req.cookies;
    let token = cookies.token;
    
    // Fallback to Authorization header if cookie is not present (for cross-domain issues)
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
      return res.status(401).send("Please login")
    }
    const decodedObj = jwt.verify(token, JWT_SECRET);

    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if(!user){
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
}
    

module.exports = { userAuth };