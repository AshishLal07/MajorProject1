module.exports.profile = function(req, res){

    return res.end('<h1>User profile</h1>')
}
module.exports.name = function(req,res){
    return res.end('<h1>Your name in this page</h1>')
}