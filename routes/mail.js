var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var sendMail = require('../mail/sendMail');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/maillog.html

//忘記密碼寄送mail
router.post('/repwd', function(req, res) {

    var email = req.body.email;
    var pwd = req.body.pwd;
    var name = req.body.name;

    var json = {
        "email": email,
        "pwd": pwd,
        "name": "",
        "msg": "post沒有電子郵件",
        "err": "repwd"
    }

    if (email === undefined) {
        json.msg = "email is undefined";
        res.json(json);
    }
    if (email == null) {
        json.msg = "email is null";
        res.json(json);
    }

    //props
    var mail_data = {
        mailFrom: 'service@mycloudedlife.com',
        mailTo: email,
        title: '忘記密碼',
        body: 'Dear XXX,<br>Thank you for contacting us<br>This is your password: <br>For your account security, please change your passowrd later.',
        pwd: pwd,
        name: name
    }

    //mail body
    mail_data.body = 'Dear ' + mail_data.name + ',<br>Thank you for contacting us<br>This is your password: ' + mail_data.pwd + '<br>For your account security, please change your passowrd later.';
    console.log(mail_data);
    //忘記密碼寄送mail


    var now = new Date();
    var month = (now.getMonth() + 1);
    var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
    var mm = (month <= 9) ? '0' + month.toString() : month.toString();
    var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();

    models.Maillog.create({
        title: mail_data.title,
        body: mail_data.body,
        mailFrom: mail_data.mailFrom,
        mailTo: mail_data.mailTo,
        msg: "",
        yymmdd: yy + mm + dd,
        yymm: yy + mm
    }).then(function(data) {
        console.log(data);
        console.log('models.Maillog.create');
    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });

    sendMail(mail_data.mailFrom, mail_data.mailTo, mail_data.title, mail_data.body, sendMailCallback);

    json.err = "";
    json.msg = "ok,郵件己發送";
    res.json(json);

    //callback function
    function sendMailCallback(mailMsg, subject, html, from, to) {
        var now = new Date();
        var month = (now.getMonth() + 1);
        var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
        var mm = (month <= 9) ? '0' + month.toString() : month.toString();
        var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();
        console.log(mailMsg);
        console.log("sendMailCallback: " + now.toLocaleString());
    }

});

//邀請成員寄送mail
router.post('/reqemail', function(req, res) {

    var email = req.body.email;
    var name = req.body.name;

    var json = {
        "email": email,
        //"pwd": "",
        "name": name,
        "msg": "post沒有電子郵件",
        "err": "reqemail"
    }

    if (email === undefined) {
        json.msg = "email is undefined";
        res.json(json);
    }
    if (email == null) {
        json.msg = "email is null";
        res.json(json);
    }

    //props
    var mail_data = {
        mailFrom: 'service@mycloudedlife.com',
        mailTo: email,
        title: '成員邀請',
        body: '<h3>測試測試</h3>',
        name: name
    }


    // 主旨: This is the invitation from Peter!
    // 內容:
    // Peter wants to invite your into his circle on cloudLife app.
    // If you dont have this app yet, please downlaod and install cloudLife app from apple store.
    // We know you will enjoy and have fun with your friends and family on cloudLife app.
    //
    //
    // Download app, https://inbox.google.com/u/1/?pli=1
    //
    // If you have any questions about app, we love to help you.
    // This is our service email:
    // service@mycloudedlife.com

    mail_data.title = 'This is the invitation from ' + name + '!';
    mail_data.body = name + ' wants to invite your into his circle on cloudLife app.';
    mail_data.body += '<br/>If you dont have this app yet, please downlaod and install cloudLife app from apple store.';
    mail_data.body += '<br/>We know you will enjoy and have fun with your friends and family on cloudLife app.';
    mail_data.body += '<br/>';
    mail_data.body += '<br/>';
    mail_data.body += '<br/>Download app, https://inbox.google.com/u/1/?pli=1';
    mail_data.body += '<br/>';
    mail_data.body += '<br/>If you have any questions about app, we love to help you.';
    mail_data.body += '<br/>This is our service email: service@mycloudedlife.com';
    mail_data.body += '<br/>';

    console.log(mail_data);
    //成員邀請寄送mail

    var now = new Date();
    var month = (now.getMonth() + 1);
    var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
    var mm = (month <= 9) ? '0' + month.toString() : month.toString();
    var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();

    models.Maillog.create({
        title: mail_data.title,
        body: mail_data.body,
        mailFrom: mail_data.mailFrom,
        mailTo: mail_data.mailTo,
        msg: "",
        yymmdd: yy + mm + dd,
        yymm: yy + mm
    }).then(function(data) {
        console.log(data);
        console.log('models.Maillog.create');
    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });

    sendMail(mail_data.mailFrom, mail_data.mailTo, mail_data.title, mail_data.body, sendMailCallback);

    json.err = "";
    json.msg = "ok,郵件己發送";
    res.json(json);

    //callback function
    function sendMailCallback(mailMsg, subject, html, from, to) {
        var now = new Date();
        var month = (now.getMonth() + 1);
        var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
        var mm = (month <= 9) ? '0' + month.toString() : month.toString();
        var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();
        console.log(mailMsg);
        console.log("sendMailCallback: " + now.toLocaleString());
    }


});


//查寄送記錄
router.get('/yymmdd/:yymmdd', function(req, res) {

    var yymmdd = req.params.yymmdd;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        email: "",
        pwd: ""
    }

    models.Maillog.findAll({
        where: {
            yymmdd: yymmdd
        }
    }).then(function(data) {

        res.json(data);

    }).catch(function(err) {
        console.log(err);
        json.err = "sql";
        json.msg = err;
        res.json(json);
    });

});

router.get('/yymm/:yymm', function(req, res) {

    var yymm = req.params.yymm;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        email: "",
        pwd: ""
    }

    models.Maillog.findAll({
        where: {
            yymm: yymm
        }
    }).then(function(data) {

        res.json(data);

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

    models.Maillog.findAll({

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


//刪除資料
router.get('/del/:id', function(req, res) {

    var id = req.params.id;

    var json = {
        id: id,
        msg: "沒有資料可刪除",
        err: ""
    }

    models.Maillog.findAll({
        where: {
            id: id
        }
    }).then(function(data) {

        data.map(function(item) {
            json.msg = "ok,刪除";

            models.Maillog.destroy({
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

module.exports = router;
