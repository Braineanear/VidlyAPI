import { Router } from 'express';
import {
  getMe,
  getUser,
  updateMe,
  deleteMe,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import {
  signup,
  signin,
  forgotPassword,
  resetPassword,
  protect,
  confirmEmail,
  logout,
  updatePassword,
  restrictTo
} from '../controllers/authController.js';
import {
  uploadAvatar,
  deleteAvatar,
  getUserAvatar
} from '../controllers/imageController.js';
import APIFeatures from '../utils/apiFeatures.js';
import User from '../models/userModel.js';
import multerUpload from '../utils/multerConfig.js';

const router = Router();

//===========================Public Routes===================================//
//ANY ONE CAN ACCESS THESE ROUTES
// Registration Route
router.post('/signup', signup);

// Login Route
router.post('/signin', signin);

// Forgot Password Route
router.post('/forgotPassword', forgotPassword);

// Resetting Password Route
router.patch('/resetPassword/:token', resetPassword);

//====================User's Routes / Private Routes=========================//
// Protect all routes after this middleware
// ONLY LOGGED IN USERS CAN ACCESS THESE ROUTES
router.use(protect);

// Personal Main Router
router.route('/personal').get(getMe, getUser).patch(updateMe).delete(deleteMe);

// Routes belong to the avatar for the Personal Route
router
  .route('/personal/avatar')
  .patch(multerUpload, uploadAvatar)
  .delete(deleteAvatar);

// Email Confirmation Route
router.get('/confirmEmail', confirmEmail);

// Logout Route
router.get('/logout', logout);

// Get Avatar that belong to the user ID (ANY LOGGED IN USER CAN SEE USERS AVATARS)
router.get('/:id/avatar', getUserAvatar);

// Updating The Password Route (Only Passwords / Logged in users only can access it)
router.patch('/updatePassword', updatePassword);

//==================Admin's Routes / Private Routes===========================//
// ONLY ADMIN CAN ACCESS THESE ROUTES
router.use(restrictTo('admin'));

// Main routs that admin can access to get all users data/ create new user / get specific user's data / update specific user's data / or even delete an existing user
router.route('/').get(APIFeatures(User), getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
