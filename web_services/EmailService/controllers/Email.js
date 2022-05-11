var nodemailer = require("nodemailer");
const EMAILADDRESS = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
//pwd - sliit#DSa2
//email -moviereservationsliit@gmail.com

//@desc   Get all reservations
//@route  GET /api/v1/
//@access Public

exports.sendEmail = async (req, res) => {
  const {
    movieName,
    theaterName,
    noOfTickets,
    date,
    timeSlot,
    paymentType,
    totalPrice,
    email,
    ticketQRcode,
  } = req.body;

  // function to get the time slot according to the numbering
  const getTimeSlot = (slot) => {
    if (slot === "1") {
      return "09:00-11:00";
    } else if (slot === "2") {
      return "12:00-14:00";
    } else if (slot === "3") {
      return "15:00-17:00";
    } else if (slot === "4") {
      return "18:00-20:00";
    } else {
      return "Not Available";
    }
  };

  var transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAILADDRESS,
      pass: PASSWORD,
    },
  });

  var mailOption = {
    from: "moviereservationsliit@gmail.com",
    to: email,
    subject: "Confirm the movie reservation",
    html: `<style>
      table, th, td {
        border: 1px solid;
      }
      </style>
      <h1>Summary Details of Booking</h1>
      <br/>
      <table>
        <tr>
          <th>Movie</th>
          <th>Theater Name</th>
          <th>No of Tickets</th>
          <th>Date</th>
          <th>Time</th>
          <th>Payment</th>
          <th>Total Price</th>
          <th>Status</th>
          
        </tr>
        <tr>
          <td>${movieName}</td>
          <td>${theaterName}</td>
          <td>${noOfTickets}</td>
          <td>${date}</td>
          <td>${getTimeSlot(timeSlot)}</td>
          <td>${paymentType}</td>
          <td>${totalPrice}</td>
        </tr>
      </table>
      <br/>
      <img src=${ticketQRcode} alt="QR">
      <p>Thanks and Regards,<br/>Online Movie Reservation System</p>`,
  };

  // attachments: [
  //   {
  //     filename: "image.png",
  //     path: "/path/to/file",
  //   },
  // ];
  transpoter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email send info :" + info.response);
    }
  });
};
