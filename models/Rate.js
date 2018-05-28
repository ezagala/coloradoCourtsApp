module.exports = function(sequelize, DataTypes) {
  var Rate = sequelize.define("Rate", {
    rate_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    rate_type: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.INTEGER,
    },
  });

  return Rate;
};
