const express = require("express");

const router = express.Router();
const user = require('../controller/users_controller');

router.get('/profile',user.profile);
router.get('/sign-in',user.signIn);
router.get('/sign-up',user.signUp);
router.post('/create-userId',user.create);



module.exports = router;