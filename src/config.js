const yaml = require('js-yaml');
const fs = require('fs');

let configs = {};
const files = ["subscription", "database", "currency", "rest", "service"];

async function loadConfig() {

    for(let file of files){
        try {
            configs[file] =  yaml.load(fs.readFileSync("./config/" + file + ".yaml", 'utf8'));
        } catch (e) {
            return e;
        }
    }
    return true;
}

async function getConfig(name) {
    if (!files.includes(name)) {
        console.error("Cant get config file with name '" + name + "'")
        return;
    }
    return configs[name];
}


module.exports = { loadConfig, getConfig };