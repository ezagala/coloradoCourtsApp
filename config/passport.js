var db = require("../models");
const bcrypt = require("bcrypt-nodejs");

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
        console.log("The id is" + JSON.stringify(id))
        db.Vendor.findById(id.id).then( (err, user) => {
            done(err, user); 
        })
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

/*
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
*/

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, email, password, done) {
            console.log('Inside passport callback');
            // asynchronous
            // Vendor.findOne wont fire unless data is sent back
            process.nextTick(function () {
                console.log('Inside process callback');
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                //Vendor.findOne({ where: { username: username } }, function(err, user) 
                db.Vendor.findOne({
                    where: {
                        email: email
                    }
                }).then((err, vendor) => {
                    // if there are any errors, return the error
                    if (err) {
                        console.log('err', err);
                        return done(err);
                         
                    }
                    // check to see if theres already a user with that email
                    if (vendor) {
                        console.log('Inside if block that checks to see if user exists');
                        return done(null, false, {
                            message: "This email already exists"
                        });
                    } else {
                        console.log('Inside else block that creates the use if no user exits');

                        
                        console.log("The user's email is:" + email);

                        // Encrypt the password 
                        var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
                        console.log('hash', hash);

                        // Create the vendor if one does not already exist w/ that email
                        db.Vendor.create({
                            email: email,
                            password: hash
                        }).then( () => {
                           return done(null, vendor);
                        })

                        // Return the new   
                        // return done(null, vendor);
                    }

                });
            });
        }));

    passport.use('local-login', new LocalStrategy(
        // Our user will sign in using an email, rather than a "username"
        {
            usernameField: 'email'
        },
        function (email, password, done) {
            console.log('>>>>>>>>>>>>>>>>>>>');
            console.log('email', email);
            console.log('password', password);
            console.log('>>>>>>>>>>>>>>>>>>>');
            // When a user tries to sign in this code runs
            db.Vendor.findOne({
                where: {
                    email
                }
            }).then(function (vendor) {
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