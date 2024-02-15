// packages
const http = require("http");


const config = require("../../config.js");


async function requestHandler(req, res) {

    // json object
    let obj = {};
    obj["code"] = "OK";

    // set headers
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);

    // appending post chunks into array
    const chunks = [];
    let post = null;
    req.on('data', chunk => {
        chunks.push(chunk)
        if (chunks.length > 1e6) req.connection.destroy();
    });

    // after processing post chunks, parse the post is json and handle the request 
    req.on('end', async () => {
        try {
            if (chunks.length > 0) post = JSON.parse(Buffer.concat(chunks));
        } catch {
            obj["code"] = "INVALID_POST";
            res.end(JSON.stringify(obj));
            return;
        }

        // Handle request
        obj = await handle(req, obj, post);

        res.end(JSON.stringify(obj));
    });

}


async function handle(req, obj, post) {

    // filter api
    const api_request = req.url.split('/').filter(function (el) {
        return el !== "";
    });

    // endpoint type
    switch (api_request[0]) {
        case "methods_get":
            obj = await require("./endpoints/methods_get/endpoint.js").endpoint(api_request, obj, post);
            break;
        case "methods_add":
            obj = await require("./endpoints/methods_add/endpoint.js").endpoint(api_request, obj, post);
            break;
        case "methods_ask_add":
            obj = await require("./endpoints/methods_ask_add/endpoint.ts").endpoint(api_request, obj, post);
            break;
        case "methods_suggest":
            obj = await require("./endpoints/methods_suggest/endpoint.js").endpoint(api_request, obj, post);

            break;
        default:
            obj["code"] = "NO_ENDPOINT";
            break;

    }

    return obj;


}


async function initHttp() {
    const server = http.createServer(requestHandler);

    const config_rest = await config.getConfig("rest");


    const rest_host = config_rest.host;
    const rest_port = config_rest.port;

    server.listen(rest_port, rest_host, () => {
        console.log("=========");
        console.log("Server running on '" + rest_host + ":" + rest_port + "'");
    });
    return true;
}







module.exports = { initHttp };