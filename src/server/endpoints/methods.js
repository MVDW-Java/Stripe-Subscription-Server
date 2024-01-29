
const json_country_suggestions = require("../../data/country_suggestions.json"); 
const json_country_list = require("../../data/country_list.json"); 

// /method/{country}
async function endpoint(api_request, obj){
    var county = api_request[1];
    var suggestion = json_country_suggestions[county];

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
module.exports = { endpoint };