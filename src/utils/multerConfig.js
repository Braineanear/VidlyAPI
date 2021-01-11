import multer from 'multer';
import AppError from './appError.js';

const upload = multer({
  //Storing The Image into The Memory
  storage: multer.memoryStorage(),
  //Setting The Size Limitation
  limits: {
    fileSize: 1000000
  },
  //Filtration Function
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(
        new AppError('Not an image! Please upload only images.'),
        false
      );
    }

    cb(null, true);
  }
}).single('photo');

export default upload;
