const express = require('express');

const router = express.Router();
const likeController = require('../controller/like_controller');

router.post('/toggle/', likeController.likeToggle);

module.exports = router