const express = require("express");
const router = express.Router();


const passport = require("passport");
const checkAuth = passport.authenticate('jwt', { session: false });

const profileModel = require("../model/profile");


const {
    register_profile

} = require('../controller/profile');


// @route   POST http://localhost:5000/profile/
// @desc    Register profile
// @access  Private

router.post('/', checkAuth, register_profile);



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