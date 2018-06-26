const path = require("path");

// Routes
// =============================================================
module.exports = function (app, passport) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  })

  // Local passport authentication
  app.post('/login', passport.authenticate('local-login', {
      successRedirect: '/account',
      failureRedirect: '/',
    })
  );

  // signup route loads signup.html
  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  })

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    console.log('req.user', req.user);
    if (req.user) {
      return res.json('/account');
    }
    return res.status(400).end();
  }); 

  // myaccount route loads myaccount.html
  // isAuthenticated argument removed for testing purposess
  app.get("/account", isLoggedIn, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/myaccount.html"));
  })

  // calendar route loads calendar.html
  app.get("/availability", isLoggedIn, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/availability.html"));
  })  


  // Sign out route 
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

};

// This is currently busted. Probably a result of the isAuthenticated method
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.user) {
      console.log("You're authed motherfucker")
      return next();
    }
  // if they aren't redirect them to the home page
  res.redirect('/');
  console.log("You're not authenticated.")
}