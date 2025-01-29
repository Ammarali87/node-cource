import { Request, Response, NextFunction } from 'express';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './model/UserModel';
import  { SignOptions } from 'jsonwebtoken';
import catchAsync from './utils/catchAsync';
import AppError from './utils/appError';  // For handling errors
 // faild sign Up400 login 401 token 403

 // Generate JWT token
const signToken = (id: string, secret: string, expiresIn:any): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign({ id }, secret, options);
};  

// Create and send tokens (access + refresh)
const createSendToken = (user: any, statusCode: number, res: Response) => {
  const accessToken =
    signToken(user._id.toString(), process.env.JWT_SECRET!, '1h');
  const refreshToken = signToken(user._id.toString(), process.env.JWT_REFRESH_SECRET!, '7d');

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(statusCode).json({
    status: 'success',
    accessToken,
    user: { id: user._id, name: user.name, email: user.email },
  });
};

// Signup 
export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const hashedPassword =
   await bcrypt.hash(password, 12);
  // extra check 
  if (!name|| !email ||!password){
    return next(new AppError('Please provide name, email and password', 400));
  }  
   const newUser = 
    await User.create(
      { name, email, password: hashedPassword });
    createSendToken(newUser, 201, res);
    if (!newUser) { // ithink it's was !nam,!email
      return next(new AppError('User not created', 400));       
    }
  } 
);

// Login
export const login =
 catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });
       
  const user = await User.findOne({ email })
  .select('+password');
  if (!user || !(await
     bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  } 

  createSendToken(user, 200, res);
});

// Refresh Token
export const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.jwt;
  if (!refreshToken) return res.status(403).json({ message: 'Not authorized' });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!, async (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });

    const user = await User.findById(decoded.id);
    if (!user) return res.status(403).json({ message: 'User not found' });

    const accessToken = signToken(user._id.toString(), process.env.JWT_SECRET!, '1h');
    res.json({ accessToken });
  });
});

// Logout
export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', 'loggedout', {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000), // Expiry after 10 seconds
  });
  res.status(200).json({ status: 'success' });
};

// Handle errors (for cases like token verification issues or other unhandled errors)
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: 'Internal server error' });
};











//   const signToken = (id)=>{
//    jwt.sign({id }, process.env.JWT_SECRET,
//       {expiresIn:process.env.JWT_EXPIRIES})
//   }
//    //  jwt.sign({},"sting" , {})

// export const signup = catchAsync(async (req, res, next) => {
//   const newUser = await create(
//     req.body
//     // bad all can be admin
//     // {
//     // name: req.body.name,
//     // email: req.body.email,
//     // password: req.body.password,
//     // rePassword: req.body.passwordConfirm, // Ensure this matches the schema field
//   // }
// ); 

//  const token = signToken(newUser._id)
     
//   res.status(201).json({
//     status: "success",
//     message: "User created successfully",
//     data: {
//       user: {   newUser , // or 
//         // id: newUser._id,
//         // name: newUser.name,
//         // email: newUser.email,
//       },
//     },
//   });
// });

// export const login = catchAsync(async(req,res,next)=>{
//   const {email , password} = req.body ; 
//   //1 check if email and pass exist 
//  if (!email || !password) {
//    return next( new AppError(" no Email like this bad req " , 400)) 
//   // he use next new appError
//  }   
//   //2 check if user exist and password is right 
//     const user = await fondOne({email}).select("+password"); //email:email

//     //3 compare password   user.pass and pass 
//     // const correct = 
//     if(!user||!await user.correctPassword(password,user.password))
//       {
//       return next(new AppError("Incorrect email or password",401))
//     }  if(!correct){
//       return next(new AppError("Incorrect email or password",401))
//     }
    
    
//     //3  if all okay send token 
//  const token = signToken(user._id) //wrong newUser._id
//   res.status(200).json({
//     status:"success",
//     token })
//  })
 
//  // after export.login make it's route 
//  //  router.post("/login" , login)




// exports.protect = catchAsync(async (req, res, next) => {
//   let token;

//   // 1. Check if the token exists in the Authorization header
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1]; // Extract token
//   }

//   // 2. If no token is found, throw an error
//   if (!token) {
//     return next(
//       new AppError("You are not logged in! Please log in to get access.", 401)
//     );
//   }

//   // 3. Verify the token (check validity and expiration)
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//     // promisify to convert callback to promise
//     // and help to use async await aync await in jwt.verify
//   // 4. Check if the user still exists (e.g., query the database)
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError("The user belonging to this token no longer exists.", 401)
//     );
//   }

//   // 5. Check if the user changed the 
//   // password after the token was issued
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError("User recently changed password! Please log in again.", 401)
//     );
//   }

//    // Grant accect to protected route
//    req.user = currentUser;

//    // in post man make changedPasswordAt 22-4-2025 post 

//   next();
// });










//   if (error.name === "JsonWebTokenError") {
//     return new AppError("Invalid token. Please log in again!", 401);
//     //  you can pass erro in fun and make it above 
//   } else if (error.name === "TokenExpiredError") {
//     return new AppError("Your token has expired! Please log in again.", 401);
//   } 