const mysql = require('promise-mysql');


const config = require("../../config.js");


async function initSQL() {
    try {
        
        const config_db = await config.getConfig("database");

        module.exports.sql = await mysql.createConnection({
            host: config_db.host,
            user: config_db.username,
            password: config_db.password,
            database: config_db.database
        });

        return true;


    } catch(e) {
        return e;
    }
}

module.exports = { initSQL };