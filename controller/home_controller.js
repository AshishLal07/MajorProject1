// module.exports.actionName = function(req,res){}
const Posts = require('../models/Post');
const Users = require('../models/sign_up');
const FriendShip = require('../models/Friendship');

// module.exports.home = function(req,res){

//     // populate the User document from mongodb to Post document
//     Posts.find({}).
//     populate('User').
//     populate({
//         path:'comment',
//         populate:{
//             path:'User'
//         }
//     }).
//     exec(function(err,post){
//         Users.find({},function(err,user){
//             return res.render('home',{
//                 title:'Home',
//                 posts:post,
//                 all_user:user
//             });
//         });
//     });

       
// }

module.exports.home = async function(req,res){

    try{
        
        let posts = await Posts.find({}).
        sort("-createdAt").
        populate('User').
        populate({
            path:'comment',
            populate:{
                path:"User"
            },
            populate:{
                path:'Like'
            }
        }).populate('Like');

        
        let users = await Users.find({});
        let friendship = await FriendShip.find({});
      
        return res.render('home',{
            title:'Home',
            posts:posts,
            all_user:users,
            friendship:friendship,
            curr_user: req.user
        });

    }catch(err){
        console.log("Error",err);
        return;
    }

    

};