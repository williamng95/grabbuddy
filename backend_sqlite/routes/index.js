var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Welcome to the GrabBuddy Wallet API, data is secured behind /api');
});

module.exports = router;
