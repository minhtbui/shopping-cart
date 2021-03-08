const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

//! [POST] /api/users/
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        res.status(400);
        throw new Error('User is already existed!');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//! [POST] /api/users/login
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or password');
    }
});

//! [GET] /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
    const { _id, name, email, isAdmin } = req.user;
    if (_id) {
        res.json({
            _id,
            name,
            email,
            isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User is not found');
    }
});

//! [PUT] /api/users/profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findOne(req.user._id);

    if (user) {
    } else {
        res.status(404);
        throw new Error('User is not found');
    }
});
module.exports = { authUser, getUserProfile, registerUser, updateUserProfile };
