var router = express.Router();

router.get('/', function(req, res) {
    
    res.render('list', {
        title: 'list',
        items: [1991, 'byvoid', 'express', 'Node.js']
    });

});

module.exports = router;