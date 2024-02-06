
const json_country_suggestions = require("../../../data/country_suggestions.json"); 
const json_country_list = require("../../../data/country_list.json"); 

// /method/{country}
async function getPaymentSuggestion(api_request, obj){

    if (api_request[2] == undefined) {
        obj["code"] = "ENDPOINT_PAYMENT_SUGGEST_NULL";
        obj["data"] = {};
        return obj;
    }

    const county = api_request[2].toUpperCase();
    const suggestion = json_country_suggestions[county];

    if(!json_country_list.includes(county)){
        obj["code"] = "COUNTRY_INVALID";
        return obj;
    }

    if(!suggestion){
        obj["code"] = "NO_SUGGESTION";
        return obj;
    }

    obj["data"] = {};
    obj["data"]["methods"] =  suggestion;


    return obj;

}
module.exports = { getPaymentSuggestion };