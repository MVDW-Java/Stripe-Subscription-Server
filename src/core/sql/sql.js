const mysql = require('promise-mysql');
const fs = require('fs').promises;

const config = require("../../config.js");



const tables = ["customers"];



async function initSQL() {
    try {

        const config_db = await config.getConfig("database");

        module.exports.sql = await mysql.createConnection({
            host: config_db.host,
            user: config_db.username,
            password: config_db.password,
            database: config_db.database
        })


        for (let table of tables) {
            const data = await fs.readFile(__dirname + "/tables/" + table + ".sql");
            module.exports.sql.query(data.toString());
        }


        return true;


    } catch (e) {
        return e;
    }
}

module.exports = { initSQL };