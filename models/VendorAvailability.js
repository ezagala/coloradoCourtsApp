module.exports = function(sequelize, DataTypes) {
  var VendorAvailability = sequelize.define("VendorAvailability", {
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    courthouse_id: {
      type: DataTypes.INTEGER,
    },
    vendor_availability: {
      type: DataTypes.TEXT,
    },
  });

  VendorAvailability.associate = function(models) {
    // We're saying that a VendorAvailability should belong to a Vendor
    // A VendorAvailability can't be created without an Vendor due to the foreign key constraint
    VendorAvailability.belongsTo(models.Vendor, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return VendorAvailability;
};
