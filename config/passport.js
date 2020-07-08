const {
    Strategy,
    ExtractJwt
} = require("passport-jwt");

const userModel = require("../model/user");


//token , 시크릿 키 담을 공간
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            userModel
                .findById(payload.id)
                .then(user => {
                    if(user) {
                        return done(null, user);
                    }
                    done(null, false);
                })
                .catch(err => console.log(err));
        })
    )
}
