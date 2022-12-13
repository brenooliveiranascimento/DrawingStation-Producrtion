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
      createBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'create_by',
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
