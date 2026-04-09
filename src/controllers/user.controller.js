const prisma = require('../lib/prisma');

const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      where: { isActive: true },
    });
    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getMovieShowtimes = async (req, res) => {
  try {
    const { id } = req.params;
    const showtimes = await prisma.showtime.findMany({
      where: { movieId: id },
      orderBy: { startTime: 'asc' }
    });
    res.status(200).json(showtimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const bookTickets = async (req, res) => {
  try {
    const { showtimeId, seatsBooked } = req.body;
    const userId = req.user.id;

    if (!showtimeId || !seatsBooked || seatsBooked <= 0) {
      return res.status(400).json({ error: 'Valid showtimeId and seatsBooked are required.' });
    }

    const result = await prisma.$transaction(async (tx) => {
      const showtime = await tx.showtime.findUnique({
        where: { id: showtimeId },
      });

      if (!showtime) {
        throw new Error('Showtime not found.');
      }

      if (showtime.availableSeats < parseInt(seatsBooked)) {
        throw new Error('Not enough available seats.');
      }

      const booking = await tx.booking.create({
        data: {
          userId,
          showtimeId,
          seatsBooked: parseInt(seatsBooked),
        },
      });

      await tx.showtime.update({
        where: { id: showtimeId },
        data: { availableSeats: showtime.availableSeats - parseInt(seatsBooked) },
      });

      return booking;
    });

    res.status(201).json({ message: 'Booking successful', booking: result });
  } catch (error) {
    if (error.message === 'Showtime not found.' || error.message === 'Not enough available seats.') {
      return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        showtime: {
          include: {
            movie: {
              select: { title: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  getAllMovies,
  getMovieShowtimes,
  bookTickets,
  getUserBookings,
};
