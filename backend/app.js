require('dotenv').config()

var createError = require('http-errors');
var express = require('express');

var apiRouter = require('./routes/api');
var indexRouter = require('./routes/index');

var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_API_URI
  }),
  audience: process.env.AUTH0_API_AUDIENCE,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: [process.env.AUTH0_ALGO]
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(jwtCheck);

app.use('/api', jwtCheck, apiRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send("not found");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
