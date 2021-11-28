const express = require('express')
const { query } = require('../db/dbconn')

var router = express.Router()
router.get('/', function (req, res, next) {
    res.send(`
    accounts endpoints: 
    <ol>
    <li> GET /all </li>
    <li> POST (body) /create_account </li>
    <li> GET /by_uid \n </li>
    <li> GET /balance_by_uid \n </li>
    <li> PATCH (body) /update_limit \n </li>
    `)
})
// all accounts
router.get('/all', function (req, res, next) {
    query('select * from accounts', res)
})

// create account
router.post('/create_account', function (req, res, next) {
    // minimally required fields
    let reqFields = ['owner_id', 'type']
    // check all required fields are present
    if (!(reqFields.every((field)=>{
        return req.body.hasOwnProperty(field)
    }))) {
        res.status(400).send('needs at least an owner id and account type')
    }

    else {
        let keyvals = [[], []]
        for (let field in req.body) {
            keyvals[0].push(field)
            keyvals[1].push(`'${req.body[field]}'`)
        }
        let insertStatement =
            `insert into accounts 
            (${keyvals[0].join(',')}) 
            values (${keyvals[1].join(',')})`
        query(insertStatement, res)
    }

})

// accounts by user id
router.get('/by_uid', function (req, res, next) {
    var uid = req.query.owner_id
    if (!uid) {
        res.status(400).send('no owner id found')
    }
    else {
        query(`select * from accounts where owner_id=${uid}`, res)
    }

})

// get balance by owner id
router.get('/balance_by_uid', function (req, res, next) {
    var id = req.query.owner_id
    if (!id) {
        res.status(400).send('no account id found')
    }
    else {
        query(`select wallet_balance from accounts where id=${id}`, res)
    }

})

// accounts by account id
router.get('/by_id', function (req, res, next) {
    var uid = req.query.account_id
    if (!uid) {
        res.status(400).send('no owner id found')
    }
    else {
        query(`select * from accounts where id=${uid}`, res)
    }

})

// get balance by account id
router.get('/balance_by_id', function (req, res, next) {
    var id = req.query.account_id
    if (!id) {
        res.status(400).send('no account id found')
    }
    else {
        query(`select wallet_balance from accounts where id=${id}`, res)
    }

})

// account limits update {account_id:xxx , update:{field: value}}
router.patch('/update_limit',function (req, res, next){
    // aallowed fields
    accountId = req.body.account_id
    var allowedFields = ['wallet_limit', 'restricted_transaction','allowed_transaction']
    var toUpdate = Object.keys(req.body.update).every((field=>{
        return (allowedFields.includes(field))
    }))
    console.log(toUpdate)
    if (!accountId || !toUpdate) {
        res.status(400).send('bad limit update request')
    }
    else{
        updateQueryList = []
        for (let field in req.body.update) {
            updateQueryList.push(`${field} = '${req.body.update[field]}'`)
        }
        let updateStatement = 
        `update accounts set
        ${updateQueryList.join(',')}
        where id = ${req.body.account_id}
        `
        query(updateStatement,res)
    }
})



module.exports = router