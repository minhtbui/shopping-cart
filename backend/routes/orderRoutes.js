const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrders,
    getOrderById,
} = require('../controllers/orderController');
const protect = require('../middlewares/authMiddleware');

/*
 * Fetch orders
 * [GET, POST] api/orders/
 * Public
 */
router.route('/').post(protect, createOrder);

/*
 * Fetch order detail
 * [GET] api/orders/:id
 * Public
 */
router.route('/:id').get(protect, getOrderById);

module.exports = router;
