import catchAsync from '../utils/catchAsync.js';
import Rental from '../models/rentalModel.js';
import { createOne, updateOne, deleteOne } from './handlerFactory.js';
import AppError from '../utils/appError.js';

// @desc    Get All Rental's Data
// @route   GET /api/v1/rentals
// @access  Private ==> Current User
export const getAllRentals = catchAsync(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Specific Rental's Data
// @route   GET /api/v1/rentals/:id
// @access  Private ==> Current User
export const getRental = catchAsync(async (req, res, next) => {
  let query = Rental.findById(req.params.id);
  query = query.populate([
    {
      path: 'movie',
      select: 'title genre year numberInStock dailyRentalRate -_id',
      populate: {
        path: 'genre',
        model: 'Genre',
        select: 'name -_id'
      }
    },
    { path: 'customer', select: 'name -_id' }
  ]);

  const doc = await query;

  if (!doc) {
    return next(new AppError('No Result Found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    doc
  });
});

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
