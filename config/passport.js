var db = require("../models");

// set up according to https://scotch.io/tutorials/easy-node-authentication-setup-and-local

// load all the things we need
const LocalStrategy = require('passport-local').Strategy;

// load up the user model
var Vendor = require('../models/Vendor');

// expose this function to our app using module.exports
module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        console.log('serializeUser');
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        console.log('deserializeUser');
        Vendor.findById(id, function (err, user) {
            done(err, user);
        });
        //done(null, user);
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

 

        passport.use(new LocalStrategy(
            // Our user will sign in using an email, rather than a "username"
            {
              usernameField: 'email'
            },
            function(email, password, done) {
                console.log('>>>>>>>>>>>>>>>>>>>');
                console.log('email', email);
                console.log('password', password);
                console.log('>>>>>>>>>>>>>>>>>>>');
              // When a user tries to sign in this code runs
              db.Vendor.findOne({
                where: {
                  email
                }
              }).then(function(vendor) {
                console.log('vendor', vendor);
                // If there's no user with the given email
                if (!vendor) {
                  return done(null, false, {
                    message: "Incorrect email."
                  });
                }
                // If there is a user with the given email, but the password the user gives us is incorrect
                else if (!vendor.validPassword(password)) {
                  return done(null, false, {
                    message: "Incorrect password."
                  });
                }
                // If none of the above, return the user
                return done(null, vendor);
              });
            }
          ));

          console.log('created new local strategy');
};