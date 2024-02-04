const clc = require("cli-color");



const config = require('./config.js');
const server = require('./server/server.js');

const pjson = require('./package.json');


// Show bootup information
console.log(clc.bold("Stripe Subscription Server"));
console.log("===================")
console.log(" ");
console.log(clc.blackBright("Version: ") + clc.blackBright.italic(pjson.version));
console.log(clc.blackBright("Created by: ") + clc.blackBright.italic(pjson.author));
console.log(clc.blackBright("License: ") + clc.blackBright.italic(pjson.license));
console.log(" ");

async function init() {
    console.log("Loading configuration")
    var success = await config.loadConfig()
    if (success) console.log("[ OK ]")


    await server.initServer();


}

init();