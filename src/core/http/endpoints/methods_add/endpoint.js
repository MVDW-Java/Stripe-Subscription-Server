const config = require("../../../../config.js");
const stripe = require('../../../stripe.js').stripeAPI();

const sql = require("../../../sql/sql.js").sql;


async function endpoint(api_request, obj, post) {
    const stripeAPI = await stripe;
    obj["data"] = {};

    if (api_request[1] == undefined) {
        obj["code"] = "ENDPOINT_METHODS_ADD_NULL";
        return obj;
    }

    // TODO: add post verification



    // create customer if not exist
    const query = await sql.query("SELECT * FROM customers WHERE local_id=?", api_request[1]);
    let customer_id = "";
    if (query.length < 1) {
        const customer = await stripeAPI.customers.create({
            name: post["name"],
            email: post["email"],
            phone: post["phone"],
            address: {
                city: post["city"],
                country: post["country"],
                country: post["country"],
                line1: post["line1"],
                line2: post["line2"],
                postal_code: post["postal_code"],
                state: post["state"]
            }
        });
        customer_id = customer.id;
        try{
            await sql.query("INSERT INTO customers (local_id, stripe_id) VALUES (?, ?)", [api_request[1], customer_id]);

        } catch(e){
            console.log(e)
        }
        
    } else {
        customer_id = query[0]["stripe_id"];
    }



    return obj;

}



async function val() {
    const paymentMethod = await stripe.paymentMethods.create({
        type: api_request[2],
        card: {
            number: '4242424242424242',
            exp_month: 8,
            exp_year: 2026,
            cvc: '314',
        },
    });
}





module.exports = { endpoint };