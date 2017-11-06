var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('d3js', { title: 'D3.js Demo' });
});

module.exports = router;