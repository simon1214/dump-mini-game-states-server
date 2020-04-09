const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Articles = sequelize.define(
    'Articles',
    {
      title: {
        type:DataTypes.STRING,
        allowNull:false
      },
      contents: {
        type:DataTypes.STRING,
        allowNull:false
      },
      likes: {
        type:DataTypes.STRING,
        allowNull:false
      },
      dislikes: {
        type:DataTypes.STRING,
        allowNull:true
      },
      created_at: {
        type:DataTypes.DATE,
        defaultValue:Sequelize.NOW
      }
    },
    {
      timestamps:false
    }  
  );
  Articles.associate = (models) => {
  }
  return Articles
}