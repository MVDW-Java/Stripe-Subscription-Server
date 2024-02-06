
// customer/{identification}/{task}
async function endpoint(api_request, obj, post = null) {

    // Check if customer id is set
    if (api_request[1] == undefined) {
        obj["code"] = "ENDPOINT_CUSTOMER_NULL";
        obj["data"] = {};
        return obj;
    }



    switch (api_request[2]) {
        case "methods":
            obj = await require("./methods.js").getCustomerMethods(api_request, obj, post);
            break;
        default:
            obj["code"] = "ENDPOINT_CUSTOMER_INVALID_TASK";
            obj["data"] = {};
            return obj;
    }


    return obj;

}


module.exports = { endpoint };