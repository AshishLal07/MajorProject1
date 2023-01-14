const mongoose = require('mongoose');


const likeSchema =  new mongoose.Schema({
        User:{
            type: mongoose.Schema.ObjectId,

        },
        // this defines the object Id of liked object
        likeable:{
            type:mongoose.Schema.ObjectId,
            require:true,
            refPath:"onModel",
        },
        // this field is used for defining the type of like object because it's dynamic reference
        onModel:{
            type:String,
            require:true,
            enum:['comment','Post'],
        }
},{
    timestamps: true,
}
);

const Like = mongoose.model("Like",likeSchema);
module.exports = Like;