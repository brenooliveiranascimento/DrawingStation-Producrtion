module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('modules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      Image: {
        allowNull: false,
        type: Sequelize.STRING(300),
      },
      premium: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('modules');
  },
};