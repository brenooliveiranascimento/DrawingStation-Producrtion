module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(500),
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id',
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
        field: 'classroom_id',
      },
      creationData: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'creation_date',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('comments');
  },
};
