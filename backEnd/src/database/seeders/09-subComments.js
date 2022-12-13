module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'sub_comments',
      [
        {
          id: 1,
          content: 'Brabo demais!!!',
          createBy: 1,
          commentId: 1,
          creationDate: new Date(),
        },
        {
          id: 2,
          content: 'sub comentario teste!!!!',
          createBy: 4,
          commentId: 1,
          creationDate: new Date(),
        },
        {
          id: 3,
          content: 'Vambora!!!',
          createBy: 2,
          commentId: 2,
          creationDate: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('sub_comments', null, {});
  },
};
