var cool = require('cool-ascii-faces');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
      res.render('random', 
		{ 
			title: 'random'
		}
	);
});

module.exports = router;