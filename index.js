require('dotenv').config();
var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");
const e = require("express");
// const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

// used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());
// app.options('*',cors());
// var allowCrossDomain = function(req,res,next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Content-Security-Policy', "img-src 'self'");
//     next();
// }
// app.use(allowCrossDomain);

// create user account
app.get("/account/create/:name/:email/:password/:uid", function (req, res) {
  // check if account exists
  dal.find(req.params.email).then((users) => {
    // if user already exists, return error message
    if (users.length > 0) {
      console.log("User already in exists");
      res.send("User already in exists");
    } else {
      // else create user
      dal
        .create(req.params.name, req.params.email, req.params.password, req.params.uid)
        .then((user) => {
          console.log(user);
          res.send(user);
        });
    }
  });
});

// login user
app.get("/account/login/:email/:password/:uid", function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    // && user[0]._id.str === req.params.uid
    if (user.length > 0 ) {
      if (user[0].password === req.params.password) {
        res.send(user[0]);
      } else {
        res.send("Login failed: wrong password");
      }
    } else {
      res.send("Login failed: user not found");
    }
  });
});

// find user account
app.get("/account/find/:email", function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get("/account/findOne/:email", function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get("/account/update/:email/:amount", function (req, res) {
  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// all accounts
app.get("/account/all", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

var port = 3000;
app.listen(port);
console.log("Running on port: " + port);
console.log(process.env);
