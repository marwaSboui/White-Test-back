var express = require('express');
var certification = require('./certification');
var exam = require('./exam');
var examRoom = require('./exam-room');
var user = require('./users');
var router = express.Router();


router.use('/certification', certification);
router.use('/exam', exam);
router.use('/examRoom', examRoom);
router.use('/user', user);

module.exports = router;
