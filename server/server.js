const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./common/database')();
const dotenv = require('dotenv').config();

const app = express();

//request allow any domain
app.use(cors({ origin: '*' }));

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Route files
<<<<<<< HEAD
const movies = require('./routes/Movies');
const reservations = require('./routes/Reservations');
const theater = require('./routes/Theater');
const payment = require('./routes/Payment');

// Mount routers
app.use('/api/v1/movies', movies);
app.use('/api/v1/reservations', reservations);
app.use('/api/v1/theater', theater);
app.use('/api/v1/payment', payment);
=======
const movies = require("./routes/Movies");
const reservations = require("./routes/Reservations");
const theater = require("./routes/Theater");
const payment = require("./routes/Payment");
const ticket = require("./routes/Ticket");

// Mount routers
app.use("/api/v1/movies", movies);
app.use("/api/v1/reservations", reservations);
app.use("/api/v1/theater", theater);
app.use("/api/v1/payment", payment);
app.use("/api/v1/ticket", ticket);
>>>>>>> 6be8bdd8c90d8adffb3939d5acfb6daa0bd23a30

const PORT = 5002;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
