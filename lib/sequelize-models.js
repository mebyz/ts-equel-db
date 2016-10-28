"use strict";
exports.initialized = false;
/*__ignore__*/ var __defineFieldType__;
/*__ignore__*/ var __primaryTableName__;
/*__ignore__*/ var __foreignTableName__;
/*__ignore__*/ var __firstTableName__;
/*__ignore__*/ var __secondTableName__;
/*__ignore__*/ var __associationNameQuoted__;
function initialize(s) {
    if (exports.initialized) {
        return;
    }
    exports.SEQUELIZE = s;
    /*__startEach__ tables */
    exports.__tableName__ = exports.SEQUELIZE.define("__tableNameSingular__", {
        /*__each__ realDbFields, */ "__fieldName__": __defineFieldType__
    }, {
        timestamps: false,
        freezeTableName: true,
        classMethods: {}
    });
    /*__endEach__*/
}
exports.initialize = initialize;
