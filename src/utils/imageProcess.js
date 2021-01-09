import { access, mkdirSync, unlink } from 'fs';
import { config } from 'dotenv';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

import catchAsync from './catchAsync.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config({ path: 'config.env' });

export const imageUpload = catchAsync(async (req) => {
  // Get the path of the folder where the image is going to be saved
  const folderPath = path.resolve(path.join(__dirname, '..', process.env.FILE_UPLOAD_PATH));

  // Access the folder where images is going to be saved
  access(folderPath, (err) => {
    // If the folder doesn't not exist, create new one
    if (err) {
      mkdirSync(folderPath);
    }
  });

  // Get the uploaded image name and replace the spaces in the name with dash
  const fileName = `user-${Date.now()}-${req.file.originalname.split(' ').join('-')}`;
  const filePath = path.resolve(path.join(folderPath, fileName));
  // Resize the image and change it's type to jpeg then save it into it's folder in the server
  await sharp(req.file.buffer)
    .resize({
      fit: sharp.fit.contain,
      width: 500
    })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(filePath);

  // Return the image path on the server
  return filePath;
});

export const imageDelete = (req, res, next) => {
  // Checking if the avatar field in the database equal NULL
  // If the avatar field == NULL then it will return true to tell you that you cannot delete something that does not exist
  if (req.avatar == null) return true;

  // If the avatar field value not equal to NULL
  // Then it will start deleting the image from the server storage
  unlink(req.avatar, (err) => err);
  return false;
};
