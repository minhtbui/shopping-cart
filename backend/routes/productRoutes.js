const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');

//! [GET] /api/products/
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await Product.find({});

        res.json(products);
    }),
);

//! [GET] /api/products/:id
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product Not Found');
        }
    }),
);

module.exports = router;
