//引用 nodemailer
var nodemailer = require('nodemailer');
var models = require('../models');

module.exports = function(mailFrom, mailTo, title, body, callpack) {

    // //連線資訊
    // nodemailer.SMTP = {
    //     host: "stmp.gmail.com",//server位置
    //     port: 465,//可不給,預設25
    //     ssl: true,//可不給,預設false
    //     user: 'mycloudedlife1@gmail.com', //可不給
    //     pass: '1029384756@pwd', //可不給
    //     use_authentication: true//可不給
    // }

    nodemailer.SMTP = {
        host: "a2plcpnl0572.prod.iad2.secureserver.net", //server位置
        port: 465, //可不給,預設25
        ssl: true, //可不給,預設false
        user: 'service@mycloudedlife.com', //可不給
        pass: '3edc#EDC@pwd', //可不給
        use_authentication: true //可不給
    }

    // nodemailer.SMTP = {
    //     host: "mail.mycloudedlife.com", //server位置
    //     port: 25, //可不給,預設25
    //     ssl: false, //可不給,預設false
    //     user: 'service@mycloudedlife.com', //可不給
    //     pass: '3edc#EDC@pwd', //可不給
    //     use_authentication: true //可不給
    // }

    //create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport();

    //信件內容參數
    var mailOptions = {
        from: mailFrom,
        to: mailTo,
        subject: title,
        html: body
            // attachments: [{
            //     filename: 'README.md',
            //     content: 'README.md'
            // }]
    };

    // // verify connection configuration
    // transporter.verify(function(error, success) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Server is ready to take our messages');
    //     }
    // });

    //寄出
    transporter.sendMail(mailOptions, function(err, info) {

        //info是成功信件相關資訊;err是失敗相關資訊
        var mailMsg = "";

        var now = new Date();
        var month = (now.getMonth() + 1);
        var yy = (now.getFullYear() <= 9) ? '0' + now.getFullYear().toString() : now.getFullYear().toString();
        var mm = (month <= 9) ? '0' + month.toString() : month.toString();
        var dd = (now.getDate() <= 9) ? '0' + now.getDate().toString() : now.getDate().toString();

        if (err) {
            console.log(err);
            mailMsg = err.toString();
        }

        if (info) {
            console.log(info);
            mailMsg = info;
        }

        //console.log(typeof callpack);
        //callpack(mailMsg, subject, html, from, to);
        

        // if (typeof callpack === "function") {
        //     // do something
        //     callpack(mailMsg, subject, html, from, to);
        // }

    });



    //return transporter;

};
