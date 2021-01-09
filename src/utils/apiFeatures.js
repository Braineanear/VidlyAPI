import AppError from './appError.js';
import catchAsync from './catchAsync.js';

const advancedResults = (model, populate) =>
  catchAsync(async (req, res, next) => {
    let query;

    // Copying the req.query data and store it
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    // Loop over  removeFields and delete them from reqQuery
    removeFields.forEach((params) => delete reqQuery[params]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt / $gte / etc...)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Finding resource
    query = model.find(JSON.parse(queryStr)).lean();

    if (!query) {
      return next(new AppError('No Data Found', 400));
    }

    // Selecting
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    } else {
      // Excluding __v which mongo create on each record to use it by using select and putting dash -
      query = query.select('-__v');
    }

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (populate) {
      query = query.populate(populate);
    }

    // Excluding query
    query = await query;

    res.advancedResults = {
      status: 'success',
      results: query.length,
      data: query
    };

    next();
  });

export default advancedResults;
