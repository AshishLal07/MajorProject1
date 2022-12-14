const mongoose = require('mongoose');

const signinSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
})

const Signin = mongoose.model('Signin',signinSchema);

module.exports = Signin;