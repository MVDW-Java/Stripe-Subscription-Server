
const json_country_suggestions = require("../../data/country_suggestions.json"); 

// /method/{country}
async function endpoint(api_request, obj){
    var county = api_request[1];
    var suggestion = json_country_suggestions[county];

    if(!suggestion){
        obj["code"] = "COUNTRY_INVALID";
        return obj;
    }


    obj["data"] = {};
    obj["data"]["methods"] =  suggestion;


    return obj;

}
module.exports = { endpoint };