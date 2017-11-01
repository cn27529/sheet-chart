"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/note_table.html
    var Maillog = sequelize.define("Maillog", {
        title: DataTypes.STRING,
        body: DataTypes.STRING,
        mailFrom: DataTypes.STRING,
        mailTo: DataTypes.STRING,
        msg: DataTypes.STRING,
        yymmdd: DataTypes.STRING,
        yymm: DataTypes.STRING
    }, {
        freezeTableName: false
    });

    return Maillog;
};
