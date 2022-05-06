var valid = require("card-validator");

//@desc   Get all reservations
//@route  GET /api/v1/payment
//@access Public
exports.checkPayment = async (req, res) => {
  const { cardNumber, cardName, cardExpiry, cardCvc } = req.body;
  var numberValidation = valid.number(cardNumber);
  if (numberValidation.isPotentiallyValid) {
    res.status(200).json({
      success: true,
      data: {
        message: "Payment Successful",
      },
    });
  } else {
    res.status(204).json({
      success: false,
      data: {
        message: "Payment Failed",
      },
    });
  }
};
