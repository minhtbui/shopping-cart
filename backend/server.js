const express = require('express');
const app = express();
const dotenv = require('dotenv');
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
);

// post req data
app.use(express.json());

// routers
routes(app);

// listen to server
const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Listening on http://localhost:${PORT}`.yellow.bold),
);
