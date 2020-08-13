const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkAuth = passport.authenticate('jwt', { session : false });


const {
    total_get_post,
    create_post,
    delete_post,
    post_like,
    post_unlike,
    reply_post,
    delete_reply
} = require("../controller/post");



// @route   GET http://localhost:5000/post/total
// @desc    total Get Post
// @access  Public
router.get('/total', total_get_post);



// @route   POST http://localhost:5000/post
// @desc    Create Post
// @access  Private

router.post('/', checkAuth, create_post);


// @route   Delete http://localhost:5000/post/post_id
// @desc    Delete Post
// @access  Private

router.delete("/:post_id", checkAuth, delete_post);


// detail get post

// update post

// @route   POST http://localhost:5000/post/like/:post_id
// @desc    Like post
// @access  Private

// test login -> get token -> find post(post id) -> like

router.post("/like/:post_id", checkAuth, post_like);


// @route   POST http://localhost:5000/post/unlike/:post_id
// @desc    unLike post
// @access  Private

router.post("/unlike/:post_id", checkAuth, post_unlike);

// @route   POST http://localhost:5000/post/reply/:post_id
// @desc    Add reply to post
// @access  Private

router.post("/reply/:post_id", checkAuth, reply_post);

// @route   DELETE http://localhost:5000/post/reply/:post_id/:reply_id
// @desc    delete reply from post
// @access  Private
router.delete("/reply/:post_id/:reply_id", checkAuth, delete_reply);

module.exports = router;