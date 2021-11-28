const express = require('express');
const accountsAPI = require('./accounts')
const usersAPI = require('./users')
const transactionsAPI = require('./transactions')
// const questsAPI = require('./quests')

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(`list of endpoints:
  <ul>
  <li>users
    <ol>
    </ol>

  </li>

  <li>accounts
    <ol>    
    <li> GET /all list all accounts</li>
    <li> POST /create_account  add a new account</li>
      <ul>
      <li> body: {owner: ,type: , wallet_limit: , wallet_balance: , restricted_transactions: , allowed_transactions: } </li>
      <li> required: owner_id, type </li>
      <li> other possible fields: wallet_limit, wallet_balance, restricted_transactions, allowed_transactions
      </ul>
    </li>
    <li> GET /by_owner_id list account details under current owner</li>
      <ul>
      <li> query: owner_uid</li>
      </ul>
    <li> GET /balance_by_owner_id account balances for current owner</li>
      <ul>
      <li> query: owner_id</li>
      </ul>    
        <li> GET /by_id list account details for account id</li>
      <ul>
      <li> query: account_id</li>
      </ul>
    <li> GET /balance_by_id account balances for account id</li>
      <ul>
        <li> query: account_id</li>
      </ul>
    <li> PATCH /update_limit update limits of account id</li>
      <ul>
      <li> body: {account_id:xxx , update:{field: value}}</li>
      <li> update fields:  wallet_limit,retricted_transactions, allowed_transactions</li>
      </ul>
    </ol>
  </li>

  <li>transactions
  </li>
    <ol>
    <li> GET /categories return all transaction categories </li>
    <li> GET /all return all transactions </li>
    <li> GET /by-tid return all transactions by account id </li>
    <li> PATCH /update update past transaction 
      <ul>
        <li> query: id transaction id to update </li>
        <li> body: 
      </ul>
    </li>
    <li> GET /add return all transaction categories </li>
    </ol>
  </ul>
  `);
});

router.use('/accounts',accountsAPI)
router.use('/users',usersAPI)
router.use('/transactions',transactionsAPI)

module.exports = router;
