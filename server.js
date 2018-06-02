const express = require("express")
const bodyParser = require("body-parser")
const session = require("express-session")
const logger = require("morgan")
const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const keys = require("./config/keys")
// LocalStrategy = require('passport-local').Strategy;


const app = express()
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// configure local passport
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"))

// configure logger 
app.use(logger("dev"))

// Requiring our models for syncing
var db = require("./models");

// Routes
// =============================================================
require("./controllers/api-routes.js")(app);
require("./controllers/html-routes.js")(app);


// configure logger 
// app.use(logger("dev"))


const user = {
    name: "bob",
    password: "password",
    id: 1
}


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
// passport.use(new GoogleStrategy({
//   clientID: keys.google.clientID,
//   clientSecret: keys.google.clientSecret,
//   callbackURL: "/auth/google/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//     //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //    return done(err, user);
//     //  });
//     console.log(profile)

//     return done(null, user)
// }
// ));




// defining  local authentication strategy 
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     // USER IS A MODEL NEED TO UPDATE
    
//     if (!username === user.name){
//         return done(null, false, { message: "incorrect username"})
//     } 
//     if (!password === user.password){
//         console.log(password, user.password)
//         return done(null, false, { message: "incorrect password"})
//     }
//     return done(null, user)
    
    
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
//   }
// ));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
// passport.deserializeUser(function(id, done) {
//     // User.findById(id, function(err, user) {
//       done( null, user);
//       // done( err, user); this is the original
//     // });
//   });

// Whit had the port commented out 
// app.listen(PORT)

// Lines 113 through 119 were deleted from whit's file 
// Syncing our sequelize models and then starting our Express app
// =============================================================
//db.sequelize.sync({ force: true }).then(function() {
  //app.listen(PORT, function() {
   // console.log("App listening on PORT " + PORT);
 // });
//});

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
  
module.exports = app