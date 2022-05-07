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
const ticket = require("./routes/Ticket");

// Mount routers
app.use("/api/v1/ticket", ticket);

const PORT = 5005;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
