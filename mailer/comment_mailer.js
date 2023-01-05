const nodemailer = require('../config/nodemailer');

// another way of exporthing method

exports.newComment = (comment)=>{
    console.log('new comment mailer',comment);
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comment/new_comment.ejs')
    nodemailer.transport.sendMail({
        from:'ashishc899@gmail.com',
        to:comment.User.email,
        subject:"New comment publish",
        html:htmlString
    },(err,info)=>{
        if(err){console.log('error while sending mail',err); return;}
        console.log("Message Sent",info);
        return;
    })
}