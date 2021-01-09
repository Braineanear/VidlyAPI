import catchAsync from '../utils/catchAsync.js';
import Movie from '../models/movieModel.js';
import { getOne, createOne, updateOne, deleteOne } from './handlerFactory.js';

// @desc    Get All Movie's Data
// @route   GET /api/v1/movies
// @access  Private ==> Current User
export const getAllMovies = catchAsync(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Specific Movie's Data
// @route   GET /api/v1/movies/:id
// @access  Private ==> Current User
export const getMovie = getOne(Movie);

// @desc    Create New Movie
// @route   POST /api/v1/movies
// @access  Private ==> Current User
export const createMovie = createOne(Movie);

// @desc    Updating Movie's Data
// @route   PATCH /api/v1/movies/:id
// @access  Private ==> Current User
export const updateMovie = updateOne(Movie);

// @desc    Deleting Movie's data
// @route   DELETE /api/v1/movies/:id
// @access  Private ==> Current User
export const deleteMovie = deleteOne(Movie);
