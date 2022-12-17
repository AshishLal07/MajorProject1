// module.exports.actionName = function(req,res){}
const Posts = require('../models/Post');


module.exports.home = function(req,res){
    // console.log(req.cookies); 
    // res.cookie('user_id','25');
    // return res.render('home',{
    //             title:'Home',
            
    //         })
    
    
    // Posts.find({},function(err,post){
    //     if(err){
    //         console.log("error while fetching the data");
    //         return;
    //     }
    //     return res.render('home',{
    //         title:'Home',
    //         post_list:post,
    //         Users_list:Users
    //     })

    // })

    // populate the User document from mongodb to Post document
    Posts.find({}).populate('User').exec(function(err,post){
        
        return res.render('home',{
                    title:'Home',
                    post_list:post,
                });
    });

       
}





