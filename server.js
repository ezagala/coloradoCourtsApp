const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const logger = require("morgan")
const passport = require('passport')
LocalStrategy = require('passport-local').Strategy;

const app = express()
var PORT = process.env.PORT || 3000;

require('./config/passport')(passport);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// configure local passport
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"))

// configure logger 
app.use(logger("dev"))

// error-handling

// Requiring our models for syncing
var db = require("./models");

// Routes
// =============================================================
require("./controllers/api-routes.js")(app);
require("./controllers/html-routes.js")(app);


// configure logger 
// app.use(logger("dev"))


const user = {
    name: "ejzagala@gmail.com",
    password: "password",
    id: 1
}

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
  
module.exports = app