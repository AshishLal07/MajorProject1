const Post = require('../models/Post')

module.exports.post = function(req,res){
   
    Post.create({
        content:req.body.content,
        User:res.locals.user._id,
    },function(err,user){
        if(err){console.log("error while adding to MongoDB"); return;};
        return res.redirect('/');

    });
   
}

// module.exports.add = function(req,res){
//     res.render('home',{
//         post:Post
//     })
// }