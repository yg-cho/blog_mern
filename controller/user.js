const jwt = require("jsonwebtoken");
const userModel = require("../model/user");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");



function tokenGenerator(payload) {
    return jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {expiresIn: 36000 }
    );
}


exports.register_user = (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    const { name, email, password } = req.body;

    // checkValidation
    if (!isValid) {
        return res.json(errors);
    }
    userModel
        .findOne({ email })
        .then(user => {
            if(user) {
                errors.email = "email already used";
                return res.json(errors);


                // return res.json({
                //    message : "email already used"
                // });
            } else {
                const newUser = new userModel({
                    name,
                    email,
                    password
                });
                newUser
                    .save()
                    .then(user => {
                        res.json({
                            msg: "Successful newUser",
                            userInfo : user,
                        });
                    })
                    .catch(err => res.json(err));
            }

        })
        .catch(err => {
            res.json({
                error : err.message
            });
        });
};

exports.login_user =  (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);
    const {email, password} = req.body;

    // checkValidation
    if(!isValid){
        return res.status(400).json(errors);
    }

    userModel
        .findOne({ email })
        .then(user => {
            if(!user) {

                errors.email = "email not found";
                return res.status(404).json(errors);

                // return res.json({
                //     message: "email not found"
                // });
            } else {
                user.comparePassword(password, (err, isMatch) => {
                    if(err || isMatch === false) {
                        errors.password = "password incorrect";
                        return res.status(404).json(errors);
                        // return res.json({
                        //     message: "password incorrect"
                        // });
                    } else {
                        // token return
                        const payload = {
                            id: user._id,
                            name: user.name,
                            avatar: user.avatar
                        };
                        res.json({
                            success: isMatch,
                            token: "Bearer " + tokenGenerator(payload)
                        });
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err.message
            });
        });
};

exports.current_user = (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        avatar: req.user.avatar
    });
};