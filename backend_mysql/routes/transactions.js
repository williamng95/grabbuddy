const express = require('express');
const {connection, query} = require('../db/dbconn');

var router = express.Router();
var table = 'transactions';
var table2 = 'transaction_categories';
var table3 = 'accounts';

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
        // console.log(check_restrictions(req.query.id))
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

router.delete('/delete', function (req, res, next) {
    if (req.query.id.length === 0 || isNaN(req.query.id)) {
        console.log(`Invalid ID received. ID: ${req.query.id}`);
        res.status(400).send(`Invalid ID ${req.query.id} received.`);
        return;

    } else {
        query(`DELETE
        from ${table}
        where id = ${req.query.id}`,res)
    }   
});

router.patch('/update',function (req, res, next) {
    const id = req.query.id;

    if (req.query.id.length === 0 || isNaN(req.query.id)) {
        console.log(`Invalid ID received. ID: ${req.query.id}`);
        res.status(400).send(`Invalid ID ${req.query.id} received.`);
        return;
    } else {
        const newrow = req.body;
        //check for data types
        let fields = Object.entries(newrow);
        let mytext=''
        
        for (let item=0; item < fields.length; item++) {
            //ignore null
            if (fields[item][1]=== null ||fields[item][1]=== undefined) {
                //do nothing
            } else {
                mytext = mytext+ fields[item][0]+'=\''+fields[item][1]+'\', '
            }  
        }
        //remove last comma
        mytext = mytext.replace(/, $/," ");

        const querytext = `UPDATE ${table} SET ${mytext} WHERE id=${id}`;
            
        query(querytext,res);
    }      
});
    
async function check_restrictions(account_id) {
    records = await query(`select restricted_transaction 
        from accounts 
        where id = ${account_id}`)
    console.log(records)
}

router.post('/add', function (req, res, next) {
    const newrow = req.body;
        //check for data types
    if(newrow.category === undefined || isNaN(newrow.transaction_amount) || isNaN(newrow.payer_id)  || isNaN(newrow.payee_id)) {
        console.log('unable to process');
        return ('error');
    } else {
//        console.log('check category');

        const newquery = `
        INSERT INTO ${table} (category,transaction_amount,payer_id,payee_id)
        VALUES ('${newrow.category}','${newrow.transaction_amount}','${newrow.payer_id}','${newrow.payee_id}');
        UPDATE ${table3} SET wallet_balance = wallet_balance -${newrow.transaction_amount} WHERE id=${newrow.payer_id}; 
        UPDATE ${table3} SET wallet_balance = wallet_balance +${newrow.transaction_amount} WHERE id=${newrow.payee_id}; 
        `;
   
        query(newquery,res);
        return('Tranasction created');

    }      
});

module.exports = router;