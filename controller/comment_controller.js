const Comments = require('../models/comment');
const Post = require('../models/Post');

module.exports.comment = function(req,res){
        // const PostId = req.query.id;
        Post.findById(req.body.post,function(err,post){
            if(post){
                Comments.create({
                    content: req.body.content,
                    User: res.locals.user._id,
                    Post: req.body.post
                 },function(err,comment){
                    if(err){console.log("error while adding comment to the database"); return;}
                    post.comment.push(comment);
                    post.save();
                    res.redirect('/');
                })
            }
        })
       
}