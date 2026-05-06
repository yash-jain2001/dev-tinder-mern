const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }

  if (firstName.length < 3 || firstName.length > 30) {
    throw new Error("Invalid first name");
  }
  if (lastName.length < 3 || lastName.length > 30) {
    throw new Error("Invalid last name");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "skills",
    "about",
    "profilePicture",
  ];
  return Object.keys(req.body).every((field) => allowedEditFields.includes(field));
};

const validatePasswordChangeData = (req)=>{
  const {oldPassword, newPassword, confirmPassword} = req.body;
  if(!oldPassword || !newPassword || !confirmPassword){
    throw new Error("All fields are required");
  }
  if(!validator.isStrongPassword(newPassword)){
    throw new Error("Enter a strong password");
  }
  if(newPassword !== confirmPassword){
    throw new Error("Passwords do not match");
  }
}

module.exports = { validateSignUpData, validateEditProfileData, validatePasswordChangeData };
