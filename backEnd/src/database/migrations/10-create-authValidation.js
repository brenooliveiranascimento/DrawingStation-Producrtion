module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('auth_validations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING(300),
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('auth_validations');
  },
};
