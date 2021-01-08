const fs = require('fs');
const dotenv = require('dotenv');
const sharp = require('sharp');
const path = require('path');
const catchAsync = require('./catchAsync');

dotenv.config({ path: 'config.env' });

exports.imageUpload = catchAsync(async (req) => {
  const filePath = path.resolve(
    `${__dirname}/../${process.env.FILE_UPLOAD_PATH}`
  );

  fs.access(filePath, (err) => {
    if (err) {
      fs.mkdirSync(filePath);
    }
  });

  const formatedName = req.file.originalname.split(' ').join('-');
  const fileName = `user-${Date.now()}-${formatedName}`;

  await sharp(req.file.buffer)
    .resize({
      fit: sharp.fit.contain,
      width: 500
    })
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`${filePath}/${fileName}`);

  return `${filePath}/${fileName}`;
});

exports.imageDelete = catchAsync(async (req, res, next) => {
  if (req.avatar == null) return true;
  fs.unlink(req.avatar, (err) => err);
});
