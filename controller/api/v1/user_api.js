const Users = require('../../../models/sign_up');
const JWT = require('jsonwebtoken');
const env = require('../../../config/envoirment');
module.exports.createSession = async function(req,res){

    try {
        
        let user = await Users.findOne({email:req.body.email});
        if( !user || user.password != req.body.password){
            return res.json(422,{
                message:"Ivalid Username/Password"
            })
        }
        return res.json(200,{
            message:'Sign in successfull, please keep this token safe',
            data: {
                token: JWT.sign(user.toJSON(),env.jwt_secret_key,{expiresIn: '100000'})
            }
        })

    } catch (error) {
        console.log('********',error);
        return res.json(500,{
            message:"Error creating Session"
        })
    }

    
    // req.flash("success","Logged in Successfully")
    // return res.redirect('/');
}
// 