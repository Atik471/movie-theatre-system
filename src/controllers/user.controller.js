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

module.exports = {
  getAllMovies,
  getMovieShowtimes,
};
