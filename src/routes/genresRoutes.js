import { Router } from 'express';
import {
  getAllGenres,
  createGenre,
  getGenre,
  updateGenre,
  deleteGenre
} from '../controllers/genresController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import APIFeatures from '../utils/apiFeatures.js';
import Genre from '../models/genreModel.js';

const router = Router();

//====================Admin's Routes / Private Routes=========================//
// Protect all routes after this middleware
// ONLY ADMIN CAN ACCESS THESE ROUTES
router.use(protect, restrictTo('admin'));

// Main Routes that allows the admin to ==> Get ALL Genres / Create New Genre / Get Specific Genre Data / Updating an Existing Genre / Deleting an Existing Genre
router.route('/').get(APIFeatures(Genre), getAllGenres).post(createGenre);

router.route('/:id').get(getGenre).patch(updateGenre).delete(deleteGenre);

export default router;
