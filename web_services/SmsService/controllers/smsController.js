const QRCode = require('qrcode');
const Vonage = require('@vonage/server-sdk');

//vonage api configurations
const vonage = new Vonage({
  apiKey: 'db565896',
  apiSecret: 'joR5tMif5GyBOtMX',
});

//@desc  endpoint to create and send a sms
//@route POST /api/v1/sms
//@access Private
exports.sendSMS = async (req, res) => {
  try {
    //initalizing the mesage details
    const reservation = req.body;
    const from = 'Vonage APIs';
    const to = '94777440920';
    const text = `Hi Customer. Your payment of ${reservation.totalPrice} has been recived and tickets has been sent to your Email ID for ${reservation.movieName} on ${reservation.date} at ${reservation.theaterName}`;

    //calling vonage api to send message to the user
    vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          msg: 'Server error',
        });
      } else {
        if (responseData.messages[0]['status'] === '0') {
          console.log('Message sent successfully.');
          res.status(201).json({
            success: true,
          });
        } else {
          console.log(
            `Message failed with error: ${responseData.messages[0]['error-text']}`
          );
          res.status(500).json({
            success: false,
            msg: 'Server error',
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Server error',
    });
  }
};
