const multer = require('multer');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const factory = require('./handlerFactory');
const imageProcess = require('../utils/imageProcess');

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
exports.uploadAvatar = multer({
  dest: process.env.FILE_UPLOAD_PATH_USER,
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
exports.resizeImages = catchAsync(async (req, res) => {
  // Getting the image path after resizing it & Uploading it to the database
  const image = await imageProcess.imageUpload(req);

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
exports.deleteAvatar = catchAsync(async (req, res, next) => {
  // Gettin User's Data From the Database
  const user = await User.findById(req.user.id);

  // Calling The imageDelete Function to Delete the Avatar by sending to it User's Data
  const Delete = await imageProcess.imageDelete(user);

  // If the imageData Returned false, then thi means that the function found the avatar's field and it found that this field doesn't contain any null data (Which means it contains the actuall path of the avatar)
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
  }

  // If the imageDelete function found that the avatar's field contain null then it will return true, which means you can't delete something that doesn't exist.
  res.status(400).json({
    message: 'There is no avatar to delete'
  });
});

// @desc    Get User's Avatar
// @route   GET /api/v1/users/:id/avatar
// @access  Private ==> Current User
exports.getUserAvatar = catchAsync(async (req, res, next) => {
  // Get The User From The Database
  const user = await User.findById(req.params.id);

  // Check if the user exists and the Uer's Avatar Field not equeal to NULL
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
exports.getAllUsers = catchAsync(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Single User
// @route   GET /api/v1/users/:id
// @access  Private ==> Admin
exports.getUser = factory.getOne(User);

// @desc    Create Single User
// @route   POST /api/v1/users
// @access  Private ==> Admin
exports.createUser = factory.createOne(User);

// @desc    Update Single User
// @route   PATCH /api/v1/users/:id
// @access  Private ==> Admin
exports.updateUser = factory.updateOne(User);

// @desc    Delete Single User
// @route   DELETE /api/v1/users/:id
// @access  Private ==> Admin
exports.deleteUser = factory.deleteOne(User);

// @desc    Get Current User Data
// @route   GET /api/v1/users/personal
// @access  Private ==> Current User
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

// @desc    Update User Details (Name / Email)
// @route   PATCH /api/v1/users/personal
// @access  Private ==> Current User
exports.updateMe = catchAsync(async (req, res, next) => {
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
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.deleteOne({ _id: req.user.id });

  res.status(200).json({
    status: 'success',
    data: {}
  });
});
