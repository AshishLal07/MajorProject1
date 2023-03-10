const env = require('./envoirment');
const fs = require('fs');
const path = require('path')

module.exports = (app)=>{
    // global function in app name assetPath available via locals
    app.locals.assetPath = function(filePath){
        if(env.name == 'developer'){
            return '/'+ filePath;
        }
        
        return '/'+JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath]
    }
}