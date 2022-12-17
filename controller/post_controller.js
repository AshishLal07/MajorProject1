const Post = require('../models/Post')

module.exports.post = function(req,res){
   
    Post.create({
        content:req.body.content,
        User:res.locals.user.id,
    },function(err,user){
        if(err){console.log("error while adding to MongoDB"); return;};
        return res.redirect('/');

    });
   
}