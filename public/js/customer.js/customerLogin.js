const { Pool, Client } = require('pg')
const connectionString = 'postgressql://postgres:PowerMax300/@localhost3000/restaurant'

const client = new Client({
    connectionString: connectionString
})

client.connect()
client.query('SELECT * from customers ', (err, res) => {
    console.log(err, res)
    client.end()
})