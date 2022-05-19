const Movie = require('../models/Movie');

//@desc This endpoint will return all the movies of the db
//@route GET /api/v1/movies
//@access public
exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    if (movies.length == 0) {
      return res.status(404).json({
        success: false,
        msg: 'There are no any movie available',
      });
    }
    return res.status(200).json({
      success: true,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
    });
  }
};

//@desc Endpoint to get a single movie | filtered by the id provided in query params
//@route GET /api/v1/movies/:id
//@access public
exports.getMovie = async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  try {
    if (!movie) {
      return res.status(404).json({
        success: false,
        msg: 'Could not find a movie with the given ID',
      });
    }
    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
    });
  }
};

//@desc Endpoint to create new movie
//@route POST /api/v1/movies
//@access private
exports.addMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      msg: 'Server error',
    });
  }
};

//@desc Endpoint to update a movie | identified by the id provided in query params
//@route PUT /api/v1/movies/:id
//@access private
exports.updateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        msg: 'Could not find a movie with the given ID',
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
    });
  }
};

//@desc Endpoint to delete a movie | identified by the id provided in query params
//@route DELETE /api/v1/movies/:id
//@access private
exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        msg: 'Could not find a movie with the given ID',
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'Server error',
    });
  }
};
