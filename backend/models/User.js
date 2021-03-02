const mongoose = require('mongoose');

const User = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, reiqored: true, default: false },
    },
    {
        timestamp: true,
    },
);

module.exports = mongoose.model('User', User);
