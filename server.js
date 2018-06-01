const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const logger = require("morgan");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require("./config/keys");
let token = require("./config/token").token; 
// LocalStrategy = require('passport-local').Strategy;

// Included for testing
const { google } = require('googleapis');

const app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// configure local passport
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

// configure logger 
app.use(logger("dev"));

// Requiring our models for syncing
var db = require("./models");

// Routes
// =============================================================
require("./controllers/api-routes.js")(app);
require("./controllers/html-routes.js")(app);

const user = {
    name: "bob",
    password: "password",
    id: 1
};

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: keys.google.client_id,
  clientSecret: keys.google.client_secret,
  callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
    //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //    return done(err, user);
    //  });
    console.log("accessToken is: " + accessToken); 
    console.log("refreshToken is: " + refreshToken); 
    console.log("profile is: " + profile); 

    token = accessToken; 

    console.log("The token is: " + token)

    return done(null, user)
}
));

try {
  const content = keys.google
  authorize(content, listEvents);
} catch (err) {
  return console.log('Error loading client secret file:', err);
}

/**
* Create an OAuth2 client with the given credentials, and then execute the
* given callback function.
* @param {Object} credentials The authorization client credentials.
* @param {function} callback The callback to call with the authorized client.
* @return {function} if error in reading credentials.json asks for a new one.
*/
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  oAuth2Client.setCredentials(token);
  callback(oAuth2Client);
}

function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, data) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
}







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

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
      done( null, user);
      // done( err, user); this is the original
    // });
  });


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




// // Load client secrets from a local file.
// try {
//   const content = keys.google
//   authorize(content, listEvents);
// } catch (err) {
//   return console.log('Error loading client secret file:', err);
// }

// /**
// * Create an OAuth2 client with the given credentials, and then execute the
// * given callback function.
// * @param {Object} credentials The authorization client credentials.
// * @param {function} callback The callback to call with the authorized client.
// * @return {function} if error in reading credentials.json asks for a new one.
// */
// function authorize(credentials, callback) {
//   const { clientSecret, clientId, redirectUri } = credentials;
//   const oAuth2Client = new google.auth.OAuth2(
//       clientId, clientSecret, redirectUri);

//   oAuth2Client.setCredentials(token);
//   callback(oAuth2Client);
// }

