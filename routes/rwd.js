//var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

router.get('/rwd', function(req, res) {
    res.render('rwd', { "hello": cool() });
});

module.exports = router;
