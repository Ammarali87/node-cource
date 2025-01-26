import { Router } from 'express';
import { getMe, getUser, uploadUserPhoto, resizeUserPhoto, updateMe, deleteMe, getAllUsers, createUser, updateUser, deleteUser } from './../controllers/userController';
import { signup, login, logout, forgotPassword, resetPassword, protect, updatePassword, restrictTo } from './../controllers/authController';


const router = Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
// router.get(protect, getAllUsers)
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);  // me take two me and user
router.patch(   // take 3 upload photo resize updateme 
  '/updateMe',
  uploadUserPhoto,
  resizeUserPhoto,
  updateMe
);
router.delete('/deleteMe', deleteMe);
 
router.use(restrictTo('admin'));
 // intial Route router.route("/").get(getAllUsers).post(createUser)
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);
    // router.route("/:id")
    //.get(getUser).path(updateUser).delete(deletUsUser)
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

  export default router;