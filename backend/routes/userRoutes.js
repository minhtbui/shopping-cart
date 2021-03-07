const express = require('express');
const router = express.Router();
const {
    authUser,
    getUserProfile,
    registerUser,
} = require('../controllers/userController');
const protectUser = require('../middlewares/authMiddleware');

/*
 * Users Register
 * [POST] api/users/
 * Private
 */
router.route('/').post(registerUser);

/*
 * Users Login
 * [POST] api/users/login
 * Private
 */
router.post('/login', authUser);

/*
 * Users Profile
 * [GET] api/users/profile
 * Public
 */
router.route('/profile').get(protectUser, getUserProfile);

module.exports = router;
