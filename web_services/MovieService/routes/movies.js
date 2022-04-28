const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies');

// const { protect } = require('../middleware/auth');

router.route('/').get(getMovies).post(addMovie);
router.route('/:id').get(getMovie).put(updateMovie).delete(deleteMovie);

module.exports = router;
