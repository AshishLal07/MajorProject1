const express = require('express');

const router = express.Router();
const homeController = require("../controller/home_controller");


// this will work as controller action from routes
// router are url paths which acquier controller action in masterfile when we follow url path
router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/comment', require('./comment'));

// for any further router needed to be added accept "/" which is base path
// router.use('/routerName',require('./routerFileName'));

module.exports = router;