import { Router } from 'express';
import {
  getAllCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer
} from '../controllers/customerController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import APIFeatures from '../utils/apiFeatures.js';
import Customer from '../models/customerModel.js';

const router = Router();

//====================Admin's Routes / Private Routes=========================//
// Protect all routes after this middleware
// ONLY ADMIN CAN ACCESS THESE ROUTES
router.use(protect, restrictTo('admin'));

// Main Routes that allows the admin to ==> Get ALL Customers Data / Create New Customer / Get Specific Customer's Data / Updating an Existing Customer / Deleting an Existing Customer
router
  .route('/')
  .get(APIFeatures(Customer), getAllCustomers)
  .post(createCustomer);

router
  .route('/:id')
  .get(getCustomer)
  .patch(updateCustomer)
  .delete(deleteCustomer);

export default router;
