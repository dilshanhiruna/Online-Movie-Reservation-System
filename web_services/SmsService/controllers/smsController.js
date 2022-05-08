const QRCode = require('qrcode');
const Vonage = require('@vonage/server-sdk');
const vonage = new Vonage({
  apiKey: 'db565896',
  apiSecret: 'joR5tMif5GyBOtMX',
});

//@desc  create sms
//@route POST /api/v1/sms
//@access Private

exports.sendSMS = async (req, res) => {
  console.log('hey sms');
  const from = 'Vonage APIs';
  const to = '94777440920';
  const text = 'A text message sent using the Vonage SMS API';

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]['status'] === '0') {
        console.log('Message sent successfully.');
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]['error-text']}`
        );
      }
    }
  });
};
