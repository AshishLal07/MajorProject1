const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/Avatars');

const userSchema = mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true   
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String
    },
    Friendship:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'FriendShip'
        }
    ]

},{
    timestamps:true,
});

// this if for local storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH) ); // path join would be like models/uploads/users/Avatars , __dirname(gives current directory path)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })
  
// statics method
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH

const User = mongoose.model('User',userSchema);

module.exports = User;
