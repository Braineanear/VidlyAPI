import AppError from '../utils/appError.js';
import ErrorStack from '../models/errorModel.js';

const saveError = async (err) => {
  const newError = await ErrorStack.create({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
  return newError.id;
};

// @desc    Function That Handles Invalid JWT Tokens (UNAUTHORIZED)
const handleJWTError = () =>
  new AppError('Invalid token, Please login again!', 401);

// @desc    Function That Handles Expired JWT Tokens (UNAUTHORIZED)
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please login again!', 401);

// @desc    Function That Handles MongoDB Casting Errors (BAD_REQUEST)
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// @desc    Function That Handles MongoDB Duplication Errors (BAD_REQUEST)
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// @desc    Function That Handles MongoDB Validation Errors (BAD_REQUEST)
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// @desc    Function That Shows Details About The Error Only on The Development Phase
const sendErrorDev = async (err, req, res) => {
  const errorId = await saveError(err);
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: `${err.message} (${errorId})`,
    stack: err.stack
  });
};

// @desc    Function That Shows Little Info About The Error Only on The Production Phase
const sendErrorProd = async (err, req, res) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    const errorId = await saveError(err);
    return res.status(err.statusCode).json({
      status: err.status,
      message: `${err.message} (${errorId})`
    });
  }

  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  const errorId = await saveError(err);
  return res.status(500).json({
    status: 'error',
    message: `Something went wrong! (${errorId})`
  });
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Send Errors in The Development Phase
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);

    // Send Errors in The Production Phase
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
