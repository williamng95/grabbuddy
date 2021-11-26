const express = require('express');
const {query} = require('../db/dbconn');

var router = express.Router();

//  To get all the users.
router.get("/user/all", function (request, response) => {
  query("select * from users", (error, records) => {
    if (error) {
      console.log(error);
      response.status(500).send("Some error ocurred while executing query");
    } else {
      response.status(200).send(records);
    }
  });
});

//user by id
router.get("/user/by-id", function (request, response) => {
  if (!request.query.id) {
    console.log("Received invalid id: " + request.query.id);
    response.status(400).send("Received invalid id");
  } else {
    query(
      `select * from users where id = ${request.query.id}`,
      (error, records) => {
        if (error) {
          console.log(error);
          response.status(500).send("Some error ocurred while executing query");
        } else {
          response.status(200).send(records);
        }
      }
    );
  }
});

// To add a new user to our database
router.post("/user/add", function (request, response) => {
    query(
      `insert into users (first_name, last_name, mobile, email, login_id, login_password, user_type)
      values ( 
        '${request.body.first_name}',
        '${request.body.last_name}',
        ${request.body.mobile}, 
        '${request.body.email}',
        '${request.body.login_id}',
        '${request.body.login_password}',
        '${request.body.user_type}')`,
  
      (error, records) => {
        if (error) {
          console.log(error);
          response.status(500).send("Some error ocurred while executing query");
        } else {
          response.status(200).send("User added to the database!");
        }
      }
    );
  });

// To change user type
router.get("/user/change-type", function (request, response) => {
    if (!request.query.id) {
      console.log("Received invalid id: " + request.query.id);
      response.status(400).send("Received invalid id");
    } else {
      query(
        `update users set user_type=${request.query.user_type} where id = ${request.query.id}`,
        (error, records) => {
          if (error) {
            console.log(error);
            response.status(500).send("Some error ocurred while executing query");
          } else {
            response.status(200).send(`User type of id ${request.query.id} has been updated to ${request.query.user_type}`);
          }
        }
      );
    }
  });
  



module.exports = router;
