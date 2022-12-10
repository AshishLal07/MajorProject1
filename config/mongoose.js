const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console,"Error connecting to DataBase"));

db.once('open',function(){
    console.log('connected to the DataBase :: MongoDb')
});


module.exports = db;