const express = require("express");
const router = express.Router();


const passport = require("passport");
const checkAuth = passport.authenticate('jwt', { session: false });

const {
    register_profile,
    total_profile,
    get_one_profile,
    get_userId_profile,
    add_edu_profile,
    add_exp_profile,
    delete_exp,
    delete_edu,
    delete_profile

} = require('../controller/profile');


// @route   POST http://localhost:5000/profile/
// @desc    Register profile
// @access  Private

router.post('/', checkAuth, register_profile);



// @route   GET http://localhost:5000/profile/total
// @desc    get total profile
// @access  Private

router.get('/total', checkAuth, total_profile);


// @route   GET http://localhost:5000/profile/:profileId
// @desc    get detail profile
// @access  Private
router.get("/:profileId", get_one_profile);

// userId로 검색
router.get("/:userId", checkAuth, get_userId_profile);


// skills로 검색 / 지역, 상태, 학력, 커리어


// @route   POST  http://localhost:5000/profile/edu
// @desc    Add education to profile
// @access  Private
router.post("/edu", checkAuth, add_edu_profile);


// @route   POST  http://localhost:5000/profile/ex
// @desc    Add experience to profile
// @access  Private
router.post("/ex", checkAuth, add_exp_profile);

// @route DELETE http://localhost:5000/profile/ex/:exp_id
// // @desc    Delete experience from profile
// // @access  Private
router.delete("/ex/:exp_id", checkAuth, delete_exp);



// @route DELETE http://localhost:5000/profile/edu/:edu_id
// // @desc    Delete education from profile
// // @access  Private
router.delete("/edu/:edu_id", checkAuth, delete_edu);

// @route   DELETE http://localhost:5000/profile
// @desc    Delete profile
// @access  Private
router.delete('/', checkAuth, delete_profile);


module.exports = router;