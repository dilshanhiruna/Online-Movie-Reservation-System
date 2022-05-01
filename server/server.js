const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./common/database")();
const dotenv = require("dotenv").config();

const app = express();

//request allow any domain
app.use(cors({ origin: "*" }));

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Route files
const movies = require("./routes/Movies");
const reservations = require("./routes/Reservations");
const theater = require("./routes/Theater");

// Mount routers
app.use("/api/v1/movies", movies);
app.use("/api/v1/reservations", reservations);
app.use("/api/v1/",theater);

const PORT = 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
