const express = require('express');

const router = express.Router();
const postApi = require('../../../controller/api/v1/post_api');
const passport = require('passport');


router.get('/', postApi.index)
router.delete('/:id',passport.authenticate('jwt',{session:false}), postApi.destroy); // to not generate session cookies set it as false




module.exports = router;