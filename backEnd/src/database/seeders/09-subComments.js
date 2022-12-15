module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'sub_comments',
      [
        {
          id: 1,
          content: 'Brabo demais!!!',
          user_id: 1,
          active: true,
          comment_id: 1,
          creation_date: new Date(),
        },
        {
          id: 2,
          content: 'sub comentario teste!!!!',
          user_id: 2,
          active: true,
          comment_id: 1,
          creation_date: new Date(),
        },
        {
          id: 3,
          content: 'Vambora!!!',
          user_id: 2,
          active: false,
          comment_id: 2,
          creation_date: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sub_comments', null, {});
  },
};
