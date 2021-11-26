require('dotenv').config()
const mysql = require('mysql');

/*
let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE
})
*/

const properties = {
    host: `${process.env.DBHOST}`,
    port: process.env.DBPORT,
    user: `${process.env.DBUSER}`,
    password: `${process.env.DBPASSWD}`,
    database: `${process.env.DBNAME}`,
};

// Create a connection object which will hold the connection to cloud mysql server.
let connection = mysql.createConnection(properties);

connection.connect((errors)=>{
    if (errors) console.log(errors);
    else console.log('connected')
    }
)    

function query(query_str, res){
    records = connection.query(
        query_str,
        (errors, records)=>{
            if (errors) console.log(errors)
            else res.status(200).json(records)
        }
    )
    return records
}

module.exports={connection, query}

