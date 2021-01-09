import { Router } from 'express';
import {
  getAllRentals,
  createRental,
  getRental,
  updateRental,
  deleteRental
} from '../controllers/rentalController';
import { protect } from '../controllers/authController';
import APIFeatures from '../utils/apiFeatures';
import Rental from '../models/rentalModel';

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
