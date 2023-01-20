const passport = require('passport');
const JWTStratergy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./envoirment');

const User = require('../models/sign_up');

var opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret_key ,
}

passport.use(new JWTStratergy(opts, function(JwtPayload,done){
        User.findById(JwtPayload._id,function(err,user){
            if(err){console.log('Error',err); return;}

            if(user){
                return done(null,user)
            }else{
                return done(null,false)
            }
        })
}));

module.exports = passport;