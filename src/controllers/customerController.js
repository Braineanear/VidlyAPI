import catchAsync from '../utils/catchAsync.js';
import Customer from '../models/customerModel.js';
import { getOne, createOne, updateOne, deleteOne } from './handlerFactory.js';

// @desc    Get All Customers
// @route   GET /api/v1/customers
// @access  Private ==> Current User
export const getAllCustomers = catchAsync(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Specific Customer's Data
// @route   GET /api/v1/customers/:id
// @access  Private ==> Current User
export const getCustomer = getOne(Customer);

// @desc    Create New Customer
// @route   POST /api/v1/customers
// @access  Private ==> Current User
export const createCustomer = createOne(Customer);

// @desc    Updating Customer's Data
// @route   PATCH /api/v1/customers/:id
// @access  Private ==> Admin
export const updateCustomer = updateOne(Customer);

// @desc    Deleting Customer's Data
// @route   DELETE /api/v1/customers/:id
// @access  Private ==> Admin
export const deleteCustomer = deleteOne(Customer);
