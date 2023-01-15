const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    // the user who send the request
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    // the user who excepted the request, the naming jst to understand ,else user find difficult to diffrentiate
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true,
});

const FriendShip = mongoose.model('FriendShip',friendSchema);
module.exports = FriendShip;