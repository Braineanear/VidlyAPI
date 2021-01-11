import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import User from '../models/userModel.js';
import { getOne, createOne, updateOne, deleteOne } from './handlerFactory.js';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// @desc    Get All Users
// @route   GET /api/v1/users
// @access  Private ==> Admin
export const getAllUsers = catchAsync(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Single User
// @route   GET /api/v1/users/:id
// @access  Private ==> Admin
export const getUser = getOne(User);

// @desc    Create Single User
// @route   POST /api/v1/users
// @access  Private ==> Admin
export const createUser = createOne(User);

// @desc    Update Single User
// @route   PATCH /api/v1/users/:id
// @access  Private ==> Admin
export const updateUser = updateOne(User);

// @desc    Delete Single User
// @route   DELETE /api/v1/users/:id
// @access  Private ==> Admin
export const deleteUser = deleteOne(User);

// @desc    Get Current User Data
// @route   GET /api/v1/users/personal
// @access  Private ==> Current User
export const getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

// @desc    Update User Details (Name / Email)
// @route   PATCH /api/v1/users/personal
// @access  Private ==> Current User
export const updateMe = catchAsync(async (req, res, next) => {
  // Check if the user trying to update his password
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'You Can not Update Your Password Here. Please Visit /updateMyPassword to Update Your Password!',
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    updatedUser
  });
});

// @desc    Delete current logged in user data
// @route   DELETE /api/v1/users/personal
// @access  Private ==> Current User
export const deleteMe = catchAsync(async (req, res, next) => {
  await User.deleteOne({ _id: req.user.id });

  res.status(200).json({
    status: 'success',
    data: {}
  });
});
