const Post = require('../models/Post')
const Comment = require('../models/comment');

module.exports.post = function(req,res){
   
    Post.create({
        content:req.body.content,
        User:res.locals.user._id,
    },function(err,user){
        if(err){console.log("error while adding to MongoDB"); return;};
        return res.redirect('/');

    });
   
}

module.exports.destroy = function(req,res){
    // console.log(req.params.id,)
    Post.findById(req.params.id,function(err, post){
        if(post.User == req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},function(err){
                if(err){
                    console.log("error while deleting the post");
                }
                return res.redirect('/');
            });
          
        }else{
            return res.redirect('/');
        }
    })
}

// module.exports.add = function(req,res){
//     res.render('home',{
//         post:Post
//     })
// }