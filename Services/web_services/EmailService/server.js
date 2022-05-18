const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
var nodemailer = require("nodemailer");

const app = express();

//request allow any domain
app.use(cors({ origin: "*" }));

//Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Route files
const email = require("./routes/Email");

// Mount routers
app.use("/api/v1/sendemail", email);

const PORT = 5006;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
