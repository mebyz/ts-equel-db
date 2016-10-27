import * as Sequelize from "sequelize"
import * as types from "./sequelize-types"

export let initialized: boolean = false;
export let SEQUELIZE: Sequelize.Sequelize;

/*__each__ tables */ export let __tableName__: types.I__tableName__Model;

/*__ignore__*/ let __defineFieldType__;
/*__ignore__*/ let __primaryTableName__: Sequelize.Model<any, any>;
/*__ignore__*/ let __foreignTableName__: Sequelize.Model<any, any>;
/*__ignore__*/ let __firstTableName__: Sequelize.Model<any, any>;
/*__ignore__*/ let __secondTableName__: Sequelize.Model<any, any>;
/*__ignore__*/ let __associationNameQuoted__: string;
export function initialize(database: string, username: string, password: string, options: Sequelize.Options): any {
    if (initialized) {
        return;
    }

    SEQUELIZE = new Sequelize(database, username, password, options);

/*__startEach__ tables */

    __tableName__ = <types.I__tableName__Model> SEQUELIZE.define<types.I__tableNameSingular__Instance, types.I__tableNameSingular__Pojo>("__tableNameSingular__", {
        /*__each__ realDbFields, */"__fieldName__": __defineFieldType__
        },
        {
            timestamps: false,
            classMethods: {
            }
        });
/*__endEach__*/

    // return exports;
}
