/// <reference path="../typings/node/node.d.ts" />
/// <reference path="./sequelize.d.ts" />

import schema = require("./schema");
import path = require("path");
let ScriptTemplate = require("script-template");
import fs = require("fs");


let Sequelize:sequelize.SequelizeStatic = require("sequelize");

let _:sequelize.Lodash = Sequelize.Utils._;

let targetProjectRootDirectory:string = null;

export interface GenerateOptions
{
    database:string;
    username:string;
    password:string;
    options:sequelize.Options;
    modelFactory?:boolean;

    targetDirectory:string;
}
export function generate(options:GenerateOptions, callback?:(err:Error) => void):void {
    if (callback == undefined) {
        callback = function (err:Error):void {
        };
    }

    schema.read(options.database, options.username, options.password, options.options,
        function (err:Error, schema:schema.Schema) {
            if (err) {
                callback(err);
                return;
            }

            generateTypes(options, schema, callback);
        });
}

function generateTypes(options:GenerateOptions, schema:schema.Schema, callback:(err:Error) => void):void
{
    schema.useModelFactory = options.modelFactory;

    // generateFromTemplate(options, schema, "sequelize-types.ts", function(err:Error) {
    //    generateFromTemplate(options, schema, "sequelize-names.ts", function(err:Error) {
    let template:string = options.modelFactory ? "sequelize-model-factory.ts" : "sequelize-models.ts";
    generateFromTemplate(options, schema, template, callback);
    //    });
    // });
}

function generateFromTemplate(options:GenerateOptions, schema:schema.Schema, templateName:string, callback:(err:Error) => void):void
{
    console.log("Generating " + templateName);

    let templateText:string = fs.readFileSync(path.join(__dirname, templateName), "utf8");

    let engine = new ScriptTemplate(templateText);
    let genText:string = engine.run(schema);

    genText = translateReferences(genText, options);

    fs.writeFileSync(path.join(options.targetDirectory, templateName), genText);

    callback(null);
}

function translateReferences(source:string, options:GenerateOptions):string
{
    let re:RegExp = new RegExp("///\\s+<reference\\s+path=[\"'][\\./\\w\\-\\d]+?([\\w\\.\\-]+)[\"']\\s*/>", "g");

    function replaceFileName(match:string, fileName:string):string
    {
        if (targetProjectRootDirectory == null)
        {
            targetProjectRootDirectory = findTargetProjectRootDirectory(options);
        }

        let targetPath:string = findTargetPath(fileName, targetProjectRootDirectory);

        let relativePath:string = targetPath == null
                                    ? null
                                    : path.relative(options.targetDirectory, targetPath);

        if (relativePath == null)
        {
            let sourceText:string = fs.readFileSync(path.join(__dirname, fileName), "utf8");
            let targetText = translateReferences(sourceText, options);
            fs.writeFileSync(path.join(options.targetDirectory, fileName), targetText);

            relativePath = "./" + fileName;
        }
        else if (relativePath.charAt(0) != ".")
        {
            relativePath = "./" + relativePath;
        }
        return "/// <reference path=\"" + relativePath.replace(/\\/g, '/') + "\" />";
    }

    return source.replace(re, replaceFileName);
}

function findTargetProjectRootDirectory(options:GenerateOptions):string
{
    let dir:string = options.targetDirectory;

    while(!hasFile(dir, "package.json"))
    {
        let parent:string = path.resolve(dir, "..");
        if (parent == null || parent == dir)
        {
            // found root without finding a package.json file
            return options.targetDirectory;
        }
        dir = parent;
    }

    return dir;
}

function hasFile(directory:string, file:string):boolean
{
    let files:string[] = fs.readdirSync(directory);
    return _.contains(files, file);
}

function findTargetPath(fileName:string, searchDirectory:string):string
{
    let target:string = path.join(searchDirectory, fileName);
    if (fs.existsSync(target))
    {
        return target;
    }

    let childDirectories:string[] = fs.readdirSync(searchDirectory);
    for(let i=0; i<childDirectories.length; i++)
    {
        let childName:string = childDirectories[i];
        let childPath:string = path.join(searchDirectory, childName);

        let stat:fs.Stats = fs.statSync(childPath);

        if (stat.isDirectory() && childName.charAt(0) != '.' && childName != 'node_modules')
        {
            target = findTargetPath(fileName, childPath);
            if (target != null)
            {
                return target;
            }
        }
    }
    return null;
}
