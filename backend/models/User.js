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

// Middleware
User.pre('save', async function (next) {
    // executed one after another
    if (!this.isModified('password')) {
        // if the pw is generated
        return next();
    }

    const salt = await bcrypt.genSalt(10); // generate pw
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', User);
