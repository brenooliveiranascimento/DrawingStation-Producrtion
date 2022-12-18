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
      image: {
        allowNull: false,
        type: Sequelize.STRING(500),
      },
      conclude: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      colors: {
        allowNull: false,
        type: Sequelize.STRING(3000),
      },
      multiExemple: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      premium: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      subModuleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        onUpdate: 'cascade',
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