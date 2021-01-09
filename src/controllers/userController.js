import multer from 'multer';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import User from '../models/userModel.js';
import {
  getOne,
  createOne,
  updateOne,
  deleteOne as _deleteOne
} from './handlerFactory.js';
import { imageUpload, imageDelete } from '../utils/imageProcess.js';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// @desc    Upload User Photo
// @route   PATCH /api/v1/users/personal/avatar
// @access  Private ==> Current User
export const uploadAvatar = multer({
  limits: {
    fileSize: 1000000
  },
  multerFilter(request, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      request.fileValidationError = 'Only image files are allowed!';
      return cb(
        new AppError('Not an image! Please upload only images.'),
        false
      );
    }

    cb(null, true);
  }
}).single('photo');

// @desc    Resizing User Photo
// @route   PATCH /api/v1/users/personal/avatar
// @access  Private ==> Current User
export const resizeImages = catchAsync(async (req, res) => {
  // Check first if there is an existing avatar on the database
  // If that's true, then call imageDelete function to delete them
  const user = await User.findById(req.user.id).lean();
  if (user.avatar != null) {
    imageDelete(user);
  }
  // Getting the image path after resizing it & Uploading it to the database
  const image = await imageUpload(req);

  // Updating The User's Avatar Field by assigning the Avatar's Path to it.
  await User.findByIdAndUpdate(
    req.user.id,
    { avatar: image },
    {
      new: true,
      runValidators: true
    }
  );

  // Process Done Successfully
  res.status(200).json({
    status: 'success',
    path: image
  });
});

// @desc    Deleting User's Avatar
// @route   DELETE /api/v1/users/personal/avatar
// @access  Private ==> Current User
export const deleteAvatar = catchAsync(async (req, res, next) => {
  // Getting User's Data From the Database
  const user = await User.findById(req.user.id).lean();

  // Calling The imageDelete Function to Delete the Avatar by sending to it User's Data
  const Delete = imageDelete(user);

  // If the imageData Returned false, then thi means that the function found the avatar's field and it found that this field doesn't contain any null data (Which means it contains the actual path of the avatar)
  // The imageDelete Function will go then to the server storage where the avatar locates and then delete that avatar
  if (!Delete) {
    // Updating The User's Data by setting the avatar's field to undefined
    await User.findByIdAndUpdate(
      req.user.id,
      { avatar: undefined },
      {
        new: true,
        runValidators: true
      }
    );

    // Process Done Successfully
    res.status(200).json({
      status: 'success',
      message: 'Avatar Successfully Deleted'
    });
  } else {
    // If the imageDelete function found that the avatar's field contain null then it will return true, which means you can't delete something that doesn't exist.
    res.status(400).json({
      message: 'There is no avatar to delete'
    });
  }
});

// @desc    Get User's Avatar
// @route   GET /api/v1/users/:id/avatar
// @access  Private ==> Current User
export const getUserAvatar = catchAsync(async (req, res, next) => {
  // Get The User From The Database
  const user = await User.findById(req.params.id);

  // Check if the user exists and the user's Avatar Field not equal to NULL
  if (!user || user.avatar == null) {
    return next(
      new AppError(
        'Maybe the user does not exist or the avatar was deleted',
        400
      )
    );
  }

  // Response with Success
  res.status(200).json({
    status: 'success',
    path: user.avatar
  });
});

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
export const deleteUser = _deleteOne(User);

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
