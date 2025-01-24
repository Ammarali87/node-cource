  // update 200 error update 400 
 // 201 auth signup create user 
  // deleteMe 204
  //500 createUser
  //  501 
  // next with error 

  import crypto from 'crypto';
import { promisify } from 'util';
import { sign } from 'jsonwebtoken';
import { create, fondOne } from './../models/userModel';
import catchAsync from './../utils/catchAsync';
import AppError from './../utils/appError';
import Email from './../utils/email';





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

const token = sign({id:newUser._id }, process.env.JWT_SECRET,
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

export const login = catchAsync(async(req,res,next)=>{
  const {email , password} = req.body ; 
  //1 check if email and pass exist 
 if (!email || !password) {
   return next( new AppError(" no Email like this bad req " , 400)) 
  // he use next new appError
 }   
  //2 check if user exist and password is right 
    const user = await fondOne({email}).select("+password"); //email:email
    console.log(user)
    //3  if all okay send token
 
  const token = '';
  res.status(200).json({
    status:"success",
    token })
 })
 
 // after export.login make it's route 
 //  router.post("/login" , login)