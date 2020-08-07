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
                .catch(err => res.status(404).json({ postnotfound: "No found post"}));

       })
       .catch(err => res.status(500).json(err))
});


// detail get post

// update post

// @route   POST http://localhost:5000/post/like/:post_id
// @desc    Like post
// @access  Private

// test login -> get token -> find post(post id) -> like

router.post("/like/:post_id", checkAuth, (req, res) => {
   postModel
       .findById(req.params.post_id)
       .then(post => {
           console.log("post_id :"+req.params.post_id);
           if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
               return res.status(400).json({
                   message: "User already likes this post"
               });
           } else {
               post.likes.unshift({ user: req.user.id });
               post.save()
                   .then(post => res.status(200).json(post))
           }
       })
       .catch(err=> res.status(400).json({
           message: "Post_Id not found"
       }))
});


// @route   POST http://localhost:5000/post/unlike/:post_id
// @desc    unLike post
// @access  Private

router.post("/unlike/:post_id", checkAuth, (req, res) => {
   postModel
       .findById(req.params.post_id)
       .then(post => {
           if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
               return res.status(400).json({
                   message: "You have not liked this post"
               })
           } else {
                const removeIndex = post.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id);

                post.likes.splice(removeIndex,1);
                post.save()
                    .then(post => res.status(200).json(post));

           }
       })
       .catch(err => res.status(400).json({
           message: "Post_Id not found"
       }))
});

// @route   POST http://localhost:5000/post/reply/:post_id
// @desc    Add reply to post
// @access  Private

router.post("/reply/:post_id", checkAuth, (req, res) => {
   const { errors, isValid } = validatePostInput(req.body);
   if(!isValid) {
       return res.status(400).json(errors);
   }

   postModel
       .findById(req.params.post_id)
       .then(post => {
           const newReply = {
               text : req.body.text,
               name : req.body.name,
               avatar : req.user.avatar,
               user : req.user.id
           };

           post.reply.unshift(newReply);
           post
               .save()
               .then(post => {
                   res.status(200).json(post);
               })
       })
       .catch(err => res.status(404).json({
           message: "postId is not found"
       }));

});

// @route   DELETE http://localhost:5000/post/reply/:post_id/:reply_id
// @desc    delete reply from post
// @access  Private
router.delete("/reply/:post_id/:reply_id", checkAuth, (req, res) => {
    postModel
        .findById(req.params.post_id)
        .then(post => {
            console.log(post.reply);
            if(post.reply.filter(item => item._id.toString() === req.params.reply_id).length === 0) {
                return res.status(400).json({
                    message: "reply does not exist"
                });
            } else {
                const removeIndex = post.reply
                    .map(item => item._id.toString())
                    .indexOf(req.params.reply_id);

                post.reply.splice(removeIndex, 1);
                post.save().then(post => res.status(200).json(post));
            }

        })
        .catch(err => res.status(500).json({
            message: "postId is not found"
        }));
});

module.exports = router;