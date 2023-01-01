const Posts = require('../../../models/Post')
const Comment = require('../../../models/comment')

module.exports.index = async function(req,res){

    let posts = await Posts.find({}).
    sort("-createdAt").
    populate('User','-password'). //// for removing the Password
    populate({
        path:'comment',
        populate:{
            path:"User",
            select:'-password' // for removing the Password
        }
    });

    return res.json(200,{
        messsage:"list of Posts",
        posts:posts
    });
}

module.exports.destroy = async function(req,res){
    // console.log(req.params.id,)
    try{
        let post = await Posts.findById(req.params.id);
            console.log(post);
            if(post.user == req.user.id){
                post.remove()
                await Comment.deleteMany({ Post:req.params.id});
                return res.json(200,{
                messsage:'Post and comment associated are deleted'
           });
        }else{
            return res.json(401,{
                messsage:'Unauthorize User'
            })
        }

    }catch(error){
        console.log(error);
        return res.json(500,{
            messsage:'Internal Server Error'
        });
    }   
    

}