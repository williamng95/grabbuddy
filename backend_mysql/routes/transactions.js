const express = require('express');
const {query} = require('../db/dbconn');

var router = express.Router();
var table = 'transactions';
var table2 = 'transaction_categories';

router.get('/categories', function (req, res, next) {
    query(`select * from ${table2}`,res)    
 });

router.get('/all', function (req, res, next) {
    query(`select * from ${table}`,res)    
  });

router.get('/by-tid', function (req, res, next) {
    if (req.query.id.length === 0 || isNaN(req.query.id)) {
        console.log(`Invalid ID received. ID: ${req.query.id}`);
        res.status(400).send(`Invalid ID ${req.query.id} received.`);
        return;

    } else {
        query(`select *
        from ${table}
        where id = ${req.query.id}`,res)
    }   
});

router.get('/category', function (req, res, next) {
    if (req.query.cat.length === 0 ) {
        console.log(`Invalid ID received. ID: ${req.query.id}`);
        res.status(400).send(`Invalid ID ${req.query.id} received.`);
        return;

    } else {
        query(`select *
        from ${table2}
        where category = '${req.query.cat}'`,res)
    }   
});

//SELECT * FROM transaction_categories where category = 'WINE';

/*
router.post('/users/', createUser);

router.delete('/users/:id', deleteUser); //index number

router.patch('/users/:id', updateUser); //index number
*/

router.post('/add', function (req, res, next) {
    const newrow = req.body;
        //check for data types
    if(newrow.category === undefined || isNaN(newrow.transaction_amount) || isNaN(newrow.payer_id)  || isNaN(newrow.payee_id)) {
        console.log('unable to process');
        return ('error');
    } else {
        console.log('check category');

        catcheck= query(`select *
        from ${table2}
        where category = '${req.query.cat}'`,res);
        console.log('ok here');
        if (catcheck) {
            const newquery = `
            INSERT INTO ${table} (category,transaction_amount,payer_id,payee_id)
            VALUES ('${newrow.category}','${newrow.transaction_amount}','${newrow.payer_id}','${newrow.payee_id}');`;
            console.log(newquery);
            query(newquery,res);
            console.log('Data insert successful');
            return('ok');
        } else {
            return ('Category not defined');
        }

    }      
});

module.exports = router;