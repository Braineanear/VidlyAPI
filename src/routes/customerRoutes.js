const express = require('express');
const customerController = require('../controllers/customerController');
const authController = require('../controllers/authController');
const APIFeatures = require('../utils/apiFeatures');
const Customer = require('../models/customerModel');

const router = express.Router();

//====================Admin's Routes / Private Routes=========================//
// Protect all routes after this middleware
// ONLY ADMIN CAN ACCESS THESE ROUTES
router.use(authController.protect, authController.restrictTo('admin'));

// Main Routes that allows the admin to ==> Get ALL Customers Data / Create New Customer / Get Speific Customer's Data / Updateing an Exisitng Customer / Deleting an Exisiting Customer
router
  .route('/')
  .get(APIFeatures(Customer), customerController.getAllCustomers)
  .post(customerController.createCustomer);

router
  .route('/:id')
  .get(customerController.getCustomer)
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

module.exports = router;
