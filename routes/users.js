const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const userModel = require("../model/user");


function tokenGenerator(payload) {
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {expiresIn: 36000 }
    );
}






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
    const {email, password} = req.body;
    userModel
        .findOne({ email })
        .then(user => {
            if(!user) {
                return res.json({
                    message: "email not found"
                });
            } else {
                user.comparePassword(password, (err, isMatch) => {
                    if(err || isMatch === false) {
                        return res.json({
                            message: "password incorrect"
                        });
                    } else {
                        // token return
                        const payload = {
                            id: user._id,
                            name: user.name,
                            avatar: user.avatar
                        };
                        res.json({
                            success: isMatch,
                            token: "Bearer " + tokenGenerator(payload)
                        });
                    }
                })
            }
        })
        .catch(err => {
            res.json({
                error: err.message
            });
        });
});



// @route  GET /users/current
// @desc   Return current user
// @access private
router.get('/current', (req, res) => {

});











module.exports = router;