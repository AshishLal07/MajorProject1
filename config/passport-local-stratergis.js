const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;

const User = require('../models/sign_up');

// authentication using passport

passport.use(new LocalStratergy({
         usernameField:'email',
         passReqToCallback:true
    },
    function(req,email,password,done){
    // find a user and establish authentication
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash("error",err); 
                return done(err);
            };
            if(!user || user.password != password){ 
                req.flash("error","Invalid UserName/password");
                console.log("Invalid UserName/Password"); 
                return done(null,false);
            };

            return done(null, user);
            

        })
}

));

// serializeing the user to decide which key to be used in the cookie
passport.serializeUser(function(User, done){
    done(null, User.id);
});




// serializeing the user from key in the cookie

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){ console.log("error in finding user ---> passport "); return done(err);};
        return done(null,user);
    });
});

// check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if user is signed in then pass over to next function(controller's action); and isAuthenticated is inbuilt passport function for checking;
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // request user contains the current sign in user from the session cookie and we are sending local for the views;
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;