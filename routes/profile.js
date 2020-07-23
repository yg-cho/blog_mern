const express = require("express");
const router = express.Router();


const passport = require("passport");
const checkAuth = passport.authenticate('jwt', { session: false });

const profileModel = require("../model/profile");

const validateProfileInput = require('../validation/profile');

// @route   POST http://localhost:5000/profile/
// @desc    Register profile
// @access  Private

router.post('/', checkAuth, (req, res) => {

    const {errors, isValid} = validateProfileInput(req.body);

    if (!isValid) {
        return res.json(errors);
    }

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

                profileModel
                    .findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileFields },
                        { new: true }
                    )
                    .then(profile => res.status(200).json(profile))
                    .catch(err => res.status(404).json(err));

                // return res.json({
                //     message : "already profileInfo, please update your profile"
                // });
            } else {
                new profileModel(profileFields)
                    .save()
                    .then(profile => res.status(200).json(profile))
                    .catch(err => res.status(404).json(err));
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
});



// @route   GET http://localhost:5000/profile/total
// @desc    get total profile
// @access  Private

router.get('/total', checkAuth, (req, res) => {
    profileModel
        .find()
        .populate('user', ['name', 'avatar'])
        .then(docs => {
            if(docs.length === 0){
                return res.json({
                    message: 'There are no profile'
                });
            }
            res.json({
                count: docs.length,
                users: docs
            });
        })
        .catch(err => res.json(err));
});


// @route   GET http://localhost:5000/profile/:profileId
// @desc    get detail profile
// @access  Private

router.get("/:profileId", (req, res) => {
    const id = req.params.profileId;

    profileModel
        .findById(id)
        .populate("user", ["name", "avatar"])
        .then(profile => {
            if(profile){
               return res.json({
                    message: "detail get profile",
                    profileInfo: profile
                });
            } else {
                res.json({
                    message: "no profile"
                });
            }

        })
        .catch(err => res.json(err));
});

// userId로 검색


// skills로 검색 / 지역, 상태, 학력, 커리어로 검





module.exports = router;