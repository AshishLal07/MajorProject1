const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./envoirment');

// this transport is used for linking gmail to send email
const transporter = nodemailer.createTransport( env.smtp );

//  this is to fetch html template from views and send to client 
let renderTemplate = (data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer', relativePath),
        data,
        function(err,template){
            if(err){console.log("error while rendering Html ",err); return;}
            mailHtml = template;
        }
    )
    return mailHtml;
}

module.exports = {
    transport: transporter,
    renderTemplate: renderTemplate,
}