const signUp = require('../models/sign_up');


module.exports.profile = function(req, res){
    // console.log(req.user);
    return res.render('profile',{
        User: req.user,
        title:"profile-page"
    })
}
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/user/profile');
    }
    return res.render('user',{
        title:'User profile'
    })
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/user/profile');
    }
    return res.render('signUp',{
        title:'Sign-up',
    })
}



module.exports.create = function(req,res){
        if(req.body.password != req.body.confirmpassword){
            res.redirect('back');
        };
        signUp.findOne({email: req.body.email}, function(err,user){
            if(err){ console.log('error while finding a user account'); return;}
            if(!user){
                signUp.create(req.body, function(err, newUser){
                    if(err){console.log("error while creating a user account"); return;}
                    return res.redirect('./sign-in');
                })
            }else{
                return res.redirect('back');
            }
        });

}

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

// signout function and logout is inbuilt passport function 
module.exports.destroySession = function(req,res){
    req.logOut(function(err){
        if(err){console.log('Error while signing out'); return;}
        return res.redirect('/');
    });
    
}

// signUp.create({
    // email: req.body.email,
    // name: req.body.name,
    // Password: req.body.password
// },function(err,newAccount){
    // if(err){ console.log("error while creating account, please try again"); return;};
    // console.log(newAccount);
    // return res.redirect("back");
// });