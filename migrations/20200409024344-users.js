'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type:Sequelize.STRING,
        allowNull:true
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
