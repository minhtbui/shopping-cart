const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
} = require('../controllers/productController');

/*
 * Fetch products
 * [GET] api/products/
 * Public
 */
router.route('/').get(getProducts);

/*
 * Fetch product detail
 * [GET] api/products/:id
 * Public
 */
router.route('/:id').get(getProductById);

module.exports = router;
