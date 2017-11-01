var express = require('express');
var router = express.Router();

//https://cdnjs.cloudflare.com/ajax/libs/js-data-firebase/3.0.0/js-data-firebase.min.js

/* GET home page. */
router.get('/', function(req, res, next) {

    //res.render('weathers', { title: 'weather' });
    var json = {
            id: 0,
            msg: "沒有資料",
            err: '',
            data: '',
            title: 'weather',
            weather_flag: '',
        }
        //res.json(json);
        //res.render('weather', json);

    res.render('weather', { title: 'weather' });

});


router.get('/:flag', function(req, res) {

    var weather_flag = req.params.flag;
    //var token = req.params.token; //先不檢查

    var json = {
        id: 0,
        msg: "沒有資料",
        err: '',
        data: '',
        title: 'weather',
        weather_flag: '',
    }

    res.json(json);

});

module.exports = router;