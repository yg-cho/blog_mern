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
                bcrypt.hash(password, 10, (err, hash) => {
                    if(err){
                        return res.json({
                            error: err
                        });
                    } else {
                       const avatar = gravatar.url(email, {
                            s: '200',
                            r: 'pg',
                            d: 'mm'
                        });

                        const user = new userModel({
                            name,
                            email,
                            avatar,
                            password : hash
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
                    }
                });
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