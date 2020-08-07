const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = passport.authenticate('jwt', { session: false});

const {
    register_user,
    login_user,
    current_user,
    activation_user
} = require('../controller/user');


// @route   POST http://localhost:5000/users/register
// @desc    Register User
// @access  Public
router.post("/register", register_user);



// @route   POST http://localhost:5000/users/login
// @desc    Logged User
// @access  Public
router.post("/login", login_user);



// @route  GET /users/current
// @desc   Return current user
// @access private
router.get('/current', checkAuth , current_user);


// totalUser 불러오기


// @route   POST http://localhost:5000/users/activation
// @desc    Activation account / confirm email
// @access  Private
router.post("/activation", activation_user);







module.exports = router;