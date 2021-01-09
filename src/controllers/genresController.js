import catchAsync from '../utils/catchAsync.js';
import Genre from '../models/genreModel.js';
import { getOne, createOne, updateOne, deleteOne } from './handlerFactory.js';

// @desc    Get All Genres Data
// @route   GET /api/v1/genres
// @access  Private ==> Current User
export const getAllGenres = catchAsync(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Specific Genre's Data
// @route   GET /api/v1/genres/:id
// @access  Private ==> Current User
export const getGenre = getOne(Genre);

// @desc    Create New Genre
// @route   POST /api/v1/genres
// @access  Private ==> Current User
export const createGenre = createOne(Genre);

// @desc    Updating Genre's Data
// @route   PATCH /api/v1/genres/:id
// @access  Private ==> Current User
export const updateGenre = updateOne(Genre);

// @desc    Deleting Genre's Data
// @route   DELETE /api/v1/genres/:id
// @access  Private ==> Current User
export const deleteGenre = deleteOne(Genre);
