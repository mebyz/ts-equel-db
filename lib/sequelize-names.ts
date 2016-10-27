export interface ISequelizeNames {
    TableNames: TableNames;
    calculatedFields: CalculatedFields;
    /*__each__ tables */ __tableNameSingularCamel__Fields: cL__tableName__Fields;
}
export class TableNames {
    /*__each__ tables */ public __tableNameModel__: string = "__tableNameModel__";
}

export let tableNames: TableNames = new TableNames();
/*__startEach__ tables */

export class cL__tableName__Fields {
    /*__each__ fields */ public __fieldName__: string = "__fieldName__";
}
export let __tableNameSingularCamel__Fields: cL__tableName__Fields = new cL__tableName__Fields();
/*__endEach__*/
export class CalculatedFields {
    /*__each__ calculatedFields */ public __fieldName__: string = "__fieldName__";
}
export let calculatedFields: CalculatedFields = new CalculatedFields();
