var cool = require('cool-ascii-faces');

//Mockup
var postList = [
	{ id: 1, name: "Apple", msg: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the gre‬" },
	{ id: 2, name: "Zoe", msg: "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymph. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta." },
	{ id: 3, name: "Cathy", msg: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu" }
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
      res.render('index', 
		{ 
			//title: 'index',
			title: cool(),
			postList: postList
		}
	);
});

module.exports = router;

