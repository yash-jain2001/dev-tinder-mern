const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfileData, validatePasswordChangeData } = require("../utils/validation.js");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.send("something went wrong " + err);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedinUser = req.user;
    // console.log(loggedinUser);

    Object.keys(req.body).forEach((key) => {
      loggedinUser[key] = req.body[key];
    });
    await loggedinUser.save();
    // console.log(loggedinUser);
    res.json({message: `${loggedinUser.firstName}, Your profile updated successfully`, data: loggedinUser});
  } catch (err) {
    res.send("something went wrong " + err);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    validatePasswordChangeData(req);
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    const isPasswordValid = await user.validatepassword(oldPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid current password");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;

    await user.save();

    res.json({
      message: `${user.firstName}, Your password updated successfully`,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
