var bcrypt = require("bcrypt-nodejs");

module.exports = function (sequelize, DataTypes) {
  var Vendor = sequelize.define("Vendor", {
    // Giving the Vendor model a name of type STRING
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    rate: DataTypes.STRING,
    languages: DataTypes.STRING,
    certificates: DataTypes.STRING,
    // approved: DataTypes.BOOLEAN,
  });

  // This join is none opp. 

  // Vendor.associate = function (models) {
  //   // Associating Vendor with VendorAvailabilities
  //   // When an Vendor is deleted, also delete any associated VendorAvailabilitys
  //   Vendor.hasMany(models.VendorAvailability, {
  //     onDelete: "cascade",
  //   });
  // };

  // Syncs with DB
  Vendor.sync();

  // Creating a custom method for our Member model. 
  //This will check if an unhashed password entered by the 
  //user can be compared to the hashed password stored in our database
  Vendor.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return Vendor;
};
