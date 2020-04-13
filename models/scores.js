const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Scores = sequelize.define(
    'Scores',
    {
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
  Scores.associate = (models) => {
    Scores.belongsTo(models.Games, { foreignKey: 'game_id', as: 'Games' });
    Scores.belongsTo(models.Users, { foreignKey: 'user_id', as: 'Users' });
  };
  return Scores;
};
