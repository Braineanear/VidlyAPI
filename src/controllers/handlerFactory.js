import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

// @desc    Get One Document
// @route   GET ==> General Route
// @access  Private/Public
export function getOne(Model, populateOptions) {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError('No Result Found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      doc
    });
  });
}

// @desc    Create New Document
// @route   POST ==> General Route
// @access  Private
export function createOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: 'success',
      doc
    });
  });
}

// @desc    Update One Document
// @route   PATCH ==> General Route
// @access  Private
export function updateOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No Result Found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      doc
    });
  });
}

// @desc    Delete One Document
// @route   DELETE ==> General Route
// @access  Private
export function deleteOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No Result Found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {}
    });
  });
}
