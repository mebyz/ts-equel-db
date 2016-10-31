import * as Sequelize from "sequelize"

export let initialized: boolean = false;
export let SEQUELIZE: Sequelize.Sequelize;

/*__each__ tables */ export let __tableName__: I__tableName__Model;

/*__ignore__*/ let __defineFieldType__;
/*__ignore__*/ let __primaryTableName__: Sequelize.Model<any, any>;
/*__ignore__*/ let __foreignTableName__: Sequelize.Model<any, any>;
/*__ignore__*/ let __firstTableName__: Sequelize.Model<any, any>;
/*__ignore__*/ let __secondTableName__: Sequelize.Model<any, any>;
/*__ignore__*/ let __associationNameQuoted__: string;

/*__each__ idFields */ export interface __fieldNameProperCase__ { __fieldNameProperCase__: number; }
/*__ignore__*/ export interface I__translatedFieldType__ {}
/*__ignore__*/ export interface __customFieldType__ {}
/*__ignore__*/ export interface I__tableNameSingular__Instance {}
/*__ignore__*/ export interface I__tableNameSingular__Pojo {}
/*__ignore__*/ export interface I__idFieldNameTitleCase__ {}

/*__startEach__ tables */
//////////////////////////////////////////////////////////////////////////////
//               __tableName__
//////////////////////////////////////////////////////////////////////////////

export interface I__tableNameSingular__Pojo {
    /*__each__ fields */ __fieldName__?: __customFieldType__;
}

export interface I__tableNameSingular__Instance { }

export interface I__tableName__Model extends Sequelize.Model<I__tableNameSingular__Instance, I__tableNameSingular__Pojo> {
}

/*__endEach__*/

export interface IReference {
    tableName: string;
    primaryKey: string;
    foreignKey: string;
    as: string;
}

export function initialize(s: any): any {
    if (initialized) {
        return;
    }

    SEQUELIZE = s

/*__startEach__ tables */

    __tableName__ = <I__tableName__Model> SEQUELIZE.define<I__tableNameSingular__Instance, I__tableNameSingular__Pojo>("__tableNameSingular__", {
        /*__each__ realDbFields, */"__fieldName__": __defineFieldType__
        },
        {
            timestamps: false,
            freezeTableName: true,
            classMethods: {
            }
        });
/*__endEach__*/

}
