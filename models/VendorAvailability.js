module.exports = function(sequelize, DataTypes) {
  var VendorAvailability = sequelize.define("VendorAvailability", {
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    courthouse: {
      type: DataTypes.STRING
    },
    notes: {
      type: DataTypes.TEXT
    },
    start: {
      type: DataTypes.DATE
    },
    end: {
      type: DataTypes.DATE
    }, 
    recurrence: {
      type: DataTypes.STRING
    }
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
