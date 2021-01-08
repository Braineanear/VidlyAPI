const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const APIFeatures = require('../utils/apiFeatures');
const User = require('../models/userModel');

const router = express.Router();

//===========================Public Routes===================================//
//ANY ONE CAN ACCESS THESE ROUTES
// Registeration Route
router.post('/signup', authController.signup);

// Login Route
router.post('/signin', authController.signin);

// Forgot Password Route
router.post('/forgotPassword', authController.forgotPassword);

// Reseting Password Route
router.patch('/resetPassword/:token', authController.resetPassword);

//====================User's Routes / Private Routes=========================//
// Protect all routes after this middleware
// ONLY LOGGED IN USERS CAN ACCESS THESE ROUTES
router.use(authController.protect);

// Personal Main Router
router
  .route('/personal')
  .get(userController.getMe, userController.getUser)
  .patch(userController.updateMe)
  .delete(userController.deleteMe);

// Routes belong to the avatar for the Personal Route
router
  .route('/personal/avatar')
  .patch(userController.uploadAvatar, userController.resizeImages)
  .delete(userController.deleteAvatar);

// Email Confirmation Route
router.get('/confirmEmail', authController.confirmEmail);

// Logout Route
router.get('/logout', authController.logout);

// Get Avatar that belong to the user ID (ANY LOGGED IN USER CAN SEE USERS AVATARS)
router.get('/:id/avatar', userController.getUserAvatar);

// Updating The Password Route (Only Passwords / Logged in users only can access it)
router.patch('/updatePassword', authController.updatePassword);

//==================Admin's Routes / Private Routes===========================//
// ONLY ADMIN CAN ACCESS THESE ROUTES
router.use(authController.restrictTo('admin'));

// Main routs that admin can access to get all users data/ create new user / get specific user's data / update specific user's data / or even delete an exsiting user
router
  .route('/')
  .get(APIFeatures(User), userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
