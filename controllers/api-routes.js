var db = require("../models");
const bcrypt = require("bcrypt-nodejs");

const saltRounds = 10;

module.exports = function (app, passport) {

  app.get("/api/vendor", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Vendor.findAll({}).then(function (dbVendor) {
      // We have access to the vendors as an argument inside of the callback function
      res.json(dbVendor);
    });
  });

  app.post("/api/vendor", function (req, res) {
    console.log(req.body);
    db.Vendor.create({
      vendorId: req.body.vendorId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      password: req.body.password,
      rate: req.body.rate,
      languages: req.body.languages,
      certificates: req.body.certificates,
      approved: req.body.approved
    })
      .then(function (dbVendor) {
        res.json(dbVendor);
      });
  });

  app.put("/api/vendor/:id", function (req, res) {
    console.log(req.body);
    const id = req.params.id
    db.Vendor.update(
      {
        vendorId: req.body.vendorId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        password: req.body.password,
        rate: req.body.rate,
        languages: req.body.languages,
        certificates: req.body.certificates,
        approved: req.body.approved
      },
      { where: { id: id } }
    )
      .then(function (dbVendor) {
        res.json(dbVendor);
      });
  });


  /*app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      console.log('finally')
      res.redirect('/home');
    });*/

    /*app.post('/login', (req, res) => {
      console.log('body', req.body);
    });*/

  app.post('/login',
    passport.authenticate(
      'local', 
      {
        successRedirect: '/account',
        failureRedirect: '/signup',
        failureFlash: true,
      }
    )
  );

  // Add a member
  app.post("/signup", function(req, res) {

    console.log('req.body', req.body);
    
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    console.log('hash', hash);

    db.Vendor.create({
      vendorId: req.body.vendorId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      password: hash,
      rate: req.body.rate,
      languages: req.body.languages,
      certificates: req.body.certificates,
      approved: req.body.approved
    }).done(function(m) {
      res.send(req.body.email)
    });
    
  });
};