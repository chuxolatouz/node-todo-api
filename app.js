/* jslint node: true */
"use strict";
var express = require("express");
var morgan = require("morgan");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
// Require configuration file defined in app/Config.js
var config = require("./app/Config");

// Sends static files  from the public path directory
app.use(express.static(path.join(__dirname, "/public")));

// Use morgan to log request in dev mode
app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

var port = config.APP_PORT || 4000;

app.listen(port); // Listen on port defined in config file

console.log("App listening on port " + port);

var todoRoutes = require("./app/Routes");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Pass to next layer of middleware
  next();
});
//  Use routes defined in Route.js and prefix it with api
app.use("/api", todoRoutes);
// Server index.html page when request to the root is made
app.get("/", function(req, res, next) {
  res.sendfile("./public/index.html");
});
