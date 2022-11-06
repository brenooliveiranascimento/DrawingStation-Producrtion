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
        type: Sequelize.STRING(150),
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING(300),
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
        references: {
          model: 'classrooms',
          key: 'id',
        },
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('classrooms');
  },
};