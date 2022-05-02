const Movie = require("../models/Movie");

//@desc Get all movies
//@route GET /api/v1/movies
//@access public
exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    if (movies.length == 0) {
      return res.status(404).json({
        success: false,
        msg: "There are no any movie available",
      });
    }
    return res.status(200).json({
      success: true,
      msg: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

//@desc Get a single movie
//@route GET /api/v1/movies/:id
//@access public
exports.getMovie = async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  console.log(movie);
  try {
    if (!movie) {
      return res.status(404).json({
        success: false,
        msg: "Could not find a movie with the given ID",
      });
    }
    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

//@desc Add new movie
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
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

//@desc Update a movie
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
        msg: "Could not find a movie with the given ID",
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};

//@desc Delete a movie
//@route DELETE /api/v1/movies/:id
//@access private
exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        msg: "Could not find a movie with the given ID",
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
};
