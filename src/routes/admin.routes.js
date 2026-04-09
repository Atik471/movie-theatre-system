const express = require('express');
const {
  addMovie, updateMovie, deleteMovie,
  addShowtime, updateShowtime, deleteShowtime
} = require('../controllers/admin.controller');
const { authenticate, authorizeAdmin } = require('../middleware/auth.middleware');

const router = express.Router();

// Admin routes protected by authentication and authorizion middlewares
router.use(authenticate, authorizeAdmin);

// Movie endpoints
router.post('/movies', addMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

// Showtime endpoints
router.post('/showtimes', addShowtime);
router.put('/showtimes/:id', updateShowtime);
router.delete('/showtimes/:id', deleteShowtime);

module.exports = router;
