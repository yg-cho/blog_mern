const express = require("express");
const router = express.Router();
const passport = require("passport");
const checkAuth = passport.authenticate('jwt', { session: false});
const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const _ = require("lodash");
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


// @route   PUT http://localhost:5000/users/forgotpassword
// @desc    Forgot password / send email
// @access  Private
router.put("/forgotpassword", (req, res) => {
   const { email } = req.body;
   userModel
       .findOne({email})
       .then(user => {
           const token = jwt.sign(
               { _id: user._id},
               process.env.JWT_RESET_PASSWORD || "ygcho",
               { expiresIn: '30m'}
           );
           const emailData = {
               from: process.env.EMAIL_FROM || "cyg4484@gmail.com",
               to: email,
               subject: `Password Reset Link`,
               html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p>${process.env.CLIENT_URL || "http://localhost:3000"}/users/password/reset/${token}</p>
                    <hr/>
                    <p>This email may contain sensitive information</p>
                    <p>${process.env.CLIENT_URL || "http://localhost:3000"}</p>
               `
           };
           console.log(user);
           return user
               .updateOne( { resetPasswordLink: token }, (err, success) => {
                   if (err) {
                       return res.status(400).json({
                           error: 'Database connection error on user password forgot request'
                       });
                   } else {
                       sgMail
                           .send(emailData)
                           .then(() => {
                               return res.status(200).json({
                                   message : `Email has been sent to ${email}. Follow the instruction to activate your account`
                               })
                           })
                           .catch(err => res.status(400).json({
                               message: err.message
                           }));
                   }
               })
       })
       .catch(err => res.status(500).json(err));
});


// @route   PUT http://localhost:5000/users/resetpassword
// @desc    reset password
// @access  Private
router.put("/resetpassword", (req, res) => {
   const { resetPasswordLink, newPassword } = req.body;
   if (resetPasswordLink) {
       jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD || "ygcho", (err, decoded) => {
           if(err) {
               return res.status(400).json({
                   error: 'Expired link. Try again'
               });
           } else {
               userModel
                   .findOne({resetPasswordLink})
                   .then(user => {
                       const updatedFields = {
                           password: newPassword,
                           resetPasswordLink: ''
                       };

                       user = _.extend(user, updatedFields);
                       console.log(user);
                       user
                           .save((err, result) => {
                               if (err) {
                                   return res.status(400).json({
                                       error: 'Error resetting user password'
                                   });
                               }
                               res.status(200).json({
                                   message: `Great! Now you can login with your new password`
                               });
                           });

                       // user
                       //     .save()
                       //     .then(() => {
                       //         res.status(200).json({
                       //             message :'Great! Now you can login with your new password'
                       //         });
                       //     })
                       //     .catch(err => res.status(400).json({
                       //         error: 'Error resetting user password'
                       //     }));
                   })
                   .catch(err => res.status(500).json({
                       err : err.message
                   }));
           }
       })
   }
});



module.exports = router;