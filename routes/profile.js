const express = require("express");
const router = express.Router();


const passport = require("passport");
const checkAuth = passport.authenticate('jwt', { session: false });

const profileModel = require("../model/profile");

// @route   POST http://localhost:5000/profile/
// @desc    Register profile
// @access  Private

router.post('/', checkAuth, (req, res) => {

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

    // Skills - split into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    profileModel
        .findOne({ user: req.user.id })
        .then(user => {
            if(user) {
                return res.json({
                    message : "already profileInfo, please update your profile"
                });
            }
            new profileModel(profileFields)
                .save()
                .then(profile => res.json(profile))
                .catch(err => res.json(err));

        })
        .catch(err => {
            res.json({
                error: err.message
            });
        });
});














module.exports = router;