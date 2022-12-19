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

module.exports.destroy =  function(req,res){
    Comments.findById(req.params.id, function(err,comment){
            if(comment.User == req.user.id){
                let postId = comment.Post;
                console.log(postId);
                comment.remove();
                Post.findByIdAndUpdate(postId,{ $pull : {comment:req.params.id}},function(err,post){
                  
                    return res.redirect('/') 
                });
            }else{
                res.redirect('/')
            }
    })
}

// module.exports.destroy1 = function(req,res){
//     Post.findById({id:req.query.postId},function(err,post){
//         if(req.query.id == req.user.id){

//         }
//     })
// }