const Post = require('../models/Post')
const Comment = require('../models/comment');


module.exports.post = async function(req,res){
   try{
    await Post.create({
        content:req.body.content,
        User:res.locals.user._id,
    });

    return res.redirect('/');

   }catch(error){
    console.log("Error" ,error);
   }
  
   
}

module.exports.destroy = async function(req,res){
    // console.log(req.params.id,)
    try{
        let post = await Post.findById(req.params.id);
            if(post.User == req.user.id){
            post.remove();

            let comment = await Comment.deleteMany({post:req.params.id});
            }

            res.redirect('/');

    }catch(error){
        console.log("Error ",error);
    }   
    

}

// module.exports.add = function(req,res){
//     res.render('home',{
//         post:Post
//     })
// }
// module.exports.destroy1 = async function(req,res){

//     Post.findById()
// }
// Less neater version of destroying the post
// Post.create({
//     content:req.body.content,
//     User:res.locals.user._id,
// },function(err,user){
//     if(err){console.log("error while adding to MongoDB"); return;};
//     return res.redirect('/');

// });