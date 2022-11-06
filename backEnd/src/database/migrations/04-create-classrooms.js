module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classrooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      video: {
        allowNull: false,
        type: Sequelize.STRING(200),
      },
      drawing: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
      premium: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(300),
      },
      sub_module_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'sub_modules',
          key: 'id',
        },
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('classrooms');
  },
};