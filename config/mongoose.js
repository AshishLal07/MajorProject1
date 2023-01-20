const mongoose = require('mongoose');
const env = require('./envoirment');
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console,"Error connecting to DataBase"));

db.once('open',function(){
    console.log('connected to the DataBase :: MongoDb')
});


module.exports = db;