module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'sub_comments',
      [
        {
          id: 1,
          content: 'Brabo demais!!!',
          create_by: 1,
          comment_id: 1,
          creation_date: new Date(),
        },
        {
          id: 2,
          content: 'sub comentario teste!!!!',
          create_by: 4,
          comment_id: 1,
          creation_date: new Date(),
        },
        {
          id: 3,
          content: 'Vambora!!!',
          create_by: 2,
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
