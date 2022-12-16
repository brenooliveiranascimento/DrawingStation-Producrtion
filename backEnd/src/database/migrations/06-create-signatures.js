module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('signatures', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(300),
      },
      priceId: {
        allowNull: false,
        type: Sequelize.STRING(300)
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(30),
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'users',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('signatures');
  },
};
