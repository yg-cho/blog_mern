const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

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
                const avatar = gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });

                const newUser = new userModel({
                    name,
                    email,
                    avatar,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;

                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => res.json(err));
                    })
                })
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