const express = require('express');
const passport = require('passport');

const router = express.Router();
const commentController = require('../controller/comment_controller');

router.post('/create',passport.checkAuthentication,commentController.comment);



module.exports = router;