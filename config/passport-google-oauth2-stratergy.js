const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/sign_up')

// tell passport to use google strategy for google login
passport.use(new googleStrategy({
        clientID:'114761697927-iha4l3oolbhjcnma3paefn1sveb7lks1.apps.googleusercontent.com',
        clientSecret:'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',
        callbackURL:'http://localhost:8000/user/auth/google/callback'
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


