require('dotenv').config()
const sqlite3 = require('sqlite3');

// const properties = {
//     host: `${process.env.DBHOST}`,
//     port: process.env.DBPORT,
//     user: `${process.env.DBUSER}`,
//     password: `${process.env.DBPASSWD}`,
//     database: `${process.env.DBNAME}`,
//     multipleStatements: true,
// };

let db = new sqlite3.Database('./test.db');

    

function query(query_str, res, callback){
    records = db.all(query_str,[], (errors, records)=>{
        if (errors) {
            res.status(500).send('server error')
            return 
        }
        if (res) {
            res.status(200).json(records)
        } 
        if (callback) callback(records)
    })

    }


module.exports={ query}


