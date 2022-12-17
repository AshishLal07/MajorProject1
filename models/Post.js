const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        content:{
            type:String,
            required:true,
        },
        User:{
            type: mongoose.Schema.Types.ObjectId,
            refe: "User"
        }
    
},{
    timestamps:true
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;