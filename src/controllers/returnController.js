import moment from 'moment';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Rental from '../models/rentalModel.js';
import Movie from '../models/movieModel.js';

// @desc    Returning a rental and saving it to the database.
// @route   api/v1/returns
// @access  Private ==> Current User
const returns = catchAsync(async (req, res, next) => {
  // Getting The User's Rental Data From The Database
  const rental = await Rental.findOne({
    customer: req.body.customerID,
    movie: req.body.movieID
  });

  // Check if The Rental Existing
  if (!rental) {
    return next(new AppError('Not Found', 400));
  }

  // Check if The Rental isn't Already Returned
  if (rental.dateReturned) {
    return next(new AppError('Already Returned', 400));
  }
  // Getting The dailyRentalRate From Movie Collection
  const movieDailyRentalRate = (await Movie.findById(req.body.movieID))
    .dailyRentalRate;
  const rentalDateReturned = new Date();
  const RentalFee =
    moment().diff(rental.dateOut, 'days') * movieDailyRentalRate;
  // Updating The Rental Document by settin the dataReturned and rentalFee Fields
  await Rental.updateOne(
    { _id: rental._id },
    { dateReturned: rentalDateReturned, rentalFee: RentalFee }
  );

  // Updating The Movie Document by increasing The numberInStock Field
  await Movie.updateOne(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 }
    }
  );

  // Respond Success
  res.status(400).json({
    status: 'success',
    rental
  });
});

export default returns;
