const path = require("path");
const passport = require("passport");
const express = require("express")
const router = express.Router()

const isAuthenticated = (request, response, next) => {
  if ( !request.user ) {
      // request.flash('You must be logged in for that.')
      response.redirect('/')
  } else {
      return next()
  }
}


// Routes
// =============================================================
module.exports = router

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  .get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  })

  // signup route loads signup.html
  .get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  })

  // myaccount route loads myaccount.html
  .get("/account", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/myaccount.html"));
  })

  // calendar route loads calendar.html
  .get("/calendar", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/calendar.html"));
  })

  .post('/login',
    passport.authenticate('local', {
      successRedirect: '/account',
      failureRedirect: '/',
      // failureFlash: true
    })
    // function(req,res){
    //   console.log("redirect")
    //   res.redirect("/")
    // }
  );

