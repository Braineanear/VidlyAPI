import { Router } from 'express';
import {
  getAllRentals,
  createRental,
  getRental,
  updateRental,
  deleteRental
} from '../controllers/rentalController.js';
import { protect } from '../controllers/authController.js';
import APIFeatures from '../utils/apiFeatures.js';
import Rental from '../models/rentalModel.js';

const router = Router();

//===========================Public Routes===================================//
//ANY ONE CAN ACCESS THESE ROUTES

//Get All Rentals Route
router.get('/', APIFeatures(Rental), getAllRentals);

//====================User's Routes / Private Routes=========================//
// Protect all routes after this middleware
// ONLY LOGGED IN USERS CAN ACCESS THESE ROUTES
router.use(protect);

router.route('/').get(APIFeatures(Rental), getAllRentals).post(createRental);

router.route('/:id').get(getRental).patch(updateRental).delete(deleteRental);

export default router;
