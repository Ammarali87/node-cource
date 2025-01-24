import mongoose from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures name is provided
  },
  email: {
    type: String,
    required: [true, "Please provide your email"], // Ensures email is provided
    unique: true, // Ensures no duplicate emails
    lowercase: true, // Converts email to lowercase
    validate: [validator.isEmail, "Invalid email address"], // Validates email format
  },
  password: {
    type: String, // Changed to String to handle hashed passwords
    required: true, // Ensures password is provided
    minlength: 6, // Minimum length for password
    select :false  // no output in postman 
  },
  rePassword: {
    type: String,
    required: true, // Ensures rePassword is provided
    validate: {  // take fun and message
      validator: function (value) {
        return value === this.password; // Ensures passwords match
      },
      message: "Passwords must match",
    },
  },
  photo: {
    type: String,
    default: "default.jpg", // Default profile picture
  },
});

const User = mongoose.model("User", userSchema);

export default User;
