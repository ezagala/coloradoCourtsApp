const path = require("path");
const passport = require("passport");
const express = require("express")
// const router = express.Router()

const isAuthenticated = (request, response, next) => {
  if ( !request.user ) {
      // request.flash('You must be logged in for that.')
      response.redirect('/')
  } else {
      return next()
  }
}
// const app = express();

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  })

  // signup route loads signup.html
  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  })

  // myaccount route loads myaccount.html
  app.get("/account", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/myaccount.html"));
  })

  // calendar route loads calendar.html
  app.get("/calendar", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/calendar.html"));
  })


// passport authentication with google
app.get('/auth/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login',"https://www.googleapis.com/auth/calendar"]}));
// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });

  // Local passport authentication
  // app.post('/login',
  //   passport.authenticate('local', {
  //     successRedirect: '/account',
  //     failureRedirect: '/',
  //     // failureFlash: true
  //   })
    // function(req,res){
    //   console.log("redirect")
    //   res.redirect("/")
    // }
  // );
};
