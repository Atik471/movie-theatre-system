const express = require('express');
const { getAllMovies, getMovieShowtimes, bookTickets } = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// User routes protected by authentication middleware
router.use(authenticate);

// Movie & Showtime endpoints
router.get('/movies', getAllMovies);
router.get('/movies/:id/showtimes', getMovieShowtimes);
router.post('/bookings', bookTickets);

module.exports = router;
