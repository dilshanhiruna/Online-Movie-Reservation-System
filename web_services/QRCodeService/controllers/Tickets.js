const QRCode = require("qrcode");

//@desc  create ticket
//@route POST /api/v1/ticket
//@access Private

exports.createTicket = async (req, res) => {
  const payload = req.body;

  var opts = {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    quality: 0.3,
    margin: 1,
  };
  QRCode.toDataURL(JSON.stringify(payload.payload), opts, function (err, url) {
    if (err) {
      throw err;
    }
    res.json({
      success: true,
      data: url,
    });
  });
};
