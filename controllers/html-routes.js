const path = require("path");
// const passport = require("passport");


const isAuthenticated = (request, response, next) => {
  if (!request.user) {
    // request.flash('You must be logged in for that.')
    response.redirect('/')
  } else {
    return next()
  }
}

// Routes
// =============================================================
module.exports = function (app, passport) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  })

  // Local passport authentication
  app.post('/login',
    passport.authenticate('local-login', {
      successRedirect: '/account',
      failureRedirect: '/',
    }),
    function (req, res) {
      console.log("redirect")
      res.redirect("/")
    }
  );

  // signup route loads signup.html
  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  })

  // process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/account', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

  // myaccount route loads myaccount.html
  // isAuthenticated argument removed for testing purposess
  app.get("/account", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/myaccount.html"));
  })

  // calendar route loads calendar.html
  app.get("/availability", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/availability.html"));
  })

  

  // Sign out route 
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

};