const sql = require("../../../sql/sql.js").sql;


async function endpoint(api_request, obj, post) {

    if (api_request[1] == undefined) {
        obj["code"] = "ENDPOINT_METHODS_GET_NULL";
        obj["data"] = {};
        return obj;
    }


    const query = await sql.query("select * from methods where customer=?", api_request[1]);

    obj["data"] = {};
    obj["data"]["methods"] = [];

    query.forEach(method => {
        let method_obj = {}

        method_obj["type"] = method["method"];
        method_obj["account"] = "";



        obj["data"]["methods"].push(method_obj);
    });


    return obj;


}


module.exports = { endpoint };