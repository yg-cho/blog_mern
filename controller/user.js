const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const userModel = require("../model/user");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

sgMail.setApiKey(process.env.MAIL_KEY || "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")


function tokenGenerator(payload, key, time) {
    return jwt.sign(
        payload,
        key,
        {expiresIn: time }
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
                // const token = jwt.sign(
                //     { name, email, password },
                //     process.env.JWT_ACCOUNT_ACTIIVATION,
                //     { expiresIn : '10m'}
                // )

                const token = tokenGenerator({ name, email, password }, process.env.JWT_ACCOUNT_ACTIIVATION || "ygcho", "5m");

                const emailData = {
                    from: process.env.EMAIL_FROM || "cyg4484@gmail.com",
                    to: email,
                    subject: 'Account activation link',
                    html: `
                    <h1>Please use the following to activate your account</h1>
                    <p>${process.env.CLIENT_URL || "http://localhost:3000"}/users/activate/${token}</p>
                    <hr />
                    <p>This email may containe sensetive information</p>
                    <p>${process.env.CLIENT_URL || "http://localhost:3000"}</p>
                    `
                };
                sgMail
                    .send(emailData)
                    .then(sent => {
                        return res.status(200).json({
                            message: `Email has been sent to ${email}`
                        })
                    })
                    .catch(err => {
                        return res.status(400).json({
                            success: false,
                            error: err
                        });
                    });
                // const newUser = new userModel({
                //     name,
                //     email,
                //     password
                // });
                // newUser
                //     .save()
                //     .then(user => {
                //         res.json({
                //             msg: "Successful newUser",
                //             userInfo : user,
                //         });
                //     })
                //     .catch(err => res.json(err));
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
                            token: "Bearer " + tokenGenerator(payload, process.env.SECRET_KEY, "7d")
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

exports.activation_user = (req, res) => {
    const { token } = req.body;
    if(token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIIVATION, (err, decoded) => {
            if (err) {
                console.log('Activation error');
                return res.status(401).json({
                    errors: "Expired Link. sign up again"
                });
            } else {
                const { name, email, password } = jwt.decode(token);

                const user = new userModel({
                    name, email, password
                });
                user
                    .save()
                    .then(user => {
                        console.log(user);
                        return res.status(200).json({
                            success : true,
                            message: "Signup success",
                            userInfo: user
                        });
                    })
                    .catch(err => res.json(500).json(err));
            }
        })
    }
};