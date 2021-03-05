const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

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

module.exports = { authUser, getUserProfile };
