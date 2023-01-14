const Like = require('../models/like');
const Post = require('../models/Post');
const Comment = require('../models/comment');

module.exports.likeToggle = async function(req,res){
    try {

         // like/toogle/?id=abcd123&type="Post"
        let likeable;
        let deleted = false;

        if(req.query.type == "Post"){
                likeable = await Post.findById(req.query.id).populate("Like") ;
        }else{
                likeable = await Comment.findById(req.query.id).populate('Like');
        }

        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel:req.query.type,
            User: req.user._id,
        });

        if(existingLike){
            likeable.Like.pull(existingLike._id);
            likeable.save();

            existingLike.remove()
            deleted=true;
        }else{
            let newLike = await Like.create({
                User: req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
            
            likeable.Like.push(newLike._id);
            likeable.save();
        };

        return res.json(200,{
            message:"Request successfully",
            deleted:deleted
        })        


    } catch (error) {
        console.log(error);
        return res.json(500,{
            message:"Internal Server Error"
        });
    }
   
}




