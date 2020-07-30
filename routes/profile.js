const express = require("express");
const router = express.Router();


const passport = require("passport");
const checkAuth = passport.authenticate('jwt', { session: false });

const profileModel = require("../model/profile");
const validateEducationInput = require("../validation/education");
const validateExperienceInput = require("../validation/experience");
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


// skills로 검색 / 지역, 상태, 학력, 커리어


// @route   POST  http://localhost:5000/profile/edu
// @desc    Add education to profile
// @access  Private
router.post("/edu", checkAuth, (req, res) =>{
   const {errors, isValid} = validateEducationInput(req.body)
   if(!isValid) {
       return res.status(400).json(errors);
   }
    profileModel
       .findOne({user: req.user.id})
       .then(profile => {
           if(!profile) {
               errors.message = "There is no profile. Please register profile"
               return res.status(400).json(errors);
           } else {
               const newEdu = {
                   school: req.body.school,
                   degree: req.body.degree,
                   fieldofstudy: req.body.fieldofstudy,
                   from: req.body.from,
                   to: req.body.to,
                   current: req.body.current,
                   description: req.body.description
               }
               profile.education.unshift(newEdu);
               profile
                   .save()
                   .then(edu => {
                       res.status(200).json(edu)
                   })
                   .catch(err => res.status(404).json(err));
           }
       })
       .catch(err => res.status(500).json(err));
});


// @route   POST  http://localhost:5000/profile/ex
// @desc    Add experience to profile
// @access  Private
router.post("/ex", checkAuth, (req, res)=> {
    const { errors, isValid } = validateExperienceInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }
   profileModel
       .findOne({user: req.user.id})
       .then(profile => {
           if(!profile) {
               errors.message = "There is no profile. Please register profile"
               return res.status(400).json(errors);
           } else {
               console.log(profile);
               const newEx = {
                   title: req.body.title,
                   company: req.body.company,
                   location: req.body.location,
                   from: req.body.from,
                   to: req.body.to,
                   current: req.body.current,
                   description: req.body.description
               }
               profile.experience.unshift(newEx);
               profile
                   .save()
                   .then(ex => {
                       res.status(200).json(ex);
                   })
                   .catch(err => res.status(404).json(err))
           }
       })
       .catch(err => res.status(500).json(err))
});

// @route DELETE http://localhost:5000/profile/ex/:exp_id
// // @desc    Delete experience from profile
// // @access  Private
router.delete("/ex/:exp_id", checkAuth, (req, res) => {
   profileModel
       .findOne({user: req.user.id})
       .then(profile => {
           if(!profile){
               return res.status(500).json({
                   message: "There is no profile"
               });
           } else {
               console.log(profile.experience);
               const removeIndex = profile.experience
                   .map(item => item._id)
                   .indexOf(req.params.exp_id);

               profile.experience.splice(removeIndex, 1);

               profile
                   .save()
                   .then(profile => res.status(200).json(profile))
                   .catch(err => res.status(404).json(err));
           }
       })
       .catch(err => res.status(500).json(err));
});



// @route DELETE http://localhost:5000/profile/edu/:edu_id
// // @desc    Delete education from profile
// // @access  Private

router.delete("/edu/:edu_id", checkAuth, (req, res) => {
   profileModel
       .findOne({user : req.user.id})
       .then(profile => {
           if(!profile) {
               return res.status(404).json({
                   message: "There is no profile"
               });
           } else {
               const removeIndex = profile.education
                   .map(item => item._id)
                   .indexOf(req.params.edu_id);

               profile.education.splice(removeIndex, 1);
               profile
                   .save()
                   .then(profile => res.status(200).json(profile))
                   .catch(err => res.status(404).json(err));
           }
       })
       .catch(err => res.status(500).json(err))
});

// @route   DELETE http://localhost:5000/profile
// @desc    Delete profile
// @access  Private

router.delete('/', checkAuth, (req, res) => {
    profileModel
        .findOneAndRemove({user: req.user.id})
        .then(profile => {
            if(!profile){
                return res.status(404).json({
                    message: "There is no profile"
                });
            } else {
                res.status(200).json({
                    message: "Successful deleted profile"
                });
            }

        })
        .catch(err => res.status(500).json(err));
});


module.exports = router;