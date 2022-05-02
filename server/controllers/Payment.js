//@desc   Get all reservations
//@route  GET /api/v1/payment
//@access Public
exports.checkPayment = async (req, res) => {
  const { cardNumber, cardName, cardExpiry, cardCvc } = req.body;
  res.status(200).json({
    success: true,
    data: {
      message: "Payment Successful",
    },
  });
};
