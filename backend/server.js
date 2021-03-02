const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const colors = require('colors');
const connectDB = require('./config/db');
const routes = require('./routes/index');

// config
dotenv.config();
// connect database
connectDB();

app.use(
    express.urlencoded({
        extended: true,
    }),
); // req html form data
app.use(express.json()); // res json data

// routers
routes(app);

app.listen(
    PORT,
    console.log(`Listening on http://localhost:${PORT}`.yellow.bold),
);
