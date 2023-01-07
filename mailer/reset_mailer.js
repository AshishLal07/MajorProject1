const nodemailer = require('../config/nodemailer');

// another way of exporthing method

exports.resetPassword = (reset)=>{
    console.log('new ResetPassword mailer',reset);
    let htmlString = nodemailer.renderTemplate({reset:reset},'/resetPassword/new_password.ejs')
    nodemailer.transport.sendMail({
        from:'ashishc899@gmail.com',
        to:reset.User.email,
        subject:"New reset Accesstoken for password",
        html:htmlString
    },(err,info)=>{
        if(err){console.log('error while sending mail',err); return;}
        console.log("Message Sent",info);
        return;
    })
}