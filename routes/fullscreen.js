var cool = require('cool-ascii-faces');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('fullscreen', { title: 'fullscreen' });
});

module.exports = router;

