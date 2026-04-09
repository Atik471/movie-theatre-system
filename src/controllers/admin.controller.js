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

module.exports = {
  addMovie,
  updateMovie,
  deleteMovie,
};
