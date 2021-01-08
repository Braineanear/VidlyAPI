const catchAsync = require('../utils/catchAsync');
const Customer = require('../models/customerModel');
const factory = require('./handlerFactory');

// @desc    Get All Customers
// @route   GET /api/v1/customers
// @access  Private ==> Current User
exports.getAllCustomers = catchAsync(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Speific Customer's Data
// @route   GET /api/v1/customers/:id
// @access  Private ==> Current User
exports.getCustomer = factory.getOne(Customer);

// @desc    Create New Customer
// @route   POST /api/v1/customers
// @access  Private ==> Current User
exports.createCustomer = factory.createOne(Customer);

// @desc    Updating Customer's Data
// @route   PATCH /api/v1/customers/:id
// @access  Pivate ==> Admin
exports.updateCustomer = factory.updateOne(Customer);

// @desc    Deleting Customer's Data
// @route   DELETE /api/v1/customers/:id
// @access  Private ==> Admin
exports.deleteCustomer = factory.deleteOne(Customer);
