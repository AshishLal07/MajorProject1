const express = require('express');

const router = express.Router();
const homeController = require("../controller/home_controller");


// this will work as controller action from routes
// router are url paths which acquier controller action in masterfile when we follow url path
router.get('/',homeController.home);
router.use('/user',require('./user'));

module.exports = router;