const express = require('express');
const {query} = require('../db/dbconn');

var router = express.Router();

router.get('/transaction_codes', function (req, res, next) {
    query('select * from transaction_categories',res)    
 });


 
module.exports = router;