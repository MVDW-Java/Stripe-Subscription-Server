const config = require("../config.js");

async function stripeAPI() {
    const conf_service = await config.getConfig("service");
    return require('stripe')(conf_service.stripe_secret);
}

module.exports = { stripeAPI };