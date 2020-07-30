const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkAuth = passport.authenticate('jwt', { session : false });
const postModel = require("../model/post");
const profileModel = require("../model/profile");
const validatePostInput = require("../validation/post");

// @route   GET http://localhost:5000/post/total
// @desc    total Get Post
// @access  Public

router.get('/total', (req, res) => {

    postModel
        .find()
        .populate('user', ['name','avatar','email'])
        .then(docs => {
            if(docs.length === 0){
                return res.status(200).json({
                    message: "There is no post"
                });
            }
            res.status(200).json({
                count: docs.length,
                posts: docs
            });
        })
        .catch(err => res.status(500).json(err));
});



// @route   POST http://localhost:5000/post
// @desc    Create Post
// @access  Private

router.post('/', checkAuth, (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if(!isValid) {
        return res.status(404).json(errors);
    }

    const newPost = new postModel({
       user: req.user.id,
       name: req.body.name,
       avatar: req.user.avatar,
       text: req.body.text
    });
    newPost
        .save()
        .then(post => {
            res.status(200).json({
                message: "Successful new Post",
                postInfo : post
            });
        })
        .catch(err => res.status(500).json(err));

});


// @route   Delete http://localhost:5000/post/post_id
// @desc    Delete Post
// @access  Private

router.delete("/:post_id", checkAuth, (req, res) => {
    profileModel
       .findOne({user: req.user.id})
       .then(profile => {
            postModel
                .findById(req.params.post_id)
                .then(post => {
                    if(post.user.toString() !== req.user.id){
                        return res.status(401).json({
                            message: "user Not owner"
                        });
                    } else {
                        post
                            .remove()
                            .then(() => res.status(200).json({
                                message: "Deleted post"
                            }));
                    }
                })
                .catch(err => res.status(404).json({ postnotfound: "No post found"}));

       })
       .catch(err => res.status(500).json(err))
});






module.exports = router;