"use strict";
var Sequelize = require("sequelize");
exports.initialized = false;
/*__ignore__*/ var __defineFieldType__;
/*__ignore__*/ var __primaryTableName__;
/*__ignore__*/ var __foreignTableName__;
/*__ignore__*/ var __firstTableName__;
/*__ignore__*/ var __secondTableName__;
/*__ignore__*/ var __associationNameQuoted__;
function initialize(database, username, password, options) {
    if (exports.initialized) {
        return;
    }
    exports.SEQUELIZE = new Sequelize(database, username, password, options);
    /*__startEach__ tables */
    exports.__tableName__ = exports.SEQUELIZE.define("__tableNameSingular__", {
        /*__each__ realDbFields, */ "__fieldName__": __defineFieldType__
    }, {
        timestamps: false,
        classMethods: {}
    });
    /*__endEach__*/
    // return exports;
}
exports.initialize = initialize;
