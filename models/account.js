"use strict";

module.exports = function(sequelize, DataTypes) {

    //https://cn27529.gitbooks.io/mycloudlife-book/content/account_table.html

    var Account = sequelize.define("Account", {
        email: DataTypes.STRING,
        password: DataTypes.STRING
            //credate: DataTypes.STRING
    }, {
        freezeTableName: false,
        classMethods: {
            associate: function(models) {
                Account.hasMany(models.Profile)
            }
        }
    });

    return Account;

};
