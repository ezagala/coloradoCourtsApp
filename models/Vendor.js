module.exports = function(sequelize, DataTypes) {
  var Vendor = sequelize.define("Vendor", {
    // Giving the Vendor model a name of type STRING
    vendorId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone_num: DataTYPES.STRING,
    address: DataTYPES.STRING,
    city: DataTYPES.STRING,
    state: DataTYPES.STRING,
    zip_code: DataTYPES.STRING,
    email: DataTYPES.STRING,
    password: DataTYPES.STRING,
    approved: DataTYPES.BOOLEAN,
  });

  Vendor.associate = function(models) {
    // Associating Vendor with VendorAvailabilities
    // When an Vendor is deleted, also delete any associated VendorAvailabilitys
    Vendor.hasMany(models.VendorAvailability, {
      onDelete: "cascade",
    });
  };

  return Vendor;
};
