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
        afterValidate: (user) => {
          // eslint-disable-next-line
          user.password = encrypt(user.password);
        },
      },
    },
  );
  // eslint-disable-next-line
  Users.associate = (models) => {
    Users.hasMany(models.Articles, { foreignKey: 'user_id' });
    Users.hasMany(models.Scores, { foreignKey: 'user_id' });
  };
  return Users;
};
