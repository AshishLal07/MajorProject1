const express = require('express');
const env = require('./config/envoirment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
console.log(env.name);
require('./config/views_helper')(app);
const port = 8000;
const expresslayout = require('express-ejs-layouts');
const mongoose  = require('mongoose');


const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergis');
const passportJWT = require('./config/passport-jwt-stratergies');
const passportGoogle = require('./config/passport-google-oauth2-stratergy');


const { Store } = require('express-session');
const MongoStore = require('connect-mongo');
const sassMiddleware = require("node-sass-middleware");
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').createServer(app);

const chatSockets = require('./config/chat_socket').chatSockets(chatServer)
chatServer.listen(5000,function(){
    console.log('chat server is listening on port 5000')
});
const path = require('path');
const { getLogger } = require('nodemailer/lib/shared');


// setting up for sass directory to store and convert to css
if(env.name == 'development'){
    app.use(sassMiddleware({
        src:  path.join(__dirname,env.asset_path,'scss'),
        dest:  path.join(__dirname,env.asset_path,'css'),
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }));
}


// new version of connect-mongo to store database of mongodb
const clientP = mongoose.connect(
    'mongodb://localhost/project_development',
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(m => m.connection.getClient());


app.use(express.urlencoded());
app.use(cookieParser());
//  we put expresslayout earlier to tell every route to follow this layout
app.use(expresslayout);

// extract style and script from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// for adding static files like css and js
app.use(express.static(env.asset_path));


app.use(logger(env.morgan.mode, env.morgan.options))

// make uploads folder avilable to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store the ssession cookie into the database
app.use(session({
    name:'MajorProject',
    // to do change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10),
    },
    store:MongoStore.create({
       clientPromise: clientP,
       dbName: "project_development",
       stringify: false,
       autoRemove:'disabled'
     },function(err){
        console.log(err || "connect-mongo setup");
     })
    
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setflash);
// app use express router
app.use('/',require('./routes'))



app.listen(port,function(err){
    if(err){
        console.log(`Error in running a server: ${err}`); 
        return;
    }
    console.log(`Server is running on port: ${port}`)
})