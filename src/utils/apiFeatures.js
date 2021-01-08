const AppError = require('./appError');
const catchAsync = require('./catchAsync');

const advancedResults = (model, populate) =>
  catchAsync(async (req, res, next) => {
    let query;

    const reqQuery = { ...req.query };

    const removeFields = ['select', 'sort', 'page', 'limit'];

    removeFields.forEach((params) => delete reqQuery[params]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    query = model.find(JSON.parse(queryStr)).lean();

    if (!query) {
      return next(new AppError('No Data Found', 400));
    }

    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (populate) {
      query = query.populate(populate);
    }

    query = await query;

    res.advancedResults = {
      status: 'success',
      results: query.length,
      data: query
    };

    next();
  });

module.exports = advancedResults;
