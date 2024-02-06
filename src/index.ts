const clc = require("cli-color");

const pjson = require('./package.json');

const list_load = [
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

    for (let modlue of list_load) {


        // TODO: Add colors with clc 
        process.stdout.write("Loading " + modlue["NAME"] + "...      ");

        const load_state = await modlue["LOAD"]();
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