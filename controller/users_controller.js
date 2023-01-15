const User = require('../models/sign_up');
const signUp = require('../models/sign_up');
const Reset = require('../models/reset_password');
const FriendShip = require('../models/Friendship');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const resetPasswordWorker = require('../Worker/reset_password_worker')
const queue = require('../config/kue');
const resetMailer = require('../mailer/reset_mailer');


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

module.exports.resetPassword = async function(req,res){
    return res.render('reset',{
        title:"Reset password"
    });
}
module.exports.createToken = async function(req,res){

    try {
        let user = await User.findOne({email:req.body.email});
        if(user){
            // user = await user.populate('User','name email');
            accessToken = crypto.randomBytes(20).toString('hex');
            let reset = await Reset.create({
                accessToken: accessToken,
                isValid:true,
                User: user,
            });
            console.log(reset);
            return res.redirect(`/user/reset_password/${reset.accessToken}`);
// add a mailer to the page
            //  let job = queue.create('emails',reset).save(function(err){
            //     if(err){
            //         console.log("error while adding to queue", err); return;
            //     }
            //         console.log("job enqueued",job.id)           
            //     });
            //     req.flash("success","Email sent to your email address");
           
        }
        return res.redirect(`back`);

    } catch (error) {
        console.log('Error while creating a accessToken ',error);
    }
   

}
module.exports.resetVerification = async function(req,res){
    try{
        console.log(req.params.accessToken)
    let reset = await Reset.findOne({accessToken:req.params.accessToken});
    console.log(reset);
    if(reset){
        
        if(reset.isValid){
            reset.isValid=false;
            reset.save();
            return res.render('new_password',{
                title:'resetPassword',
                reset:reset
            })
            
        }else{
            return res.redirect('/');
        }
    }

    }catch(err){
        console.log("Error while reset password",err);
        return;
    }
   
}

module.exports.changePassword = async function(req,res){

    try {
        if(req.body.newpassword == req.body.confirmpassword){
            let token = await Reset.findOne({accessToken:req.params.accessToken});
            if(token){
                let chngUser = await User.findById(token.User._id);
                chngUser.password = req.body.newpassword;
                chngUser.save();
                req.flash('success',"Password change succesfully");
                return res.redirect('/');
            }
        }else{
            return res.redirect('back');
        }
    } catch (error) {
        
        console.log('Error while changing password', error);
    }

        
}

module.exports.addFreind = async function(req,res){

    // /addFriend/:freindId
    console.log(req.user);
    try {

        if(req.user){
            let existingFriend = await FriendShip.findOne({
                from_user:req.user.id,
                to_user:req.params.friendId
            });
            // console.log(user);
            if(!existingFriend){
                
                let userFriend = await FriendShip.create({
                    from_user: req.user.id,
                    to_user:req.params.friendId
                });
                console.log(userFriend);
                req.user.Friendship.push(userFriend._id);
                req.user.save();
                
            }
            req.flash('success','Succesfully added to your friendlist')
            return res.redirect('/');
            
            
        }
        
    } catch (error) {
        console.log("error while loading the friends",error);
    }
   
    
}

module.exports.removeFriend = async function(req,res){
    try {

        let user = await User.findById(req.user.id);
        // console.log(user,req.params.friendShipId);
        if(user){
            
            user.Friendship.pull(req.params.friendShipId);
            user.save()
    
            await FriendShip.deleteOne({_id:req.params.friendShipId});
        }
        return res.redirect('/')
        
    } catch (error) {
        console.log("error while removing the friends",error);
    }
   

}


// module.exports.preview = async function(req,res){
//     if(req.user.id == req.params.id){
//     }
// }

// signUp.create({
    // email: req.body.email,
    // name: req.body.name,
    // Password: req.body.password
// },function(err,newAccount){
    // if(err){ console.log("error while creating account, please try again"); return;};
    // console.log(newAccount);
    // return res.redirect("back");
// });