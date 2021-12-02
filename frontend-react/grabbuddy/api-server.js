const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");
const { Client } = require('pg');
const app = express();
require('dotenv').config();

const port = process.env.API_PORT || 3001;
const appPort = process.env.PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

console.log(process.env.REACT_APP_DATABASE_URL);
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

app.get("/api/external", checkJwt, (req, res) => {
  
  const client = new Client({
    connectionString: process.env.REACT_APP_DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }});  
    client.connect();
    let qs = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'gb' ORDER BY table_name;"
    let qs2= "SELECT * FROM gb.user";
    let query = client.query(qs, (err, result) => {
    console.log(client.query);
        
    if (err) throw err;
    //res.setHeader('Content-Type', 'application/json');
    //res.json(result.rows);
    //client.end();
    
    res.send({
      msg: `Your access token was successfully validated! ${JSON.stringify(result.rows)}`,
    });
    client.end();

    });
  

});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
