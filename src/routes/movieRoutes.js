const express = require('express');
const movieController = require('../controllers/movieController');
const authController = require('../controllers/authController');
const APIFeatures = require('../utils/apiFeatures');
const Movie = require('../models/movieModel');

const router = express.Router();

//===========================Public Routes===================================//
//ANY ONE CAN ACCESS THESE ROUTES

// Get All Movies Route
router.get('/', APIFeatures(Movie), movieController.getAllMovies);

// Get Specific Movie's Data Route
router.get('/:id', movieController.getMovie);

//====================Admin's Routes / Private Routes=========================//
// Protect all routes after this middleware
// ONLY ADMIN CAN ACCESS THESE ROUTES
router.use(authController.protect, authController.restrictTo('admin'));

// Creating New Movie Route
router.post('/', movieController.createMovie);

//Main routes that admin can access to update an existing movie or deleting an existing movie
router
  .route('/:id')
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
