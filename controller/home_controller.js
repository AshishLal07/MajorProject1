// module.exports.actionName = function(req,res){}
const Posts = require('../models/Post');
const Users = require('../models/sign_up');


module.exports.home = function(req,res){

    // populate the User document from mongodb to Post document
    Posts.find({}).
    populate('User').
    populate({
        path:'comment',
        populate:{
            path:'User'
        }
    }).
    exec(function(err,post){
        Users.find({},function(err,user){
            return res.render('home',{
                title:'Home',
                posts:post,
                all_user:user
            });
        });
    });

       
}
