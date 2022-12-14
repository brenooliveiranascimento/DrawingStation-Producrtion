module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          id: 1,
          content: 'Brabo demais!!!',
          active: true,
          user_id: 1,
          classroom_id: 1,
          creation_date: new Date(),
        },
        {
          id: 2,
          content: 'MAAAAAAAAIns!!',
          active: false,
          user_id: 1,
          classroom_id: 1,
          creation_date: new Date(),
        },
        {
          id: 3,
          content: 'MainComment!!!',
          active: true,
          user_id: 2,
          classroom_id: 2,
          creation_date: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
