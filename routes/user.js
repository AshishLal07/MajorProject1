const express = require("express");
const passport = require('passport');
const router = express.Router();

const user = require('../controller/users_controller');

router.get('/profile',passport.checkAuthentication,user.profile);
router.get('/sign-in',user.signIn);
router.get('/sign-up',user.signUp);
router.post('/create-userId',user.create);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
),user.createSession);

router.get('/sign-out', user.destroySession);



module.exports = router;