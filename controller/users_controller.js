const User = require('../models/sign_up');
const signUp = require('../models/sign_up');

module.exports.profile = function(req, res){
    signUp.findById(req.params.id,function(err,user){
        return res.render('profile',{
            title:"profile-page",
            profile_user: user
        })
    })
    // console.log(req.user);
   
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
    req.flash("success","Logged in Successfully")
    return res.redirect('/');
}

// signout function and logout is inbuilt passport function 
module.exports.destroySession = function(req,res){
    req.logOut(function(err){
        if(err){console.log('Error while signing out'); return;}
        req.flash("success","You have logged out");
        return res.redirect('/');
    });
    
}

module.exports.update = function(req,res){
        if(req.user.id == req.params.id){
            User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err,user){
                return res.redirect('back');
            });
        }else{
            return res.status(401).send('Unauthorized');
        }
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