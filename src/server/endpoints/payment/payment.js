
const json_country_suggestions = require("../../../data/country_suggestions.json"); 
const json_country_list = require("../../../data/country_list.json"); 

// /method/{country}



async function endpoint(api_request, obj, post = null) {

    // Check if customer id is set
    if (api_request[1] == undefined) {
        obj["code"] = "ENDPOINT_PAYMENT_NULL";
        obj["data"] = {};
        return obj;
    }



    switch (api_request[1]) {
        case "suggest":
            obj = await require("./suggest.js").getPaymentSuggestion(api_request, obj, post);
            break;
        default:
            obj["code"] = "ENDPOINT_PAYMENT_INVALID";
            obj["data"] = {};
            return obj;
    }


    return obj;

}






module.exports = { endpoint };