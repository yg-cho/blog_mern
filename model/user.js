

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");



const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
    },
    {
        timestamps: true
    }
);
//middleware
userSchema.pre("save", async function (next) {
    try {
        console.log("entered");

        const avatar = await gravatar.url(this.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        this.avatar = avatar;

        //Generate a salt
        const salt = await bcrypt.genSalt(10);

        //Generate a password hash
        const passwordHash = await bcrypt.hash(this.password, salt);

        this.password = passwordHash;
        console.log("exited");
        next();

    } catch (error) {
        next(error)
    }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch);
    });

}








module.exports = mongoose.model("user", userSchema);