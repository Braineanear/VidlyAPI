const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// @desc    Get One Document
// @route   GET ==> General Route
// @access  Private/Public
exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
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

// @desc    Create New Document
// @route   POST ==> General Route
// @access  Private
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: 'success',
      doc
    });
  });

// @desc    Update One Document
// @route   PATCH ==> General Route
// @access  Private
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
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

// @desc    Delete One Document
// @route   DELETE ==> General Route
// @access  Private
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No Result Found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {}
    });
  });
