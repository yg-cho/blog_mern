const express = require("express");
const router = express.Router();

const userModel = require("../model/user");


// @route   POST http://localhost:5000/users/register
// @desc    Register User
// @access  Public
router.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    const user = new userModel({
        name,
        email,
        password
    });

    user
        .save()
        .then(user => {
            res.json({
                message : "successful save user",
                userInfo : user
            });
        })
        .catch(err => {
            res.json({
                error: err.message
            });
        });

});



// @route   POST http://localhost:5000/users/login
// @desc    Logged User
// @access  Public
router.post("/login", (req, res) => {

});















module.exports = router;