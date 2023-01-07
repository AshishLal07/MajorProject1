const express = require("express");
const passport = require('passport');
const router = express.Router();

const user = require('../controller/users_controller');

router.get('/profile/:id',passport.checkAuthentication,user.profile);
router.post('/update/:id',passport.checkAuthentication,user.update);

router.get('/sign-in',user.signIn);
router.get('/sign-up',user.signUp);
router.post('/create-userId',user.create);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
),user.createSession);

router.get('/sign-out', user.destroySession);

router.get('/reset_password',user.resetPassword);
router.post('/reset_password/createToken',user.createToken);
router.get('/reset_password/:accessToken', user.resetVerification);
router.post('/reset_password/changePassword/:accessToken',user.changePassword);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect:'/user/sign-in'}),user.createSession)



module.exports = router;