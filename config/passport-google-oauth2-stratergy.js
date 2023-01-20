const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/sign_up');
const env = require('./envoirment');

// tell passport to use google strategy for google login
passport.use(new googleStrategy({
    clientID: env.google_clientID,
    clientSecret: env.google_clientSecret,
    callbackURL: env.google_callbackURL,
    },function(accessToken, refreshToken,profile,done){
        // find User
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log("Error in google strategy-passport ",err); return;}
            console.log(refreshToken,accessToken);
            console.log(profile);
            if(user){
                // if found set the user as req.user
                return   done(null,user);
            }else{
                // if not found create a new signup for this user because verified by google(sign-in the user)
                User.create({
                    name: profile.displayName,
                    email:profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')

                },function(err,user){
                    if(err){
                        console.log("error while creating user using google Strategy-passport",err);
                        return done(err);
                    }
                    return done(null,user)
                })
            }
        })

}));

module.exports = passport;


