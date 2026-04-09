const prisma = require('../lib/prisma');

// --- MOVIES ---
const addMovie = async (req, res) => {
  try {
    const { title, description, duration, releaseDate, isActive } = req.body;
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        duration: parseInt(duration),
        releaseDate: new Date(releaseDate),
        isActive: isActive !== undefined ? isActive : true,
      },
    });
    res.status(201).json({ message: 'Movie added successfully', movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, duration, releaseDate, isActive } = req.body;

    const movie = await prisma.movie.update({
      where: { id },
      data: {
        title,
        description,
        ...(duration && { duration: parseInt(duration) }),
        ...(releaseDate && { releaseDate: new Date(releaseDate) }),
        ...(isActive !== undefined && { isActive }),
      },
    });
    res.status(200).json({ message: 'Movie updated successfully', movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.movie.delete({ where: { id } });
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// --- SHOWTIMES ---
const addShowtime = async (req, res) => {
  try {
    const { movieId, startTime, endTime, totalSeats } = req.body;

    // Check if movie exists
    const movie = await prisma.movie.findUnique({ where: { id: movieId } });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    const showtime = await prisma.showtime.create({
      data: {
        movieId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        totalSeats: parseInt(totalSeats),
        availableSeats: parseInt(totalSeats),
      },
    });
    res.status(201).json({ message: 'Showtime added successfully', showtime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const updateShowtime = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, totalSeats } = req.body;
    // Note: updating seats logic should handle if existing bookings exceed new availableSeats, 
    // however, ignoring this edge case for simplicity.

    const showtime = await prisma.showtime.update({
      where: { id },
      data: {
        ...(startTime && { startTime: new Date(startTime) }),
        ...(endTime && { endTime: new Date(endTime) }),
        ...(totalSeats && { totalSeats: parseInt(totalSeats) }),
      },
    });
    res.status(200).json({ message: 'Showtime updated successfully', showtime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const deleteShowtime = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.showtime.delete({ where: { id } });
    res.status(200).json({ message: 'Showtime deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  addMovie,
  updateMovie,
  deleteMovie,
  addShowtime,
  updateShowtime,
  deleteShowtime,
};
