module.exports.profile = function(req, res){

    return res.end('<h1>User profile</h1>')
}
module.exports.signIn = function(req,res){
    return res.render('user',{
        name:'ashish',
        title:'User profile'
    })
}

module.exports.signUp = function(req,res){
    return res.render('signUp',{
        title:'Sign-up',
    })
}

const signUp = require('../models/sign_up');

module.exports.create = function(req,res){
        console.log(req.body);
        if(req.body.password != req.body.confirmpassword){
            res.redirect('back');
        };
        signUp.findOne({email: req.body.email}, function(err,user){
            if(err){ console.log('error while finding a user account'); return;}
            if(!user){
                signUp.create(req.body, function(err, newUser){
                    if(err){console.log("error while creating a user account"); return;}
                    return res.redirect('./sign-in')
                })
            }else{
                return res.redirect('back')
            }
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