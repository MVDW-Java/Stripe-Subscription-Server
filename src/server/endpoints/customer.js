

// customer/{identification}/{task}
async function endpoint(api_request, obj, sql, post = null){

    var customer = await sql.query('select * from customers where id="' + api_request[1] + '"');

    console.log(customer.name);
    console.log(customer.length);








    obj["data"] = {};
    obj["data"]["methods"] =  "This is a template for " + api_request[1];


    return obj;

}



async function createCustomer(api_request, obj, post){

}














module.exports = { endpoint };