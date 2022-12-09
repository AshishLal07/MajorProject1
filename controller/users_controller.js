module.exports.profile = function(req, res){

    return res.end('<h1>User profile</h1>')
}
module.exports.name = function(req,res){
    return res.render('user',{
        name:'ashish',
        title:'User profile'
    })
}