import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import { destroy, streamUpload } from '../utils/cloudinaryConfig.js';
import resizedImage from '../utils/imageProcess.js';
import User from '../models/userModel.js';

// @desc    Resizing User Avatar
// @route   PATCH /api/v1/users/personal/avatar
// @access  Private ==> Current User
export const uploadAvatar = async (req, res, next) => {
  //The Upload Function Will Upload The Image Into The Cloudinary Storage
  //The Function Takes a Buffer Which is The Buffer of The Resized Image
  async function upload(buffer) {
    // Check First if There is an Existing Avatar on The Database
    // If That's True, Then Call The Destroy Function to Delete it
    if (req.user.avatarPublicID != null || req.user.avatarURL != null) {
      await destroy(req.user.avatarPublicID);
    }

    // Calling The streamUpload Function to Convert The Resized Image Buffer Into a Readable Stream To Use it to Upload The Image Into The Cloudinary Storage
    const result = await streamUpload(buffer);

    // Updating The User's avatarPublicID and avatarURL Fields
    await User.findByIdAndUpdate(
      req.user.id,
      { avatarPublicID: result.public_id, avatarURL: result.secure_url },
      {
        new: true
      }
    );

    // Sending Response
    res.status(200).json({
      status: 'success',
      imageURL: result.secure_url
    });
  }

  // Calling The upload Function to Upload The Image Into The Cloudinary Storage
  upload(await resizedImage(req.file.buffer));
};

// @desc    Deleting User's Avatar
// @route   DELETE /api/v1/users/personal/avatar
// @access  Private ==> Current User
export const deleteAvatar = catchAsync(async (req, res, next) => {
  //The Upload Function Will Upload The Image Into The Cloudinary Storage
  //The Function Takes a Buffer Which is The Buffer of The Resized Image
  if (req.user.avatarPublicID != null || req.user.avatarURL != null) {
    await destroy(req.user.avatarPublicID);

    // Updating The User's avatarPublicID and avatarURL Fields
    await User.findByIdAndUpdate(
      req.user.id,
      { avatarPublicID: null, avatarURL: null },
      {
        new: true
      }
    );

    // Sending Success Response
    res.status(400).json({
      status: 'success',
      message: 'Avatar Successfully Deleted'
    });
  } else {
    //Sending Fail Response
    res.status(400).json({
      status: 'failed',
      message: 'You cannot non-existing avatar'
    });
  }
});

// @desc    Get User's Avatar
// @route   GET /api/v1/users/:id/avatar
// @access  Private ==> Current User
export const getUserAvatar = catchAsync(async (req, res, next) => {
  // Get The User From The Database
  const user = await User.findById(req.params.id);

  // Check if the user exists and the user's avatarURL Field not equal to NULL
  if (!user || user.avatarURL == null) {
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
    path: user.avatarURL
  });
});
