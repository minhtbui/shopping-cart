const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

//! [GET] /api/order/
const getOrders = asyncHandler(async (req, res) => {
    const order = await Order.find({});

    res.json(order);
});

//! [GET] /api/order/:id
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order Not Found');
    }
});

//! [POST] /api/order/
const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No items in the cart');
        return;
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

module.exports = { getOrders, getOrderById, createOrder };
