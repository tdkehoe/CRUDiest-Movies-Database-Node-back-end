// Dependencies
var express = require('express'); // connects Express
var app = express(); // create Express application object
require('dotenv').load();
var bodyParser = require('body-parser'); // connects body-parser
var movies = require('./routes/routes.js'); // connects routes.js

var cors = require('cors');
app.use(cors());

// Middleware stack
app.use(bodyParser.urlencoded({ extended: true })); // enables reading the body of a POST request
app.use(bodyParser.json()); // enables reading a JSON object in the body of POST request
app.use('/movies', movies); // middleware to serve routes

// Server
app.listen(process.env.PORT || 3000); // starts server
console.log("Woot! Server started on localhost:3000; press Ctrl-C to terminate.");
