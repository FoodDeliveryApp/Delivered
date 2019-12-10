const { Client } = require('pg')
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json());
app.use(express.static('public'))

const client = new Client({
    user: "postgres",
    password: "PowerMax300",
    host: "localhost",
    port: 5432,
    database: "restaurant"
})


app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/login', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'public/html/login.html'))
})
app.get('/cookLogin', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'public/html/cookLogin.html'))
})
app.get('/deliveryLogin', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'public/html/deliveryLogin.html'))
})
app.get('/managerLogin', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'public/html/managerLogin.html'))
})
app.get('/salespersonLogin', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'public/html/salespersonLogin.html'))
})

app.get('/deliverySubs', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/html/deliverySubsystem.html'))
})
app.get('/CustomerRequest', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/html/CustomerRequest.html'))
})

app.get('/ManagerMain', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/html/ManagerMain.html'))
})

app.get('/PersonnelRequest', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/html/PersonnelRequest.html'))
})

app.get('/salesperson_product_list', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/html/salesperson_product_list.html'))
})

app.get('/CooksEditMenu', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/html/CooksEditMenu.html'))
})

app.get('/customer_restaurant_list', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/html/customer_restaurant_list.html'))
})

// get orders available for delivery
app.get("/getOrdersForDelivery", async (req, res) => {

    const rows = await getOrdersForBidding();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

// get customers to be Confirmed 
app.get("/getCustomersToBeConfirmed", async (req, res) => {
    const rows = await getCustomersToBeConfirmed();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

// clear notes of all signed in users
app.post("/clearSystem", async (req, res) => {
    let result = {}
    try {
        await clearSystem();
        result.success = true;
    }
    catch (e) {
        result.success = false;
    }
})

// customer signup
app.post("/signup", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        await insertCustomer(reqJson.fname, reqJson.lname, reqJson.passw, reqJson.em, reqJson.addr, reqJson.rest);
        result.success = true;
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

// user signin
app.post("/signin", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        if (await confirmUser(reqJson.email, reqJson.passw, reqJson.rest)) {
            console.log("yayyy");
            await markLoggedIn(reqJson.email);

            if (reqJson.type == 0) {
                res.redirect('/customer_restaurant_list');
            } else if (reqJson.type == 1) {
                res.redirect('/CustomerRequest');
            } else if (reqJson.type == 2) {
                res.redirect('/deliverySubs');
            } else if (reqJson.type == 3) {
                res.redirect('/salesperson_product_list');
            } else {
                res.redirect('/CooksEditMenu');
            }
        } else {
            console.log("didn't work");
            if (reqJson.type == 0) {
                res.redirect('/login');
            } else if (reqJson.type == 1) {
                res.redirect('/managerLogin');
            } else if (reqJson.type == 2) {
                res.redirect('/deliveryLogin');
            } else if (reqJson.type == 3) {
                res.redirect('/salespersonLogin');
            } else {
                res.redirect('/cookLogin');
            }
        }
        res.end();
        result.success = true;
    }
    catch (e) {
        result.success = false;
    }

})

// manager signup
app.post("/manager_signup", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        await insertManager(reqJson.restaurant, reqJson.fname, reqJson.lname, reqJson.passw, reqJson.em);
        result.success = true;
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))

    }
})

// delivery signup
app.post("/delivery_signup", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        await insertDeliveryPerson(reqJson.fname, reqJson.lname, reqJson.passw, reqJson.em, reqJson.rest);
        result.success = true;
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))

    }
})

// cooks signup
app.post("/cooks_signup", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        await insertCook(reqJson.fname, reqJson.lname, reqJson.passw, reqJson.em, reqJson.rest);
        result.success = true;
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

// salesperson signup
app.post("/saleperson_signup", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        await insertSalesperson(reqJson.fname, reqJson.lname, reqJson.passw, reqJson.em, reqJson.rest);
        result.success = true;
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(result)
    }
})

