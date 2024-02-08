const config = require("../../../config.js");
const sql = require("../../sql.js").sql;

const stripe = require('stripe')(config.getConfig("service")["stripe_secret"]);


async function askAddCustomerMethods(api_request, obj, post) {

    const query = await sql.query("SELECT * FROM customers WHERE id=?", api_request[1]);


    const billing_details = {
        "address": {
            "city": {
                "required": true, "value": query[0]?.city ?? null,
            },
            "country": {
                "required": true, "value": query[0]?.country ?? null,
            },
            "line1": {
                "required": true, "value": query[0]?.line1 ?? null,
            },
            "line2": {
                "required": false, "value": query[0]?.line2 ?? null,
            },
            "postal_code": {
                "required": true, "value": query[0]?.postal_code ?? null,
            },
            "state": {
                "required": true, "value": query[0]?.state ?? null,
            },
        },
        "email": {
            "required": true, "value": query[0]?.email ?? null,
        },
        "name": {
            "required": true, "value": query[0]?.name ?? null,
        },
        "phone": {
            "required": true, "value": query[0]?.phone ?? null,
        }
    };



    obj["data"] = {};
    obj["data"]["billing"] = billing_details;


    return obj;
}
module.exports = { askAddCustomerMethods };