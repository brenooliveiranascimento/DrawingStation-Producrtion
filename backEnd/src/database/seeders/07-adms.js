module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'adms',
      [
        {
          email: 'drawing564station@gmail.com',
          active:true,
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('adms', null, {});
  },
};
