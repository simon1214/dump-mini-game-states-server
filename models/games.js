const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define(
    'Games',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: false,
    },
  );
  // eslint-disable-next-line
  Games.associate = (models) => {
    Games.hasMany(models.Scores, { foreignKey: 'game_id', as: 'Games' });
  };
  return Games;
};
