const Theater = require("../models/Theater");

//@desc   Add theater
//@route  POST /api/v1/theater
//@access Public
exports.addTheater = async (req, res) => {
    const { theaterID, theaterName, showDates, showTime, theaterArea } =
      req.body;
    try {
      const theater = await Theater.create({
          theaterID,
          theaterName,
          showDates,
          showTime,
          theaterArea,
      });
      return res.status(201).json({
        success: true,
        data: theater,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  };

//@desc   Get all theaters
//@route  GET /api/v1/theater
//@access Public
exports.getTheaters = async (req, res) => {
    try {
      const theater = await Theater.find();
      return res.status(200).json({
        success: true,
        count: theater.length,
        data: theater,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  };

//@desc   Get single theater details
//@route  GET /api/v1/theater/:id
//@access Public
exports.getTheater = async (req, res) => {
    try {
      const theater = await Theater.findById(req.params.id);
      if (!theater) {
        return res.status(404).json({
          success: false,
          error: "Theater not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: theater,
      });
    } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(404).json({
          success: false,
          error: "Theater not found",
        });
      }
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  };

  //@desc Update a theater
  //@route PUT /api/v1/theater/:id
  //@access private
  exports.updateTheater = async (req, res, next) => {
    try {
      const theater = await Theater.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!theater) {
        return res.status(404).json({
          success: false,
          msg: 'Could not find a theater with the given ID',
        });
      }
  
      res.status(200).json({
        success: true,
        data: theater,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: 'Server error',
      });
    }
  };
  
  //@desc Delete a theater
  //@route DELETE /api/v1/theater/:id
  //@access private
  exports.deleteTheater = async (req, res, next) => {
    try {
      const theater = await Theater.findByIdAndDelete(req.params.id);
  
      if (!theater) {
        return res.status(404).json({
          success: false,
          msg: 'Could not find a theater with the given ID',
        });
      }
  
      res.status(200).json({
        success: true,
        data: theater,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: 'Server error',
      });
    }
  };
  