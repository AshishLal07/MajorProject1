const User = require('../models/sign_up');
const signUp = require('../models/sign_up');
const fs = require('fs');
const path = require('path');


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

module.exports.update = async function(req,res){

        // if(req.user.id == req.params.id){
        //     User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err,user){
        //         return res.redirect('back');
        //     });
        // }else{
        //     return res.status(401).send('Unauthorized');
        // }
        
        if(req.user.id == req.params.id){
             
            try {
                
                let user =  await User.findById(req.params.id);
                
                User.uploadedAvatar(req,res,function(err){
                    if(err){ console.log('***Multer error: ',err)};

                    // console.log(req.file);
                    user.name = req.body.name;
                    user.email = req.body.email;
                    
                    
                    // if(req.xhr){
                    //     return res.status(200).json({
                    //         data:{
                    //             name:,
                    //         },
                    //         message:"Post created!"
                    //     });
                    // };
            

                    try {
                        fs.accessSync(path.join(__dirname,"..",user.avatar));
                        fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                    } catch (error) {
                        console.log("Error",err);
                    }
                   
                       
                    //  this is saving the path of uploaded file into avatar field in the user
                    

                    user.avatar = User.avatarPath +'/'+ req.file.filename;

                    user.save();
                    return res.redirect('back');
                })

                
            }catch (error) {
                req.flash('error',error) ;
                res.redirect('back')  ;
            }
        // 
        }else{
            req.flash('error','Unauthorize');
            return res.status(401).send('Unauthorized');
        }
}

module.exports.preview = async function(req,res){
    if(req.user.id == req.params.id){
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