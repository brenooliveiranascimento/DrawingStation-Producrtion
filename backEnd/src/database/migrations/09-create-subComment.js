module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sub_comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id',
      },
      commentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'comments',
          key: 'id',
        },
        field: 'comment_id',
      },
      creationData: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'creation_date'
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('sub_comments');
  },
};
