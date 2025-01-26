import mongoose from "mongoose";
import validator from "validator";
   // 401 Unauthorized 
  // next() use to move to next middleware 
  // or with error
  // or with Async func complete

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
  passwordChangeAt : Date
  },
  photo: {
    type: String,
    default: "default.jpg", // Default profile picture
  },
});


// he middleware runs before the save operation is executed

userSchema.pre("save", async function(next){ 
  // if password is not modified hash password
  if(!this.isModified("password")) return next();  
  this.password = await bcrypt.hash(this.password,12)

//  reset confirmPassword cause it useless
this.rePassword = undefined ;
next(); } )


userSchema.methods.correctPassword = 
async function(candidatePassword,userPassword){
  return await bcrypt.compare(candidatePassword,userPassword)
}


userSchema.methods.changePassword = function(JwtTimeStamp){
  if(this.passwordChangeAt){
    // for test log JWT , stamp
    const changeTime = 
parseInt(this.passwordChangeAt.getTime()/1000,10)  // 10 is base 
  }  
} 


const User = mongoose.model("User", userSchema);
export default User;
