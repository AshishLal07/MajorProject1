module.exports.index = function(req,res){
    
    return res.json(200,{
        messsage:"list of Posts",
        posts:[]
    });
}