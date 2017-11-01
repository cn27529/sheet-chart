var cool = require('cool-ascii-faces');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
      res.render('onepage', 
		{ 
			title: '舞蹈生態系創意團隊｜Dancecology｜onepage'
		}
	);
});

module.exports = router;