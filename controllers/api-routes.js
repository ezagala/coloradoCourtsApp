
var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the vendors
app.get("/api/vendor", function(req, res) {
  // findAll returns all entries for a table when used with no options
  db.Vendor.findAll({}).then(function(dbVendor) {
    // We have access to the vendors as an argument inside of the callback function
    res.json(dbVendor);
  });
});

// We need to convert this into a put route to accommodate user edits
app.put("/api/vendor", function(req, res) {
    console.log(req.body);
    db.Vendor.create({
      vendorId: req.body.vendorId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone_num: req.body.phone_num,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      email: req.body.email,
      password: req.body.password,
      rate: req.body.rate,
      languages: req.body.languages,
      certificates: req.body.certificates,
      approved: req.body.approved
    })
      .then(function(dbVendor) {
        res.json(dbVendor);
      });
  });
};