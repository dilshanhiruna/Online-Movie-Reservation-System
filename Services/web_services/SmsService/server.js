const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();

//request allow any domain
app.use(cors({ origin: "*" }));

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Route files
const smsRoute = require("./routes/smsRoute");

// Mount routers
app.use("/api/v1/sms", smsRoute);

const PORT = 5009;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
