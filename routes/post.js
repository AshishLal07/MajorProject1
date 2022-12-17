const express = require('express');
const passport = require('passport');

const router = express.Router();
const postController = require('../controller/post_controller');

router.post('/',passport.checkAuthentication,postController.post);



module.exports = router;