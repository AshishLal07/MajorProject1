const express = require("express");

const router = express.Router();
const user = require('../controller/users_controller');

router.get('/profile',user.profile);



module.exports = router;