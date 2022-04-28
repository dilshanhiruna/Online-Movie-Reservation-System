const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./common/database")();
require("dotenv").config();

const app = express();

//request allow any domain
app.use(cors({ origin: "*" }));

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Route files
const reservations = require("./routes/Reservations");

// Mount routers
app.use("/api/v1/reservations", reservations);

const PORT = 5002;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
