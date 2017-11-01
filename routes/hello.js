var cool = require('cool-ascii-faces');
var models = require('../models');
var express = require('express');
var router = express.Router();

//Mockup
var postList = [
	{ id: 1, name: "Apple", description: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the gre‬" },
	{ id: 2, name: "Zoe", description: "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymph. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta." },
	{ id: 3, name: "Cathy", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu" }
];

var count = postList.length;

//檢查使用者登入狀態
var isLogin = false;
var checkLoginStatus = function(req, res){
	isLogin = false;
	if(req.signedCookies.userid && req.signedCookies.password){
		isLogin = true;
	}
};

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
      res.render('hello', 
		{ 
			title: 'hello',
			postList: postList
		}
	);
	
});

router.get('/add', function(req, res, next) {
      res.render('helloadd', 
		{ 
			title: 'hello create data',
			postList: postList
		}
	);
	
});

router.get('/read', function(req, res, next) {
  
	var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查
    var json = {
        msg: "沒有資料",
        err: ""
    }

    models.Account.findAll({

    }).then(function(data) {

        //if (keyword != "Q_QtaiwanQvQ") data = cool();
        if (data == null) data = [];
        //res.json(data);
		res.render('hellodata',
			{ 
				title: 'hello get DB data',
				postList: data
			}
		);

    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });
	
});

module.exports = router;