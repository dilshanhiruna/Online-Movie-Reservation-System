var PhoneNumber = require("awesome-phonenumber");

//@desc   Get all reservations
//@route  GET /api/v1/payment
//@access Public
exports.checkPayment = async (req, res) => {
  const { phoneNumber, pin, totalPrice } = req.body.data;

  try {
    const number = new PhoneNumber(phoneNumber, "LK");
    // validate card number
    if (number.isValid()) {
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
