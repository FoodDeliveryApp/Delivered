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

// get orders available for delivery
app.get("/getOrdersForDelivery", async (req, res) => {

    const rows = await getOrdersForBidding();
    res.setHeader("content-type", "application/json")
    res.send(JSON.stringify(rows))
})

// customer signup
app.post("/signup", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        await insertCustomer(reqJson.fname, reqJson.lname, reqJson.passw, reqJson.em, reqJson.addr);
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

// customer signin
app.post("/signin", async (req, res) => {
    let result = {}
    try {
        const reqJson = req.body;
        if (await confirmUser(reqJson.email, reqJson.passw, reqJson.rest)) {
            // console.log("yayyy");
            res.redirect('/deliverySubs');
            //res.json({ "message": "success" });
        } else {
            //res.json({ "message": "fail" });

            console.log("whoo")
            result.success = false;
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
        await insertDeliveryPerson(reqJson.fname, reqJson.lname, reqJson.passw, reqJson.em);
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
        await insertSalesperson(reqJson.fname, reqJson.lname, reqJson.passw, reqJson.em);
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
        let is_confirmed = await client.query("select is_confirmed from vip_association where (user_id=(select user_id from users where email = $1) and (restaurant_id = (select restaurant_id from restaurants where restaurant_name=$2)))", [email, restaurant]);
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
async function insertCustomer(first_name, last_name, password, email, address) {
    try {
        await client.query("with ins as (insert into users(user_type,first_name,last_name ,password,email, created_on) values(0, $1,$2, $3, $4, current_timestamp) returning user_id as user_id) insert into customers(user_id, rating, address) values ((select user_id from ins), 0, $5)", [first_name, last_name, password, email, address]);
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
        await client.query("with ins as (insert into users(user_type,first_name,last_name ,password,email, created_on) values(4, $1,$2, $3, $4, current_timestamp) returning user_id as user_id) insert into cooks (user_id, rating, salary, dropped_food_strike, warnings, restaurant_id) values ((select user_id from ins), $5,$6,$7,$8,(select restaurant_id from restaurants where restaurant_name=$9))", [first_name, last_name, password, email, 0, 0, 0, 0, restaurant]);
        return true;
    }
    catch (e) {
        return false;
    }
}

async function insertDeliveryPerson(first_name, last_name, password, email) {
    try {
        await client.query("with ins as (insert into users(user_type,first_name,last_name ,password,email, created_on) values(2, $1,$2, $3, $4, current_timestamp) returning user_id as user_id) insert into delivery_people (user_id, rating, salary, last_3deliveries_avg_rating, warnings) values ((select user_id from ins), $5, $6,$7,$8)", [first_name, last_name, password, email, 0, 0, 0, 0]);
        return true;
    }
    catch (e) {
        return false;
    }
}

async function insertSalesperson(first_name, last_name, password, email) {
    try {
        await client.query("with ins as (insert into users(user_type,first_name,last_name ,password,email, created_on) values(3, $1,$2, $3, $4, current_timestamp) returning user_id as user_id) insert into salespeople (user_id, rating, comission, good_rating_strike, bad_rating_strike,warnings) values ((select user_id from ins), $5,$6,$7,$8,$9)", [first_name, last_name, password, email, 0, 0, 0, 0, 0]);
        return true;
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


