  // update 200 error update 400 
 // 201 auth signup create user 
  // deleteMe 204
  //500 createUser
  //  501 
  // next with error 
  // npm run start prodcution some erorr in toke verify

  import crypto from 'crypto';
  import { sign } from 'jsonwebtoken';
  import { create, fondOne } from './../models/userModel';
  import Email from './../utils/email';
import User from './UserModel';
  const jwt = require("jsonwebtoken");
  const { promisify } = require("util");
  const AppError = require("../utils/appError"); // Custom AppError class
  const catchAsync = require("../utils/catchAsync"); // Async error handling wrapper
    
  
  
  const signToken = (id)=>{
   jwt.sign({id }, process.env.JWT_SECRET,
      {expiresIn:process.env.JWT_EXPIRIES})
  }
   //  jwt.sign({},"sting" , {})

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await create(
    req.body
    // bad all can be admin
    // {
    // name: req.body.name,
    // email: req.body.email,
    // password: req.body.password,
    // rePassword: req.body.passwordConfirm, // Ensure this matches the schema field
  // }
); 

 const token = signToken(newUser._id)
     
  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      user: {   newUser , // or 
        // id: newUser._id,
        // name: newUser.name,
        // email: newUser.email,
      },
    },
  });
});

export const login = catchAsync(async(req,res,next)=>{
  const {email , password} = req.body ; 
  //1 check if email and pass exist 
 if (!email || !password) {
   return next( new AppError(" no Email like this bad req " , 400)) 
  // he use next new appError
 }   
  //2 check if user exist and password is right 
    const user = await fondOne({email}).select("+password"); //email:email

    //3 compare password   user.pass and pass 
    // const correct = 
    if(!user||!await user.correctPassword(password,user.password))
      {
      return next(new AppError("Incorrect email or password",401))
    }  if(!correct){
      return next(new AppError("Incorrect email or password",401))
    }
    
    
    //3  if all okay send token 
 const token = signToken(user._id) //wrong newUser._id
  res.status(200).json({
    status:"success",
    token })
 })
 
 // after export.login make it's route 
 //  router.post("/login" , login)




exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 1. Check if the token exists in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // Extract token
  }

  // 2. If no token is found, throw an error
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 3. Verify the token (check validity and expiration)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // promisify to convert callback to promise
    // and help to use async await aync await in jwt.verify
  // 4. Check if the user still exists (e.g., query the database)
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401)
    );
  }

  // 5. Check if the user changed the 
  // password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }
  
  next();
});

 









  if (error.name === "JsonWebTokenError") {
    return new AppError("Invalid token. Please log in again!", 401);
    //  you can pass erro in fun and make it above 
  } else if (error.name === "TokenExpiredError") {
    return new AppError("Your token has expired! Please log in again.", 401);
  } 