const config = require("../../../../config.js");
const conf_service = config.getConfig("service");

const sql = require("../../../sql/sql.js").sql;


const stripe = require('../../../stripe.js').stripeAPI();


async function endpoint(api_request, obj, post) {
    const stripeAPI = await stripe;

    obj["data"] = {};

    if (api_request[1] == undefined || api_request[2] == undefined) {
        obj["code"] = "ENDPOINT_METHODS_ASK_ADD_NULL";
        return obj;
    }
    const customer_details = JSON.parse(JSON.stringify(require("../../../../data/methods/customer_details.json")));
    const methods = JSON.parse(JSON.stringify(require("../../../../data/methods/types.json")));

    if (!methods.includes(api_request[2])) {
        obj["code"] = "ENDPOINT_METHODS_ASK_ADD_INVALID";
        return obj;
    }

    const query = await sql.query("SELECT * FROM customers WHERE local_id=?", api_request[1]);
    let customer = {};
    if(query.length > 0){
        try {
            customer = await stripeAPI.customers.retrieve(query[0]["stripe_id"]);
        } catch(e) {}
    }
    


    obj["data"]["billing_details"] = require("../../../../data/methods/types/" + api_request[2] + ".json")


    function deepValue(obj, path) {
        for (let value of path) {
            obj = obj?.[value];
        };
        return obj;
    };

    // inject value from customer data into customer_details
    function injectCustomerData(data, path = undefined) {
        for (const [key, value] of Object.entries(data)) {
            let local_path = path ? `${path}.${key}` : key;

            if (typeof value === 'object') injectCustomerData(value, local_path)
            else deepValue(customer_details, path.split('.')).value = deepValue(customer, path.split('.')) ?? "";
        }
    }

    injectCustomerData(customer_details)


    obj["data"]["customer_details"] = customer_details;


    return obj;
}
module.exports = { endpoint };