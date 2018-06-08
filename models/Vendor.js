module.exports = function(sequelize, DataTypes) {
  var Vendor = sequelize.define("Vendor", {
    // Giving the Vendor model a name of type STRING
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      },
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
    }
  },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
    }
  },
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
    }
  },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      len: [1]
    }
  },
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
