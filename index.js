const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expresslayout = require('express-ejs-layouts');
const mongoose  = require('mongoose');


const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergis');
const { Store } = require('express-session');
const MongoStore = require('connect-mongo');

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
app.use(express.static('./assets'));


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store the session cookie into the database
app.use(session({
    name:'MajorProject',
    // to do change the secret before deployment in production mode
    secret: 'something',
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
// app use express router
app.use('/',require('./routes'))



app.listen(port,function(err){
    if(err){
        console.log(`Error in running a server: ${err}`); 
        return;
    }
    console.log(`Server is running on port: ${port}`)
})