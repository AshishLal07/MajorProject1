const express = require('express');
const app = express();
const port = 8000;
const expresslayout = require('express-ejs-layouts');

//  we put expresslayout earlier to tell every route to follow this layout
app.use(expresslayout);

// extract style and script from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// for adding static files like css and js
app.use(express.static('./assets'));
// app use express router
app.use('/',require('./routes'))

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running a server: ${err}`); 
        return;
    }
    console.log(`Server is running on port: ${port}`)
})