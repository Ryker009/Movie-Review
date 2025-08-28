import Movie from '../models/Movie.js';
import Rating from '../models/Rating.js';
import Comment from '../models/Comment.js';

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}).populate('ratings').populate({
        path: 'comments',
        populate: { path: 'user', select: 'username' } // Populate username for comments
    });
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get movie by ID
// @route   GET /api/movies/:id
// @access  Public
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
            .populate('ratings')
            .populate({
                path: 'comments',
                populate: { path: 'user', select: 'username' }
            });

        if (!movie) {
            return res.status(404).json({ msg: 'Movie not found' });
        }

        res.json(movie);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Movie not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Create a movie
// @route   POST /api/movies
// @access  Private (you can add auth middleware here)
export const createMovie = async (req, res) => {
    const { title, genre, releaseYear, posterUrl } = req.body;

    try {
        const newMovie = new Movie({
            title,
            genre,
            releaseYear,
            posterUrl
        });

        const movie = await newMovie.save();
        res.json(movie);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Add a rating to a movie
// @route   POST /api/movies/:id/ratings
// @access  Private (requires user to be logged in)
export const addRating = async (req, res) => {
    const { value } = req.body;
    const userId = req.user.id; // Assumes you have auth middleware that adds user to req

    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ msg: 'Movie not found' });
        }

        // Check if the user has already rated this movie
        const existingRating = await Rating.findOne({ user: userId, movie: movie._id });

        if (existingRating) {
            // Update existing rating
            existingRating.value = value;
            await existingRating.save();
            return res.json(await Movie.findById(req.params.id).populate('ratings'));
        }

        // Create a new rating
        const newRating = new Rating({
            user: userId,
            movie: movie._id,
            value
        });

        await newRating.save();

        // Add rating to movie's ratings array
        movie.ratings.push(newRating._id);
        await movie.save();

        res.json(await Movie.findById(req.params.id).populate('ratings'));

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// @desc    Add a comment to a movie
// @route   POST /api/movies/:id/comments
// @access  Private
export const addComment = async (req, res) => {
    const { text } = req.body;
     const userId = req.user.id;

    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ msg: 'Movie not found' });
        }

        const newComment = new Comment({
            user: userId,
            movie: movie._id,
            text,
        });

        await newComment.save();

        movie.comments.push(newComment._id);
        await movie.save();

        const populatedMovie = await Movie.findById(req.params.id)
            .populate({
                path: 'comments',
                populate: { path: 'user', select: 'username' }
            });
            
        res.json(populatedMovie.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Private
export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ msg: 'Movie not found' });
        }
        
        // Here you could add a check to ensure only an admin can update
        
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedMovie);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Private
export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ msg: 'Movie not found' });
        }

        // Here you could add a check to ensure only an admin can delete

        await movie.deleteOne();

        res.json({ msg: 'Movie removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};