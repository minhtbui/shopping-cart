const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, reiqored: true, default: false },
    },
    {
        timestamps: true,
    },
);

// Instance methods
User.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', User);
