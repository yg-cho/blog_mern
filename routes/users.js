const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const checkAuth = passport.authenticate('jwt', { session: false});

const userModel = require("../model/user");


const {
    register_user,
    login_user,
    current_user
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
router.post("/activation", (req, res) => {
    const { token } = req.body;
    if(token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIIVATION, (err, decoded) => {
            if (err) {
                console.log('Activation error');
                return res.status(401).json({
                    errors: "Expired Link. sign up again"
                });
            } else {
                const { name, email, password } = jwt.decode(token);

                const user = new userModel({
                    name, email, password
                });
                user
                    .save()
                    .then(user => {
                        return res.status(200).json({
                            success : true,
                            message: "Signup success",
                            userInfo: user
                        });
                    })
                    .catch(err => res.json(500).json(err));
            }
        })
    }
})







module.exports = router;