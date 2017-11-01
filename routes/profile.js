var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/profile.html

//create
router.post('/create', function(req, res) {

    //token檢查, 先不檢查
    //var token = req.body.token;

    var json = {
        id: 0,
        msg: "建立過程有錯誤請查看值的正確性",
        err: ""
    }

    models.Profile.findOrCreate({
            where: {
                name: req.body.profile.name,
                AccountId: req.body.id,
                flag: req.body.profile.flag
            },
            defaults: {
                name: req.body.profile.name,
                birthday: req.body.profile.birthday,
                sex: req.body.profile.sex,
                role: req.body.profile.role,
                image: req.body.profile.image,
                flag: req.body.profile.flag,
                AccountId: req.body.id
            }
        })
        .spread(function(data, created) {
            console.log(data.get({
                    plain: true
                }))
                //console.log(data);
            json.id = data.id, //這是資料代碼
                json.msg = "ok,資料己建立"

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

    var json = {
        id: 0,
        err: "",
        msg: "沒有資料可更新"
    }

    //console.log(req.body.profile.id);
    //res.send(cool());

    models.Profile.find({
        where: {
            id: req.body.profile.id
        }
    }).then(function(data) {

        if (data != null) {

            data.update({
                name: req.body.profile.name,
                birthday: req.body.profile.birthday,
                sex: req.body.profile.sex,
                role: req.body.profile.role,
                image: req.body.profile.image,
                flag: req.body.profile.flag
                    //AccountId: req.body.id
            }).then(function() {

            })

            //console.log(data);
            json.id = data.id; //這是 profile id資料代碼, 可存在用戶端
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

router.get('/id/:id', function(req, res) {

    var id = req.params.id;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        profile: null,
        err: ""
    }

    // models.Profile.findOne({
    //     where: {
    //         id: id
    //     }
    // }).then(function(data) {
    //
    //     if (data != null) {
    //         json.msg = "ok";
    //         json.id = data.id;
    //         json.profile = data;
    //     }
    //     res.json(json);
    //
    // }).catch(function(err) {
    //
    // console.log(err);
    // json.err = "sql";
    // json.msg = err;
    // res.json(json);
    //
    // });

    models.Profile.findAll({
        where: {
            id: id
        }
    }).then(function(data) {

        data.map(function(item) {
            json.msg = "ok";
            json.id = item.id;
            json.profile = item;
        })
        res.json(json);

    }).catch(function(err) {

        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);

    });

});

router.get('/acc/:id', function(req, res) {

    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        profiles: []
    }

    var id = req.params.id;
    //var token = req.params.token; //先不檢查

    models.Profile.findAll({
        where: {
            AccountId: id
        }
    }).then(function(data) {

        data.map(function(item) {
            json.profiles.push(item);
        });
        json.msg = "ok";
        json.id = id;
        res.json(json);

    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });

});

//刪除資料
router.get('/del/:id', function(req, res) {

    var id = req.params.id;

    var json = {
        id: id,
        msg: "沒有資料可刪除",
        err: ""
    }

    models.Profile.findAll({
        where: {
            id: id
        }
    }).then(function(data) {

        data.map(function(item) {
            json.msg = "ok,刪除";

            models.Profile.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function(data) {
                json.msg = "ok,刪除";
                json.id = data.id;
                res.json(json);
            });

        })
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

    models.Profile.findAll({

    }).then(function(data) {

        //if (keyword != "Q_QtaiwanQvQ") data = cool();
        //if (data == null) data = cool();

        var list = [];
        data.map(function(item) {
            json.msg = "ok";
            var info = {
                name: item.name,
                birthday: item.birthday,
                sex: item.sex,
                role: item.role,
                //image: item.image,
                flag: item.flag,
                AccountId: item.AccountId
            }
            list.push(info);
        })
        res.json(list);

    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });

});


module.exports = router;
