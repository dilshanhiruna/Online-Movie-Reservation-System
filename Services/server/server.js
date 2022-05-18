const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./common/database")();
const dotenv = require("dotenv").config();

const app = express();

// database connection
//connection();

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
//const payment = require("./routes/Payment");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// Mount routers
app.use("/api/v1/movies", movies);
app.use("/api/v1/reservations", reservations);
app.use("/api/v1/theater", theater);
//app.use("/api/v1/payment", payment);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = 5002;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
