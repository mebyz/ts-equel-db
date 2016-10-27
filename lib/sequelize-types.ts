import * as sequelize from "sequelize"

export interface Buffer {}

/*__each__ idFields */ export interface __fieldNameProperCase__ { __fieldNameProperCase__: number; }
/*__ignore__*/ export interface I__translatedFieldType__ {}
/*__ignore__*/ export interface __customFieldType__ {}
/*__ignore__*/ export interface I__tableNameSingular__Instance {}
/*__ignore__*/ export interface I__tableNameSingular__Pojo {}
/*__ignore__*/ export interface I__idFieldNameTitleCase__ {}

let asserters: {[typeName: string]: (pojo: any, allowUndefined?: boolean) => void} = {};

/*__startEach__ tables */
//////////////////////////////////////////////////////////////////////////////
//
//
//               __tableName__
//
//
//////////////////////////////////////////////////////////////////////////////

export interface I__tableNameSingular__Pojo {
    /*__each__ fields */ __fieldName__?: __customFieldType__;
}

export interface I__tableNameSingular__Instance { }

export interface I__tableName__Model extends sequelize.Model<I__tableNameSingular__Instance, I__tableNameSingular__Pojo> {
}

export function assertValid__tableNameSingular__(pojo: I__tableNameSingular__Pojo, allowUndefined?: boolean): void {

    if (pojo === undefined || pojo === null) {
        if (allowUndefined) {
            return;
        }
        throw new Error("Invalid __tableNameSingular__ provided. It is \"" + (typeof pojo) + "\".");
    }
    let fieldNames: string[] = Object.keys(pojo);
    if (fieldNames.length === 0) {
        throw new Error("Invalid __tableNameSingular__ provided. It is an empty object.");
    }

    let i: number = fieldNames.length;
    while (i-- > 0) {
        switch (fieldNames[i]) {
            /*__each__ fields */ case "__fieldName__":  assertValidFieldType("__tableNameSingular__", "__fieldName__", pojo, "__translatedFieldType__"); break;
            default:
                throw new Error("Invalid __tableNameSingular__ provided. Field \"" + fieldNames[i] + "\" is not supported.")
        }
    }
}
let k__tableNameSingular__ = "__tableNameSingular__"
asserters[k__tableNameSingular__] = assertValid__tableNameSingular__;
/*__endEach__*/
let BOOLEAN_TYPE: string = typeof(true);
let NUMBER_TYPE: string = typeof(1);
let STRING_TYPE: string = typeof("");
let FUNCTION_TYPE: string = typeof(function(): void {});
let DATE_EXPECTED_TYPE: string = "Date";
let BUFFER_EXPECTED_TYPE: string = "Buffer";
// let BUFFER_EXISTS: boolean = typeof Buffer !== "undefined"; //in node exists, in js not, so only validate in node

function assertValidFieldType(pojoName: string, fieldName: string, pojo: any, expectedType: string): void {

    let value: any = pojo[fieldName];
    let actualType: string = typeof value;

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
                let newValue: number = parseFloat(value);
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
            let getTime: Function = value.getTime;
            if (typeof getTime === FUNCTION_TYPE) {
                let timeValue: number = value.getTime();
                if (isNaN(timeValue)) {
                    err();
                }
                if (!(value instanceof Date)) {
                    pojo[fieldName] = new Date(timeValue);
                }
                return;
            }

            if (actualType === STRING_TYPE) {
                let newDate: Date = new Date(value);
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

    function err(extraMessage?: string): void {
        let message: string = "Invalid " + pojoName + " provided. Field \"" + fieldName + "\" with value \"" + safeValue(value) + "\" is not a valid \"" + expectedType + "\".";
        if (extraMessage !== undefined) {
            message += " " + extraMessage;
        }
        throw new Error(message);
    }
}

function safeValue(value: any): string {

    if (value === undefined || value === null) {
        return typeof value;
    }

    let s: string = value.toString();
    return s.substr(0, 100);
}

export interface IReference {
    tableName: string;
    primaryKey: string;
    foreignKey: string;
    as: string;
}
