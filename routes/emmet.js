//var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

router.get('/emmet', function(req, res) {
    res.render('emmet', { "hello": cool() });
});

module.exports = router;
