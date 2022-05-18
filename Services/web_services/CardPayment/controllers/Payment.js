var valid = require("card-validator");

//@desc   Get all reservations
//@route  GET /api/v1/payment
//@access Public
exports.checkPayment = async (req, res) => {
  const { cardNumber, cardName, cardExpiry, cardCvc } = req.body;
  try {
    var numberValidation = valid.number(cardNumber);
    // validate card number
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
  } catch (error) {
    console.log(error);
  }
};
