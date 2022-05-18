const Reservation = require("../models/Reservation");

//@desc   Get all reservations
//@route  GET /api/v1/reservations
//@access Public
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    return res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc   Get single reservation
//@route  GET /api/v1/reservations/:id
//@access Public
exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        error: "Reservation not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Reservation not found",
      });
    }
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc   Get all reservation belong to a customer
//@route  GET /api/v1/reservations/:id
//@access Public
exports.getCustomerReservations = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({
        success: false,
        error: "Reservation not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Reservation not found",
      });
    }
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

//@desc   Add reservation
//@route  POST /api/v1/reservations
//@access Public
exports.addReservation = async (req, res) => {
  try {
    const {
      customerID,
      movieID,
      movieName,
      theaterID,
      theaterName,
      noOfTickets,
      date,
      timeSlot,
      paymentType,
      totalPrice,
      status,
      tickets,
    } = req.body;
    const reservation = await Reservation.create({
      customerID,
      movieID,
      movieName,
      theaterID,
      theaterName,
      noOfTickets,
      date,
      timeSlot,
      paymentType,
      totalPrice,
      status,
      reservedDate: new Date(),
      tickets,
    });
    return res.status(201).json({
      success: true,
      id: reservation._id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
