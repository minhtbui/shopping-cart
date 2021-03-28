const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

//! [POST] /api/orders/
const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
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
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

//! [GET] /api/orders/
const getOrders = asyncHandler(async (req, res) => {
    const isAdmin = req.user.isAdmin;

    const orders = isAdmin
        ? await Order.find({})
        : await Order.find({ user: req.user._id });

    res.json(orders);
});

//! [GET] /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email',
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order Not Found');
    }
});

//! [PUT] /api/orders/:id
const updateOrderPayment = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order Not Found');
    }
});
module.exports = { getOrders, getOrderById, createOrder, updateOrderPayment };
