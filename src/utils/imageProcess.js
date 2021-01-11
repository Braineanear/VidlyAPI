import sharp from 'sharp';
import catchAsync from './catchAsync.js';

// This Asynchronous Function Gets the image buffer and make some processing on it like changing the image with and height / convert image to jpg extension / reduce image quality and after that it returns a new image buffer
const resizedImage = catchAsync(
  async (buffer) =>
    await sharp(buffer)
      .resize({
        fit: sharp.fit.contain,
        width: 250
      })
      .toFormat('jpeg')
      .jpeg({ quality: 80 })
      .toBuffer()
);

export default resizedImage;
