const express = require("express");
const router = express.Router();

const userModel = require("../model/user");


// @route   POST http://localhost:5000/users/register
// @desc    Register User
// @access  Public
router.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    userModel
        .findOne({ email })
        .then(user => {
            if(user) {
                return res.json({
                   message : "email already used"
                });
            } else {
                const newUser = new userModel({
                    name,
                    email,
                    password
                });
                newUser
                    .save()
                    .then(user => {
                        res.json({
                            msg: "Successful newUser",
                            userInfo : user,
                        });
                    })
                    .catch(err => res.json(err));
            }

        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
});



// @route   POST http://localhost:5000/users/login
// @desc    Logged User
// @access  Public
router.post("/login", (req, res) => {

});















module.exports = router;