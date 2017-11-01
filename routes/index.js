//var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

router.get('/', function(req, res) {
    res.send(cool());
    console.log(cool());
});

module.exports = router;
