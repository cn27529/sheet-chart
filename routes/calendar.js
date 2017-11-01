var models = require('../models');
var express = require('express');
var router = express.Router();


//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/account.html

// method:POST, 使用時機create
// /create/:mode

// create event: ok
router.post('/create/:mode', function(req, res) {
    //token檢查, 先不檢查
    //var token = req.body.token;

    console.log(req.body.event);

    //return;

    var event;
    try {

        event = {
            title: req.body.event.title,
            people: req.body.event.people.join(','),
            yyyymm: req.body.event.yyyymm,
            start: req.body.event.start,
            end: req.body.event.end,
            all_day: req.body.event.all_day,
            reminder: req.body.event.reminder,
            calendar: req.body.event.calendar,
            notes: req.body.event.notes,
            mode: req.params.mode,
            ProfileId: parseInt(req.body.id),
            repeat_type: "",
            repeat_until: ""
                //repeat_detail: [],
                //multiple:[]
        }

        console.log(req.params.mode);

        switch (req.params.mode) {
            case 'multiple':
                event.multiple = req.body.event.multiple.join(',');
                break;
            case 'repeat':
                event.repeat_type = req.body.event.repeat_type;
                event.repeat_detail = req.body.event.repeat_detail.join(',');
                event.repeat_until = req.body.event.repeat_until;
                break;
            default:
        }
    } catch (err) {
        // console.log(err.message);
        return res.json({
            err: err.message
        })
    }


    // create calendar & event
    models.Calendar
        .create(event)
        .then(function(data) {
            // console.log(data.get({ plain: true }));

            // console.log(typeof event.ProfileId, typeof event.mode);
            // mode: single, multiple, repeat
            json = {
                "id": event.ProfileId, //這是使用者的資料代碼, 可存在用戶端
                "msg": "ok,資料己建立",
                "err": ""
            };

            res.json(json);
        });

});


// update event: ok
router.post('/mod/:mode', function(req, res) {

    var json = {
        id: 0,
        msg: "沒有資料可更新",
        err: "",
    }

    models.Calendar.findOne({
            where: {
                ProfileId: req.body.id,
                id: req.body.event.id,
                mode: req.params.mode
            }
        })
        .then(function(data) {
            if (data === null) {
                return res.json(json);
            }

            var id = data.id;
            json.id = id; //這是 event id資料代碼, 可存在用戶端

            console.log(data.get({
                plain: true
            }));

            var people = req.body.event.people;

            if (Array.isArray(people)) {
                people = people.join(',');
            }

            var repeat_type = req.body.event.repeat_type;
            if (Array.isArray(repeat_type)) {
                repeat_type = repeat_type.join(',');
            }
            //------------------------161114加
            var repeat_until = req.body.event.repeat_until;
            if (Array.isArray(repeat_until)) {
                repeat_until = repeat_until.join(',');
            }
            var multiple = req.body.event.multiple;
            if (Array.isArray(multiple)) {
                multiple = multiple.join(',');
            }
            var repeat_detail = req.body.event.repeat_detail;
            if (Array.isArray(repeat_detail)) {
                repeat_detail = repeat_detail.join(',');
            }
            //------------------------161114加

            data.update({
                title: req.body.event.title,
                people: people,
                yyyymm: req.body.event.yyyymm,
                start: req.body.event.start,
                end: req.body.event.end,
                all_day: req.body.event.all_day,
                reminder: req.body.event.reminder,
                calendar: req.body.event.calendar,
                notes: req.body.event.notes,
                repeat_type: repeat_type,
                repeat_detail: repeat_detail,
                repeat_until: repeat_until,
                multiple: multiple
            }).then(() => {
                json.err = "";
                json.msg = "ok,資料己更新";
                res.json(json);
            }).catch(function(err) {
                console.log(err);
                json.err = "sql";
                json.msg = err;
                res.json(json);
            })

        })

});


// get events: ok
router.get('/event/:id/:yyyy/:mm', function(req, res) {

    var id = parseInt(req.params.id);
    var yyyy = req.params.yyyy;
    var mm = req.params.mm;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        events: []
    }

    var yyyymm = yyyy + '/' + mm;

    models.Calendar.findAll({
        where: {

            //yyyymm: yyyy + '/' + mm,
            people: {
                $or: [{
                    $like: id + ',%'
                }, {
                    $like: '%,' + id + ',%'
                }, {
                    $like: '%,' + id
                }, {
                    $like: '%' + id + '%'
                }],
                $like: '%,' + id + ',%'
            },

            // people: {
            //     $like: '%' + id + '%'
            // },
            $or: [{
                start: {
                    $like: '%' + yyyymm + '%'
                }
            }, {
                end: {
                    $like: '%' + yyyymm + '%'
                }
            }, {
                repeat_until: {
                    $like: '%' + yyyymm + '%'
                }
            }, {
                multiple: {
                    $like: '%' + yyyymm + '%'
                }
            }]

        }
    }).then(function(events) {
        json.id = id;
        json.msg = "ok";
        json.events = events;
        res.json(json);
    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });
});

// delete event:

router.get('/del/:id', function(req, res) {
    var id = req.params.id;

    var json = {
        id: id,
        msg: "沒有資料可刪除",
        err: ""
    }

    models.Calendar.findOne({
        where: {
            id: id
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {
            models.Calendar.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function(data) {
                console.log(data);

                json.msg = "ok,刪除";
                json.id = data.id;
                res.json(json);
            });

        } else {
            res.json(json);
        }

    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });
});


//all的通關密語是Q_QtaiwanQvQ
//router.get('/all/:keyword', function(req, res) {
router.get('/all', function(req, res) {

    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查
    var json = {
        msg: "沒有資料",
        err: ""
    }

    models.Calendar.findAll({

    }).then(function(data) {

        //if (keyword != "Q_QtaiwanQvQ") data = cool();
        //if (data == null) data = cool();
        res.json(data);

    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });
    //console.log(cool());

});

router.get('/id/:id', function(req, res) {

    var id = req.params.id;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有找到資料",
        err: "",
        event: null
    }

    models.Calendar.findAll({
        where: {
            id: id
        }
    }).then(function(data) {

        json.id = id;
        data.map(function(item) {
            json.msg = "ok";
            json.event = item;
        })
        res.json(json);

    }).catch(function(err) {

        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);

    });

});


module.exports = router;
