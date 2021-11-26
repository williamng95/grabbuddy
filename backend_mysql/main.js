require('dotenv').config()

const express = require('express')
const indexPage = require('./routes/index')
const apiPage = require('./routes/api')

let server = express();
let router = express.Router();


server.use(express.json())
// handle cors requests
server.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
  });

//   use routes
server.use(router)
server.use('/',indexPage)
server.use('/api',apiPage)

server.listen(3000,(error)=>{
    if (error){
        console.log(error)
    }else{
        console.log('server up')
    }
})