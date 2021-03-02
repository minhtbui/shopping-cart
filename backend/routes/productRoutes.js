const express = require('express');
const router = express.Router();
const Products = require('../data/products');
const asyncHandler = require('express-async-handler');

//! [GET] /api/products/
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const products = await Products.find({});

        res.json(products);
    }),
);

//! [GET] /api/products/:id
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Products.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    }),
);

module.exports = router;
