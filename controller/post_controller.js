const Post = require('../models/Post')
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.post = async function(req,res){
   try{
       let post = await Post.create({
            content:req.body.content,
            User:res.locals.user._id,
        });
        // console.log(res.locals.user);
        if(req.xhr){
            // if we want to populate just the name of the user(we'll not want to send the password in the API), this is how you do it
            post = await post.populate("User","name");
            return res.status(200).json({
                data:{
                    post:post,
                    name:res.locals.user.name
                },
                message:"Post created!"
            });
        };

    req.flash("success","Post uploaded!");
    return res.redirect('/');

   }catch(error){
    req.flash("error",error)
    console.log("Error" ,error);
    return res.redirect('/');
   }
  
   
}

module.exports.destroy = async function(req,res){
    // console.log(req.params.id,)
    try{
        let post = await Post.findById(req.params.id);
            console.log(post);
            if(post.User == req.user.id){

                await Like.deleteMany({likeable:post._id,onModel:"Post"});
                await Like.deleteMany({_id:{$in:post.comment}}) // The $in operator selects the documents where the value of a field equals any value in the specified array

                post.remove();

                await Comment.deleteMany({ Post:req.params.id});
                

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            post_id: req.params.id,
                        },
                        message:"Post delete "
                    })
                }

            }
            req.flash("success","Post removed!");
           return res.redirect('/');

    }catch(error){
        req.flash("error",error)
        console.log("Error ",error);
        return res.redirect('/');
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