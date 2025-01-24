  // update 200 error update 400 
 // 201 auth signup create user 
  // deleteMe 204
  //500 createUser
  //  501 
  // next with error 

  const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');





exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(
    req.body
    // bad all can be admin
    // {
    // name: req.body.name,
    // email: req.body.email,
    // password: req.body.password,
    // rePassword: req.body.passwordConfirm, // Ensure this matches the schema field
  // }
); 

const token = jwt.sign({id:newUser._id }, process.env.JWT_SECRET,
  {expiresIn:process.env.JWT_EXPIRIES})
    //  jwt.sign({},"sting" , {})
    
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

 exports.login((req,res,next)=>{
  const {email , password} = req.body ; 
  //1 check if email and pass exist 
 if (!email || !password) {
  // i think he will use return  but 
  // he use next new appError
 return next( new AppError(" no Email like this bad req " , 400)) 
 }   
  //2 check if user exist and password is right 
    const user = User.fondOne({email}) //email:email
  //3  if all okay send token
  const token = '';
  res.status(200).json({status:"success",token})
 })  
 
 // after export.login make it's route 
 //  router.post("/login" , login)