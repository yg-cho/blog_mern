const profileModel = require('../model/profile');
const validateProfileInput = require('../validation/profile');
const validateExperienceInput = require("../validation/experience");
const validateEducationInput = require("../validation/education");

exports.register_profile = (req, res) => {

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
};

exports.total_profile = (req, res) => {
    profileModel
        .find()
        .populate('user', ['name', 'avatar'])
        .then(docs => {
            if(docs.length === 0){
                return res.status(200).json({
                    message: 'There are no profile'
                });
            }
            res.status(200).json({
                count: docs.length,
                users: docs
            });
        })
        .catch(err => res.json(err));
};

exports.get_one_profile =  (req, res) => {
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
};

exports.get_userId_profile = (req, res) => {
    const user = req.params.userId;
    profileModel
        .findOne(user)
        .then(() => {
            res.status(200).json({
                message: "find userId",
                userInfo: user
            })
        })
        .catch(err => res.status(500).json(err));
};

exports.add_edu_profile = (req, res) =>{
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
};

exports.add_exp_profile = (req, res)=> {
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
};

exports.delete_exp =  (req, res) => {
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
};

exports.delete_edu = (req, res) => {
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
};

exports.delete_profile = (req, res) => {
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
};