
var db = require("../models");

module.exports = function(app) {

app.post("/api/vendor", function(req, res) {
    console.log(req.body);
    db.Vendor.create({
      firstName: req.body.first,
      lastName: req.body.last,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      password: req.body.password
    })
      .then(function(dbVendor) {
        res.json(dbVendor);
      });
  });
};