module.exports = function(sequelize, DataTypes) {
  var VendorRate = sequelize.define("VendorRate", {
    vendor_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    rate_id: {
      type: DataTypes.STRING,
    },
  });

  VendorRate.associate = function(models) {
    // We're saying that a VendorRate should belong to a Vendor
    // A VendorRate can't be created without an Vendor due to the foreign key constraint
    VendorRate.belongsTo(models.Vendor, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return VendorRate;
};
