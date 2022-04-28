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
const movies = require('./routes/movies');

// Mount routers
app.use('/api/v1/movies', movies);

const PORT = process.env.PORT || 5004;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
