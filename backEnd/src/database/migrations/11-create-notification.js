module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notification', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id',
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      commentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'comments',
          key: 'id',
        },
        field: 'comment_id',
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      senderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'sender_id',
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
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('notification');
  },
};
