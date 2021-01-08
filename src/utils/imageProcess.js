const fs = require('fs');
const dotenv = require('dotenv');
const sharp = require('sharp');
const path = require('path');
const catchAsync = require('./catchAsync');

dotenv.config({ path: 'config.env' });

// @desc    Uploading image to the database and the server
// @route   NONE
// @access  Private ==> Admin/User
exports.imageUpload = catchAsync(async (req) => {
  // Get the path of the foleder where the image is going to be saved
  const filePath = path.resolve(
    `${__dirname}/../${process.env.FILE_UPLOAD_PATH}`
  );

  // Access the folder where images is going to be saved
  fs.access(filePath, (err) => {
    // If the folder doesn't not exist, create new one
    if (err) {
      fs.mkdirSync(filePath);
    }
  });

  // Get the uploaded image name and replace the spaces in the name with dash
  const formatedName = req.file.originalname.split(' ').join('-');
  const fileName = `user-${Date.now()}-${formatedName}`;

  // Resize the image and change it's type to jpge then save it into it's folder in the server
  await sharp(req.file.buffer)
    .resize({
      fit: sharp.fit.contain,
      width: 500
    })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${filePath}/${fileName}`);

  // Return the image path on the server
  return `${filePath}/${fileName}`;
});

// @desc    Deleting image from the database and the server
// @route   NONE
// @access  Private ==> Admin/User
exports.imageDelete = catchAsync(async (req, res, next) => {
  // Checking if the avatar field in the database equal NULL
  // If the avatar field == NULL then it will return true to tell you that you cannot delete something that does not exist
  if (req.avatar == null) return true;

  // If the avatar field value not equal to NULL
  // Then it will start deleting the image from the server storage
  fs.unlink(req.avatar, (err) => err);
});
