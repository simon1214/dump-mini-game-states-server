module.exports = {
  up: (queryInterface, Sequelize) => queryInterface
    .addColumn(
      'Articles', // name of Target model
      'user_id', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    )
    .then(() => queryInterface.addColumn(
      'Scores', // name of Target model
      'user_id', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    ))
    .then(() => queryInterface.addColumn(
      'Scores', // name of Target model
      'game_id', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Games', // name of Source model
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    )),

  down: (queryInterface) => queryInterface
    .removeColumn(
      'Articles', // name of the Target model
      'user_id', // key we want to remove
    )
    .then(() => queryInterface.removeColumn(
      'Scores', // name of the Target model
      'user_id', // key we want to remove
    ))
    .then(() => queryInterface.removeColumn(
      'Scores', // name of the Target model
      'game_id', // key we want to remove
    )),
};
