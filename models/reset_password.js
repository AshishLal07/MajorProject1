const mongoose = require('mongoose');
const User = require('../models/sign_up');

const resetSchema = mongoose.Schema({

        accessToken:{ 
            type:String
        },
        isValid:{
            type:Boolean
        },
        User:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:"User"
        }
        
});

const ResetPassword = mongoose.model("ResetPassword",resetSchema);

module.exports = ResetPassword;