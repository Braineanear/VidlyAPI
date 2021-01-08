const catchAsync = require('../utils/catchAsync');
const Movie = require('../models/movieModel');
const factory = require('./handlerFactory');

// @desc    Get All Modvies Data
// @route   GET /api/v1/movies
// @access  Private ==> Current User
exports.getAllMovies = catchAsync(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Specific Movie's Data
// @route   GET /api/v1/movies/:id
// @access  Private ==> Current User
exports.getMovie = factory.getOne(Movie);

// @desc    Create New Movie
// @route   POST /api/v1/movies
// @access  Private ==> Current User
exports.createMovie = factory.createOne(Movie);

// @desc    Updating Movie's Data
// @route   PATCH /api/v1/movies/:id
// @access  Private ==> Current User
exports.updateMovie = factory.updateOne(Movie);

// @desc    Deleting Movie's data
// @route   DELETE /api/v1/movies/:id
// @access  Private ==> Current User
exports.deleteMovie = factory.deleteOne(Movie);
