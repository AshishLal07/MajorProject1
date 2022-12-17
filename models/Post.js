const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        content:{
            type:String,
            required:true,
        },
        User:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        // include the array of Id's of comment on the post, it's help when we fetch all comments of single post
        comment:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"comments"
            }
        ]
    
},{
    timestamps:true
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;