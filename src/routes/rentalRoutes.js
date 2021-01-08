const express = require('express');
const rentalController = require('../controllers/rentalController');
const authController = require('../controllers/authController');
const APIFeatures = require('../utils/apiFeatures');
const Rental = require('../models/rentalModel');

const router = express.Router();

//===========================Public Routes===================================//
//ANY ONE CAN ACCESS THESE ROUTES

//Get All Rentals Route
router.get('/', APIFeatures(Rental), rentalController.getAllRentals);

//====================User's Routes / Private Routes=========================//
// Protect all routes after this middleware
// ONLY LOGGED IN USERS CAN ACCESS THESE ROUTES
router.use(authController.protect);

router
  .route('/')
  .get(APIFeatures(Rental), rentalController.getAllRentals)
  .post(rentalController.createRental);

router
  .route('/:id')
  .get(rentalController.getRental)
  .patch(rentalController.updateRental)
  .delete(rentalController.deleteRental);

module.exports = router;
