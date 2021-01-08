const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Protect all routes after this middleware
router.use(authController.protect);

router.get('/confirmEmail', authController.confirmEmail);
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/logout', authController.logout);

module.exports = router;
