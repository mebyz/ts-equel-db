"use strict";
var asserters = {};
function assertValid__tableNameSingular__(pojo, allowUndefined) {
    if (pojo === undefined || pojo === null) {
        if (allowUndefined) {
            return;
        }
        throw new Error("Invalid __tableNameSingular__ provided. It is \"" + (typeof pojo) + "\".");
    }
    var fieldNames = Object.keys(pojo);
    if (fieldNames.length === 0) {
        throw new Error("Invalid __tableNameSingular__ provided. It is an empty object.");
    }
    var i = fieldNames.length;
    while (i-- > 0) {
        switch (fieldNames[i]) {
            /*__each__ fields */ case "__fieldName__":
                assertValidFieldType("__tableNameSingular__", "__fieldName__", pojo, "__translatedFieldType__");
                break;
            default:
                throw new Error("Invalid __tableNameSingular__ provided. Field \"" + fieldNames[i] + "\" is not supported.");
        }
    }
}
exports.assertValid__tableNameSingular__ = assertValid__tableNameSingular__;
var k__tableNameSingular__ = "__tableNameSingular__";
asserters[k__tableNameSingular__] = assertValid__tableNameSingular__;
/*__endEach__*/
var BOOLEAN_TYPE = typeof (true);
var NUMBER_TYPE = typeof (1);
var STRING_TYPE = typeof ("");
var FUNCTION_TYPE = typeof (function () { });
var DATE_EXPECTED_TYPE = "Date";
var BUFFER_EXPECTED_TYPE = "Buffer";
// let BUFFER_EXISTS: boolean = typeof Buffer !== "undefined"; //in node exists, in js not, so only validate in node
function assertValidFieldType(pojoName, fieldName, pojo, expectedType) {
    var value = pojo[fieldName];
    var actualType = typeof value;
    if (value === undefined || value === null) {
        return;
    }
    switch (expectedType) {
        default:
        case BOOLEAN_TYPE:
            if (actualType !== BOOLEAN_TYPE && actualType !== NUMBER_TYPE) {
                err();
            }
            pojo[fieldName] = Boolean(value);
            return;
        case NUMBER_TYPE:
            if (actualType === NUMBER_TYPE) {
                return;
            }
            if (actualType === STRING_TYPE) {
                var newValue = parseFloat(value);
                if (isNaN(newValue)) {
                    err();
                }
                pojo[fieldName] = newValue;
            }
            return;
        case STRING_TYPE:
            if (actualType !== STRING_TYPE) {
                pojo[fieldName] = value.toString();
            }
            return;
        case DATE_EXPECTED_TYPE:
            var getTime = value.getTime;
            if (typeof getTime === FUNCTION_TYPE) {
                var timeValue = value.getTime();
                if (isNaN(timeValue)) {
                    err();
                }
                if (!(value instanceof Date)) {
                    pojo[fieldName] = new Date(timeValue);
                }
                return;
            }
            if (actualType === STRING_TYPE) {
                var newDate = new Date(value);
                if (!isNaN(newDate.getTime())) {
                    pojo[fieldName] = newDate;
                    return;
                }
            }
            err();
            return;
        case BUFFER_EXPECTED_TYPE:
            /*if (!BUFFER_EXISTS) {
                return;
            }*/
            /*if (!(value instanceof Buffer)) {
                err();
            }*/
            return;
    }
    function err(extraMessage) {
        var message = "Invalid " + pojoName + " provided. Field \"" + fieldName + "\" with value \"" + safeValue(value) + "\" is not a valid \"" + expectedType + "\".";
        if (extraMessage !== undefined) {
            message += " " + extraMessage;
        }
        throw new Error(message);
    }
}
function safeValue(value) {
    if (value === undefined || value === null) {
        return typeof value;
    }
    var s = value.toString();
    return s.substr(0, 100);
}
