
async function endpoint(api_request, obj, post){

    obj["data"] = {};
    obj["data"]["methods"] =  "This is a template for " + api_request[1];


    return obj;

}
module.exports = { endpoint };