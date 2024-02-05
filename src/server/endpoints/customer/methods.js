var sql = require("../../sql.js").sql;


async function getCustomerMethods(api_request, obj, post) {

    var query = await sql.query("select * from methods where customer=?", api_request[1]);

    obj["data"] = {};
    obj["data"]["methods"] = [];

    query.forEach(method => {
        var method_obj = {}

        method_obj["type"] = method["method"];
        method_obj["account"] = "";



        obj["data"]["methods"].push(method_obj);
    });


    return obj;


}


module.exports = { getCustomerMethods };