var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');
var sendMail = require('../mail/sendMail');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/account.html

//create
router.post('/create', function(req, res) {

    //token檢查, 先不檢查
    //var token = req.body.token;

    var email = req.body.email;
    var pwd = req.body.pwd;
    var json = {
        id: 0,
        msg: "",
        err: ""
    };

    models.Account.findOrCreate({
            where: {
                email: email
            },
            defaults: {
                email: email,
                password: pwd
            }
        })
        .spread(function(data, created) {
            console.log(data.get({
                    plain: true
                }))
                //console.log(data);
            json.id = data.id; //這是使用者的資料代碼, 可存在用戶端
            json.msg = "ok,資料己建立";
            res.json(json);

        }).catch(function(err) {
            console.log(err);
            json.err = "sql";
            json.msg = err;
            res.json(json);
        });

});

//update
router.post('/mod', function(req, res) {

    var email = req.body.email;
    var id = req.body.id;

    var json = {
        id: 0,
        msg: "沒有資料可更新",
        err: ""
    }

    models.Account.find({
        where: {
            id: id
        }
    }).then(function(data) {

        if (data != null) {
            data.update({
                email: email
            }).then(function() {

            })

            console.log(data);
            json.id = data.id; //這是使用者的資料代碼, 可存在用戶端
            json.err = "";
            json.msg = "ok,資料己更新";
        }
        res.json(json);

    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });

});



router.post('/login', function(req, res) {

    //var email = req.body.email;
    //var token = req.params.token; //先不檢查

    var json = {
        id: 0,
        email: "",
        msg: "登入帳密不正確",
        pwd: "",
        err: ""
    }

    models.Account.findOne({
        where: {
            email: req.body.email,
            password: req.body.pwd
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {
            json.msg = "ok,登入成功";
            json.id = data.id;
            json.email = data.email;
            json.pwd = data.password;
            json.err = "";
        }

        //更新member資料
        models.Member.findOne({
            where: {
                email: data.email,
                memberid: 0
            }
        }).then(function(data) {

            console.log(data);
            console.log('----------------');

            if (data != null && data.flag === "noaccount") {

                //第1次的資料變更
                // data.update({
                //     memberid: json.id,
                //     flag: 'waiting'
                // }).then(function() {
                //
                // })

                //取得profile
                models.Profile.findOne({
                    where: {
                        AccountId: json.id,
                        flag: 'me'
                    }
                }).then(function(data1) {

                    if (data1 != null) {

                        //第2次的資料變更，更新ProfileId
                        data.update({
                            memberid: json.id,
                            flag: 'waiting',
                            ProfileId: data1.id
                        }).then(function() {

                        })

                    }

                });

            }

        });

        res.json(json);

    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });

});

router.get('/id/:id', function(req, res) {

    var id = req.params.id;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        email: "",
        pwd: ""
    }

    models.Account.findOne({
        where: {
            id: id
        }
    }).then(function(data) {

        console.log(data);
        if (data != null) {
            json.msg = "ok";
            json.id = data.id;
            json.email = data.email;
            json.pwd = data.password;
        }
        res.json(json);

    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });

});




router.get('/has/:email', function(req, res) {

    var email = req.params.email;
    //var token = req.params.token; //先不檢查

    var json = {
        id: 0,
        email: "",
        msg: "沒有資料",
        pwd: "",
        err: ""
    }

    models.Account.findOne({
        where: {
            email: email
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {
            json.msg = "ok";
            json.id = data.id;
            json.email = data.email;
            json.pwd = data.password;
            json.err = "";
        }

        res.json(json);

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

    models.Account.findAll({

    }).then(function(data) {

        //if (keyword != "Q_QtaiwanQvQ") data = cool();
        if (data == null) data = cool();
        res.json(data);

    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });

});

module.exports = router;
