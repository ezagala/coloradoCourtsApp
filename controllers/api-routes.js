var db = require("../models");

module.exports = function (app) {

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
};