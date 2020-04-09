// const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Scores = sequelize.define(
    'Scores',
    {
      score: {
        type:DataTypes.INTEGER,
        allowNull:false
      },
      created_at: {
        type:DataTypes.DATE,
      }
    },
    {}
  );
  Scores.associate = function(models) {}
  return Scores
}