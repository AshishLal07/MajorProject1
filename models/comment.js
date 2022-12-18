const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    // Comment belongs to user
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }

},{
    timestamps:true
});


const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;