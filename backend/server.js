const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;
const colors = require('colors');
const connectDB = require('./config/db');
const products = require('./data/products');

// config
dotenv.config();
connectDB(); // connect database
app.use(express.urlencoded()); // req html form data
app.use(express.json()); // res json data

app.get('/', (req, res) => {
    res.send('API is running');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((product) => product._id === req.params.id);
    res.json(product);
});

app.listen(
    PORT,
    console.log(`Listening on http://localhost:${PORT}`.yellow.bold),
);
