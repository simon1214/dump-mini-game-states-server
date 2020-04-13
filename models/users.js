const Sequelize = require('sequelize');
const encrypt = require('../modules/crypto');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      timestamps: false,
      hooks: {
        afterValidate: (user, options) => {
          user.password = encrypt(user.password);
        },
      },
    },
  );
  Users.associate = (models) => {
    // Users.hasMany(models.Articles);
    // Users.hasMany(models.Scores);
  };
  return Users;
};
