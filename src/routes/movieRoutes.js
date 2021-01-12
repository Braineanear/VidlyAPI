import { Router } from 'express';
import {
  getAllMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie
} from '../controllers/movieController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import APIFeatures from '../utils/apiFeatures.js';
import Movie from '../models/movieModel.js';

const router = Router();

//===========================Public Routes===================================//
//ANY ONE CAN ACCESS THESE ROUTES

// Get All Movies Route
router.get(
  '/',
  APIFeatures(Movie, { path: 'genre', select: 'name -_id' }),
  getAllMovies
);

// Get Specific Movie's Data Route
router.get('/:id', getMovie);

//====================Admin's Routes / Private Routes=========================//
// Protect all routes after this middleware
// ONLY ADMIN CAN ACCESS THESE ROUTES
router.use(protect, restrictTo('admin'));

// Creating New Movie Route
router.post('/', createMovie);

//Main routes that admin can access to update an existing movie or deleting an existing movie
router.route('/:id').patch(updateMovie).delete(deleteMovie);

export default router;
