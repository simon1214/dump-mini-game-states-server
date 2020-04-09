const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      username: {
        type:Sequelize.STRING(128),
        allowNull:false
      },
      password: {
        type:Sequelize.STRING(255),
        allowNull:false
      },
      nickname: {
        type:Sequelize.STRING(128),
        allowNull:false
      },
      email: {
        type:Sequelize.STRING(45),
        allowNull:true
      }
    },
    {}
  );
  users.associate = function(models) {}
  return users
}