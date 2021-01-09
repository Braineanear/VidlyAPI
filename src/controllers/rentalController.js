import catchAsync from '../utils/catchAsync.js';
import Rental from '../models/rentalModel.js';
import { getOne, createOne, updateOne, deleteOne } from './handlerFactory.js';

// @desc    Get All Rental's Data
// @route   GET /api/v1/rentals
// @access  Private ==> Current User
export const getAllRentals = catchAsync(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Specific Rental's Data
// @route   GET /api/v1/rentals/:id
// @access  Private ==> Current User
export const getRental = getOne(Rental);

// @desc    Create New Rental
// @route   POST /api/v1/rentals
// @access  Private ==> Current User
export const createRental = createOne(Rental);

// @desc    Updating Rental's Data
// @route   PATCH /api/v1/rentals/:id
// @access  Private ==> Current User
export const updateRental = updateOne(Rental);

// @desc    Deleting Rental's data
// @route   DELETE /api/v1/rentals/:id
// @access  Private ==> Current User
export const deleteRental = deleteOne(Rental);
