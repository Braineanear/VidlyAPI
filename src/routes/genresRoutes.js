const express = require('express');
const genresController = require('../controllers/genresController');
const authController = require('../controllers/authController');
const APIFeatures = require('../utils/apiFeatures');
const Genre = require('../models/genreModel');

const router = express.Router();

//====================Admin's Routes / Private Routes=========================//
// Protect all routes after this middleware
// ONLY ADMIN CAN ACCESS THESE ROUTES
router.use(authController.protect, authController.restrictTo('admin'));

// Main Routes that allows the admin to ==> Get ALL Genres / Create New Genre / Get Speific Genre Data / Updateing an Exisitng Gener / Deleting an Exisiting Genre
router
  .route('/')
  .get(APIFeatures(Genre), genresController.getAllGenres)
  .post(genresController.createGenre);

router
  .route('/:id')
  .get(genresController.getGenre)
  .patch(genresController.updateGenre)
  .delete(genresController.deleteGenre);

module.exports = router;
