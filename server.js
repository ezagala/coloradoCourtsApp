const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const logger = require("morgan")
const passport = require('passport')
const flash = require('express-flash');

const app = express()
var PORT = process.env.PORT || 3000;

// passport stuff
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

// configure local passport
app.use(session({ secret: 'cats', resave: true, saveUninitialized: true  }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

//require('./config/passport')(passport);
app.use(express.static("public"))

// configure logger 
app.use(logger("dev"))

// error-handling

// Requiring our models for syncing
var db = require("./models");

// Routes
// =============================================================
require("./controllers/api-routes.js")(app, passport);

require("./controllers/html-routes.js")(app, passport);
  
// configure logger 
// app.use(logger("dev"))


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
  
module.exports = app