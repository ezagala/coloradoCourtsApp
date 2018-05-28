// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

// Require Passport

// Set up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models")
