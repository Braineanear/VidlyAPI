const catchAsync = require('../utils/catchAsync');
const Genre = require('../models/genreModel');
const factory = require('./handlerFactory');

// @desc    Get All Genres Data
// @route   GET /api/v1/genres
// @access  Private ==> Current User
exports.getAllGenres = catchAsync(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Specific Genre's Data
// @route   GET /api/v1/genres/:id
// @access  Private ==> Current User
exports.getGenre = factory.getOne(Genre);

// @desc    Create New Genre
// @route   POST /api/v1/genres
// @access  Private ==> Current User
exports.createGenre = factory.createOne(Genre);

// @desc    Updating Genre's Data
// @route   PATCH /api/v1/genres/:id
// @access  Private ==> Current User
exports.updateGenre = factory.updateOne(Genre);

// @desc    Deleting Genre's Data
// @route   DELETE /api/v1/genres/:id
// @access  Private ==> Current User
exports.deleteGenre = factory.deleteOne(Genre);
