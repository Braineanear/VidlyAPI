const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const APIFeatures = require('../utils/apiFeatures');
const User = require('../models/userModel');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Protect all routes after this middleware
router.use(authController.protect);

router
  .route('/personal')
  .get(userController.getMe, userController.getUser)
  .patch(userController.updateMe)
  .delete(userController.deleteMe);

router
  .route('/personal/avatar')
  .patch(userController.uploadAvatar, userController.resizeImages)
  .delete(userController.deleteAvatar);

router.get('/confirmEmail', authController.confirmEmail);
router.get('/logout', authController.logout);
router.get('/:id/avatar', userController.getUserAvatar);
router.patch('/updatePassword', authController.updatePassword);

router.use(authController.restrictTo('admin'));

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
