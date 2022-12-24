module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sub_modules', {
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
      image: {
        allowNull: false,
        type: Sequelize.STRING(800),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(300),
      },
      moduleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'modules',
          key: 'id',
        },
        field: 'module_id',
      },
      premium: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('sub_modules');
  },
};
