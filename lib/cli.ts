
/// <reference path="../typings/node/node.d.ts" />

import generator = require("./sequelize-auto-ts");
import fs = require("fs");
let prompt = require("prompt");

if (process.argv.length > 2)
{
    processFromCommandLines();
}
else
{
    processFromPrompt();
}

function processFromCommandLines()
{
    let args:Array<string> = process.argv.slice(2);
    let modelFactory:boolean = false;

    let i = args.indexOf('-mf');
    if (i !== -1) {
        modelFactory = true;
        args.splice(i, 1);
    }

    if (args.length < 4)
    {
        showHelp();
        process.exit(1);
    }


    let options:generator.GenerateOptions =
    {
        database: args[0],
        username: args[1],
        password: args[2],
        targetDirectory: args[3],
        modelFactory: modelFactory,
        options: { host: args[4]}
    };

    generate(options);
}

function processFromPrompt()
{
    let schema = {
        properties: {
            database: { description: "Database name", required: true },
            username: { description: "Username", required: true },
            password: { description: "Password", required: false, hidden: true },
            targetDirectory: { description: "Target directory", required: true },
            options: { description: "host", required: true }
        }
    };
    
    prompt.start();
    
    prompt.get(schema, function(err, result)
    {
        result.options = null;
        generate(<generator.GenerateOptions>result);
    })
}

function generate(options:generator.GenerateOptions):void
{
    console.log("Database: " + options.database);
    console.log("Username: " + options.username);
    console.log("Password: <hidden>");
    console.log("Target  : " + options.targetDirectory);
    console.log("");

    if (!fs.existsSync(options.targetDirectory))
    {
        showHelp();
        throw Error("Target directory does not exist: " + options.targetDirectory);
    }

    generator.generate(options, function(err)
    {
        if (err)
        {
            throw err;
        }
    });
}

function showHelp():void
{
}

