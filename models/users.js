const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      username: {
        type:DataTypes.STRING,
        allowNull:false
      },
      password: {
        type:DataTypes.STRING,
        allowNull:false
      },
      nickname: {
        type:DataTypes.STRING,
        allowNull:false
      },
      email: {
        type:DataTypes.STRING,
        allowNull:true
      },
      created_at : {
        type:DataTypes.DATE,
        defaultValue:Sequelize.NOW
      }
    },
    {
      timestamps:false
    }
  );
  Users.associate = (models) => {
    Users.hasMany(models.Articles)
    Users.hasMany(models.Scores)
  }
  return Users
}