import streamifier from 'streamifier';
import cloudinary from 'cloudinary';
import dotEnv from 'dotenv';

dotEnv.config({ path: 'config.env' });

// Setting The Cloudinary Configurations
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// The Destroy Function
// This Function Deletes The Image From The Cloud
export const destroy = (avatarPublicID) =>
  cloudinary.v2.uploader.destroy(avatarPublicID, (err, des) => des);

// The Upload Function
// This Function Uploads The Image Into The Cloud
export const streamUpload = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder: process.env.CLOUD_FOLDER },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    //Converting The Buffer Into a Readable Stream
    streamifier.createReadStream(buffer).pipe(stream);
  });
