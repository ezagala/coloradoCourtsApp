const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const logger = require("morgan")
const passport = require('passport'), 
LocalStrategy = require('passport-local').Strategy;


const app = express()
const htmlroutes = require("./controllers/html-routes")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");

// Routes
// =============================================================
require("./controllers/api-routes.js")(app);
require("./controllers/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

// configure logger 
app.use(logger("dev"))

// configure passport
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"))

const user = {
    name: "bob",
    password: "password",
    id: 1
}

// defining authentication strategy 
passport.use(new LocalStrategy(
  function(username, password, done) {
    // USER IS A MODEL NEED TO UPDATE
    
    if (!username === user.name){
        return done(null, false, { message: "incorrect username"})
    } 
    if (!password === user.password){
        console.log(password, user.password)
        return done(null, false, { message: "incorrect password"})
    }
    return done(null, user)
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));

app.use("/", htmlroutes)
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
      done( null, user);
    //   done( err, user); this is the original
    // });
  });

  app.listen(3000)

  module.exports = app