module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
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
      email: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      premium: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      Birthday: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