// update confirmation status of customers
app.post("/updateIsConfermedCust", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        await updateStatus(reqJson.lname);
        result.success = true;
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

// move customer to blacklist
app.post("/moveToBlacklist", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        await moveToBlacklist(reqJson.lname);
        result.success = true;
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

// update personnel payment
app.post("/setPayment", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        await setPayment(reqJson.fname, reqJson.lname, reqJson.amount, reqJson.type);
        result.success = true;
    }
    catch (e) {
        result.success = false;
    }
    finally {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

app.listen(8080, () => {
    console.log('App listening on port 8080')
})

start()

async function start() {
    await connect();
}

async function connect() {
    try {
        await client.connect();
    }
    catch (e) {
        console.error(`Failed to connect ${e}`)
    }
}


async function confirmUser(email, password, restaurant) {
    try {

        let user_password = await client.query("select password from users where email=$1", [email]);
        let is_confirmed = await client.query("select is_confirmed from user_restaurant where (user_id = (select user_id from users where email = $1)) and (restaurant_id = (select restaurant_id from restaurants where restaurant_name=$2))", [email, restaurant]);
        user_password = user_password.rows[0].password;
        is_confirmed = is_confirmed.rows[0].is_confirmed;


        if (user_password == password && is_confirmed) {
            return true;
        } else {
            return false;
        }
    }
    catch (e) {
        return false;
    }

}
async function insertCustomer(first_name, last_name, password, email, address, rest) {
    try {
        await client.query("with ins as (insert into users(user_type,first_name,last_name ,password,email, created_on) values(0, $1,$2, $3, $4, current_timestamp) returning user_id as user_id), ins1 as (insert into user_restaurant (user_id, restaurant_id, is_confirmed) values ((select user_id from ins), (select restaurant_id from restaurants where restaurant_name = $5), $6) returning user_id as user_id) insert into customers(user_id, rating, address) values ((select user_id from ins1), 0, $7)", [first_name, last_name, password, email, rest, false, address]);
        return true;
    }
    catch (e) {
        return false;
    }
}

async function insertManager(restaurant_name, first_name, last_name, password, email) {
    try {
        await client.query("with ins as (insert into users(user_type,first_name,last_name ,password,email, created_on) values(1, $1,$2, $3, $4, current_timestamp) returning user_id as user_id) insert into managers (user_id, restaurant_id) values ((select user_id from ins), (select restaurant_id from restaurants where restaurant_name=$5))", [first_name, last_name, password, email, restaurant_name]);
        return true;
    }
    catch (e) {
        return false;
    }
}

async function insertCook(first_name, last_name, password, email, restaurant) {
    try {
        await client.query("with ins as (insert into users(user_type,first_name,last_name ,password,email, created_on) values(4, $1,$2, $3, $4, current_timestamp) returning user_id as user_id), ins1 as (insert into user_restaurant (user_id, restaurant_id, is_confirmed) values ((select user_id from ins), (select restaurant_id from restaurants where restaurant_name = $5), $6) returning user_id as user_id) insert into cooks (user_id, rating, salary, dropped_food_strike, warnings) values ((select user_id from ins1), $7,$8,$9,$10)", [first_name, last_name, password, email, restaurant, false, 0, 0, 0, 0]);
        return true;
    }
    catch (e) {
        return false;
    }
}

async function insertDeliveryPerson(first_name, last_name, password, email, rest) {
    try {
        await client.query("with ins as (insert into users(user_type,first_name,last_name ,password,email, created_on) values(2, $1,$2, $3, $4, current_timestamp) returning user_id as user_id), ins1 as (insert into user_restaurant (user_id, restaurant_id, is_confirmed) values ((select user_id from ins), (select restaurant_id from restaurants where restaurant_name = $5), $6) returning user_id as user_id) insert into delivery_people (user_id, rating, salary, last_3deliveries_avg_rating, warnings) values ((select user_id from ins1),$7,$8,&9,$10)", [first_name, last_name, password, email, rest, false, 0, 0, 0, 0]);
        return true;
    }
    catch (e) {
        return false;
    }
}

async function insertSalesperson(first_name, last_name, password, email, restaurant) {
    try {
        await client.query("with ins as (insert into users(user_type,first_name,last_name ,password,email, created_on) values(3, $1,$2, $3, $4, current_timestamp) returning user_id as user_id), ins1 as (insert into user_restaurant (user_id, restaurant_id, is_confirmed) values ((select user_id from ins), (select restaurant_id from restaurants where restaurant_name = $5),$6) returning user_id as user_id)  insert into salespeople (user_id, rating, comission, good_rating_strike, bad_rating_strike,warnings) values ((select user_id from ins1),$7,$8,$9,$10,$11)", [first_name, last_name, password, email, restaurant, false, 0, 0, 0, 0, 0]);
        return true;
    }
    catch (e) {
        return false;
    }
}



//change status of custoemr to confirmed
async function updateStatus(last_name) {
    try {
        await client.query("UPDATE user_restaurant SET is_confirmed = $1 WHERE (user_id = (select user_id from users where last_name = $2)) and (restaurant_id = (select restaurant_id from user_restaurant where user_id=(select user_id from users where currently_signed_in))) and (not is_blacklisted)", [true, last_name]);
    }
    catch (e) {
        return false;
    }
}

// move customer to blacklist

async function moveToBlacklist(last_name) {
    try {
        await client.query("UPDATE user_restaurant SET is_blacklisted = $1, is_vip = $2, is_comfirmed=$3 WHERE (user_id = (select user_id from users where last_name = $4)) and (restaurant_id = (select restaurant_id from user_restaurant where user_id=(select user_id from users where currently_signed_in)))", [true, false, false, last_name]);
    }
    catch (e) {
        return false;
    }
}

async function getOrdersForBidding() {
    try {
        const results = await client.query("select orders.address, orders.created_on, customers.rating from orders, customers where (orders.user_id = customers.user_id and (orders.delivery_id is null))");
        return results.rows;
    }
    catch (e) {
        return [];
    }
}

async function getCustomersToBeConfirmed() {
    try {
        const results = await client.query("select first_name, last_name, email from users where (user_type = 0) and (user_id in (select user_id from user_restaurant where (restaurant_id = (select restaurant_id from user_restaurant where user_id = (select user_id from users where currently_signed_in))) and (not is_confirmed) and (not is_blacklisted)))");
        return results.rows;
    }
    catch (e) {
        return [];
    }
}

async function clearSystem() {
    try {
        await client.query("UPDATE users SET currently_signed_in = $1 WHERE currently_signed_in", [false]);
        return true;
    }
    catch (e) {
        return false;
    }
}

async function markLoggedIn(email) {
    try {
        await client.query("UPDATE users SET currently_signed_in = $1 WHERE email = $2", [true, email]);
        console.log("I am at markLoggenIn");

        return true;
    }
    catch (e) {
        return false;
    }
}

async function setPayment(last, first, payment, type) {
    try {
        if (type == "Cook") {
            await client.query("UPDATE cooks SET salary = $1 WHERE user_id = (select user_id from users where last_name = $2 and first_name = $3)", [payment, last, first]);

        } else if (type == "Delivery Person") {
            await client.query("UPDATE delivery_people SET salary = $1 WHERE user_id = (select user_id from users where last_name = $2 and first_name = $3)", [payment, last, first]);
        } else {
            await client.query("UPDATE salespeople SET salary = $1 WHERE user_id = (select user_id from users where last_name = $2 and first_name = $3)", [payment, last, first]);
        }

        return true;
    }
    catch (e) {
        return false;
    }
}