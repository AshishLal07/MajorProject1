const Comments = require('../models/comment');
const Post = require('../models/Post');
const comentsMailer = require('../mailer/comment_mailer');
const Queue = require('../config/kue');
const commentEmailWorker = require('../Worker/comment_email_worker');


module.exports.comment = async function(req,res){
        // const PostId = req.query.id;
        try{
            let post = await Post.findById(req.body.post);
            if(post){
                let comments = await Comments.create({
                    content:req.body.content,
                    User:res.locals.user._id,
                    Post: req.body.post
                });
                if(comments){
                    post.comment.unshift(comments);
                    post.save();
                }
                
                comments = await comments.populate('User','name email');
               
                // comentsMailer.newComment(comments)
                
                let job = Queue.create('emails',comments).save(function(err){
                    if(err){
                        console.log("error while adding to queue", err); return;
                    }
                    console.log("job enqueued",job.id)
                   
                });

                req.flash("success","Comment is added!");
                
                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment : comments,
                            name: res.locals.user.name,
                        },
                        message:'Post uploaded'
                    })
                }
               
            }
          return res.redirect('/');

        }catch(error){
            req.flash("error",error)
            console.log("Error",error);
            return res.redirect('/');
        }

       
       
}

module.exports.destroy = async function(req,res){
    try {

        let comment = await Comments.findById(req.params.id);

        if(comment.User == req.user.id){
            let PostId = comment.Post;
            comment.remove();
            req.flash("success","Comment removed!");
            let post = await Post.findByIdAndUpdate(req.params.id,{$pull: {comment:req.params.id}});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.params.id
                    },
                    message:"Comment delete"
                    
                })
            }
        }
        return res.redirect('/') ;

    } catch (error) {
        req.flash("error",error)
        console.log("Error",error);
        return res.redirect('/') ;
    }
  
   
}

// Less neater version of destroying comment

// module.exports.destroy1 = async function(req,res){
//   Comments.findById(req.params.id, function(err,comment){
    // if(comme  Comments.findById(req.params.id, function(err,comment){nt.User == req.user.id){
//         let postId = comment.Post;
//         comment.remove();
//         Post.findByIdAndUpdate(postId,{ $pull : {comment:req.params.id}},function(err,post){
          
//             return res.redirect('/') 
//         });
//     }else{
//         res.redirect('/')
//     }
// })
// }
// Less neater version for creating the comments

// Post.findById(req.body.post,function(err,post){
//     if(post){
//         Comments.create({
//             content: req.body.content,
//             User: res.locals.user._id,
//             Post: req.body.post
//          },function(err,comment){
//             if(err){console.log("error while adding comment to the database"); return;}
//             post.comment.push(comment);
//             post.save();
//             res.redirect('/');
//         })
//     }
// })
