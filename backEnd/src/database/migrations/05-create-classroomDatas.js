module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('classrooms_datas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      video: {
        allowNull: false,
        type: Sequelize.STRING(200),
      },
      drawing: {
        allowNull: false,
        type: Sequelize.STRING(500),
      },
      conclude: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      colors: {
        allowNull: true,
        type: Sequelize.STRING(3000),
      },
      multiExemple: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING(500),
      },
      isPremium: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(300),
      },
      classroomId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'classrooms',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('classrooms');
  },
};
