const clc = require("cli-color");

const pjson = require('./package.json');

var list_load = [
    {
        "NAME": "configuration",
        "LOAD": require('./config.js').loadConfig
    },
    {
        "NAME": "sql server",
        "LOAD": require('./server/sql.js').initSQL
    },
    {
        "NAME": "http server",
        "LOAD": require('./server/http.js').initHttp
    },


];

async function init() {

    // Show bootup information
    console.log(clc.bold("Stripe Subscription Server"));
    console.log("===================")
    console.log(" ");
    console.log(clc.blackBright("Version: ") + clc.blackBright.italic(pjson.version));
    console.log(clc.blackBright("Created by: ") + clc.blackBright.italic(pjson.author));
    console.log(clc.blackBright("License: ") + clc.blackBright.italic(pjson.license));
    console.log(" ");

    for (let i = 0; i < list_load.length; i++) {


        // TODO: Add colors with clc 
        process.stdout.write("Loading " + list_load[i]["NAME"] + "...      ");

        var load_state = await list_load[i]["LOAD"]();
        if (typeof load_state == "boolean" && load_state) {
            process.stdout.write("[ OK ]\n");
        } else {
            process.stdout.write("[FAIL]\n");
            if(typeof load_state !== "boolean"){
                process.stdout.write("\nAn fatal error occured while initializing the stripe server: \n" + load_state + "\n");
            }


            process.exit(1);
        }


    }
}

init();