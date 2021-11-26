const express = require('express');
const accountsAPI = require('./accounts')
const usersAPI = require('./users')
const transactionsAPI = require('./transactions')
// const questsAPI = require('./quests')

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('list of endpoints:');
});

router.use('/accounts',accountsAPI)
router.use('/users',usersAPI)
router.use('/transactions',transactionsAPI)

module.exports = router;
