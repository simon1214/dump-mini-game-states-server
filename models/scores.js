// const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Scores = sequelize.define(
    'Scores',
    {
      score: {
        type:DataTypes.INT,
        allowNull:false
      },
      created_at: {
        type:DataTypes.DATETIME,
      }
    },
    {}
  );
  Scores.associate = function(models) {}
  return Scores
}