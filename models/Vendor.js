module.exports = function(sequelize, DataTypes) {
  var Vendor = sequelize.define("Vendor", {
    // Giving the Vendor model a name of type STRING
    vendorId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phone_num: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rate: DataTypes.STRING,
    languages: DataTypes.STRING,
    certificates: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,
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
