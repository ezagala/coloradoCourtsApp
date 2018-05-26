module.exports = function(sequelize, DataTypes) {
  var Courthouse = sequelize.define("Courthouse", {
    courthouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
  });

  return Courthouse;
};
