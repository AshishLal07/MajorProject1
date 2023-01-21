const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logerDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logerDirectory) || fs.mkdirSync(logerDirectory);

// rotating file stream creating new logger after every 1 day
const accessLogStream = rfs.createStream('access.log',{
    interval:'1d',
    path:logerDirectory
})

const development = {
    name: 'developer',
    asset_path: './assets',
    session_cookie_key: 'something',
    db:'project_development',
    smtp:{
        service:'gmail',
        host: 'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:"ashishc899@gmail.com",
            pass:"cytfnzwbboesujff"
        }
    },
    google_clientID:'114761697927-iha4l3oolbhjcnma3paefn1sveb7lks1.apps.googleusercontent.com',
    google_clientSecret:'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',
    google_callbackURL:'http://localhost:8000/user/auth/google/callback',
    jwt_secret_key: "MajorProject",
    morgan:{
        mode:'dev',
        options:{stream : accessLogStream}

    }
}

const production = {
    name:'production',
    asset_path: process.env.PROJECT_ASSET_PATH,
    session_cookie_key: process.env.PROJECT_SESSION_COOKIE,
    db:process.env.PROJECT_DB,
    smtp:{
        service:'gmail',
        host: 'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.PROJECT_GMAIIL_USERNAME,
            pass:process.env.PROJECT_GMAIIL_PASSWORD,
        }
    },
    google_clientID:process.env.PROJECT_GOOGLE_CLIENT_ID,
    google_clientSecret:process.env.PROJECT_GOOGLE_CLIENT_SECRET,
    google_callbackURL:process.env.PROJECT_GOOGLE_CALLBACK_URL,
    jwt_secret_key: process.env.PROJECT_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream : accessLogStream}

    }
}

// module.exports = eval(process.env.PROJECT_ENVOIRMENT == undefined ? development : eval(process.env.PROJECT_ENVOIRMENT));
module.exports = development