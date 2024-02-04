// packages
const http = require("http");
const mysql = require('promise-mysql');

const config = require("../config.js");

const endpoint_payment_suggestion = require("./endpoints/payment_suggestion.js");
const endpoint_customer = require("./endpoints/customer.js");

var con;

async function requestListener(req, res) {

    // json object
    var obj = {};
    obj["code"] = "OK";

    // set headers
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);


    // filter api
    var api_request = req.url.split('/').filter(function (el) {
        return el !== "";
    });



    switch (api_request[0]) {
        case "customer":
            obj = await endpoint_customer.endpoint(api_request, obj, con);
            break;
        case "payment_suggestion":
            obj = await endpoint_payment_suggestion.endpoint(api_request, obj);

            break;
        default:
            obj["code"] = "NO_ENDPOINT";
            break;

    }

    res.end(JSON.stringify(obj));

}




async function initServer(){
    const server = http.createServer(requestListener);

    const config_rest = await config.getConfig("rest");
    const config_db = await config.getConfig("database");

    const rest_host = config_rest.host;
    const rest_port = config_rest.port;
    
    con = await mysql.createConnection({
        host: config_db.host,
        user: config_db.username,
        password: config_db.password,
        database: config_db.database
    });
    

    server.listen(rest_port, rest_host, () => {
        console.log("=========");
        console.log("Server running on '" + rest_host + ":" + rest_port + "'");
    });
        
}







module.exports = { requestListener, initServer };