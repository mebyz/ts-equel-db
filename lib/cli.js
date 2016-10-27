/// <reference path="../typings/node/node.d.ts" />
"use strict";
var generator = require("./sequelize-auto-ts");
var fs = require("fs");
var prompt = require("prompt");
if (process.argv.length > 2) {
    processFromCommandLines();
}
else {
    processFromPrompt();
}
function processFromCommandLines() {
    var args = process.argv.slice(2);
    var modelFactory = false;
    var i = args.indexOf('-mf');
    if (i !== -1) {
        modelFactory = true;
        args.splice(i, 1);
    }
    if (args.length < 4) {
        showHelp();
        process.exit(1);
    }
    var options = {
        database: args[0],
        username: args[1],
        password: args[2],
        targetDirectory: args[3],
        modelFactory: modelFactory,
        options: { host: args[4] }
    };
    generate(options);
}
function processFromPrompt() {
    var schema = {
        properties: {
            database: { description: "Database name", required: true },
            username: { description: "Username", required: true },
            password: { description: "Password", required: false, hidden: true },
            targetDirectory: { description: "Target directory", required: true },
            options: { description: "host", required: true }
        }
    };
    prompt.start();
    prompt.get(schema, function (err, result) {
        result.options = null;
        generate(result);
    });
}
function generate(options) {
    console.log("Database: " + options.database);
    console.log("Username: " + options.username);
    console.log("Password: <hidden>");
    console.log("Target  : " + options.targetDirectory);
    console.log("");
    if (!fs.existsSync(options.targetDirectory)) {
        showHelp();
        throw Error("Target directory does not exist: " + options.targetDirectory);
    }
    generator.generate(options, function (err) {
        if (err) {
            throw err;
        }
    });
}
function showHelp() {
}
